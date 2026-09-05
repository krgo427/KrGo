// High-performance Admin Portal Cache & Offline Storage Manager

const cacheStore = new Map();
let isSupabaseOffline = false;
let lastOfflineCheckTime = 0;
const OFFLINE_COOLDOWN_MS = 60000; // 60 seconds fast-skip if offline

export const getCachedData = (key) => {
  if (cacheStore.has(key)) {
    return cacheStore.get(key);
  }
  // Try reading from LocalStorage fallback
  try {
    const local = localStorage.getItem(`krgo_admin_${key}`);
    if (local) {
      const parsed = JSON.parse(local);
      cacheStore.set(key, parsed);
      return parsed;
    }
  } catch (e) {}
  return null;
};

export const setCachedData = (key, data) => {
  cacheStore.set(key, data);
  try {
    localStorage.setItem(`krgo_admin_${key}`, JSON.stringify(data));
  } catch (e) {}
};

export const invalidateCacheKey = (key) => {
  cacheStore.delete(key);
  try {
    localStorage.removeItem(`krgo_admin_${key}`);
  } catch (e) {}
};

export const clearAdminCache = () => {
  cacheStore.clear();
};

/**
 * Fast-timeout wrapper for Supabase queries.
 * Prevents DNS lookup/network hangs from freezing the UI for seconds when Supabase is unreachable.
 */
export const safeSupabaseQuery = async (queryPromiseBuilder, timeoutMs = 8000) => {
  // If Supabase was recently detected offline, fail fast in 0ms to avoid network lag
  if (isSupabaseOffline && (Date.now() - lastOfflineCheckTime < OFFLINE_COOLDOWN_MS)) {
    // try to proceed anyway instead of failing fast to allow recovery
    isSupabaseOffline = false; 
  }

  let timerId;
  const timeoutPromise = new Promise((resolve) => {
    timerId = setTimeout(() => {
      resolve({ data: null, error: { message: 'Network timeout (8000ms limit reached)' } });
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([queryPromiseBuilder(), timeoutPromise]);
    clearTimeout(timerId);
    if (!result.error) {
      isSupabaseOffline = false; // Connection healthy
    } else if (result.error.message.includes('timeout')) {
      isSupabaseOffline = true;
      lastOfflineCheckTime = Date.now();
    }
    return result;
  } catch (err) {
    clearTimeout(timerId);
    isSupabaseOffline = true;
    lastOfflineCheckTime = Date.now();
    return { data: null, error: err };
  }
};
