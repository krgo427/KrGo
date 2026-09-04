// Lightweight in-memory cache for Admin Portal data to enable instant UI rendering & stale-while-revalidate fetching

const cacheStore = new Map();

export const getCachedData = (key) => {
  return cacheStore.get(key) || null;
};

export const setCachedData = (key, data) => {
  cacheStore.set(key, data);
};

export const invalidateCacheKey = (key) => {
  cacheStore.delete(key);
};

export const clearAdminCache = () => {
  cacheStore.clear();
};
