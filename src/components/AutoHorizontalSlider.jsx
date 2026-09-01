import React, { useRef, useEffect, useState } from 'react';

export default function AutoHorizontalSlider({ children, interval = 3500, className = '' }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const childCount = React.Children.count(children);

  useEffect(() => {
    if (isPaused || childCount <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % childCount;
        if (scrollRef.current) {
          const container = scrollRef.current;
          const cardWidth = container.scrollWidth / childCount;
          container.scrollTo({
            left: next * cardWidth,
            behavior: 'smooth'
          });
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, childCount, interval]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / childCount;
    const currentScroll = container.scrollLeft;
    const index = Math.round(currentScroll / cardWidth);
    if (index !== activeIndex && index >= 0 && index < childCount) {
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (idx) => {
    setActiveIndex(idx);
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / childCount;
      container.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pt-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center flex flex-col">
            {child}
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      {childCount > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: childCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-slate-600/40 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
