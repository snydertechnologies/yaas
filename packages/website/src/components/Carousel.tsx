'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CarouselProps {
  children: React.ReactNode[];

  /* The amount of time to delay between automatically cycling an item. If null, carousel will not automatically cycle. */
  interval?: number | null;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  interval,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const items = React.Children.toArray(children);
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>();

  const goToIndex = (index: number): void => {
    setCurrentIndex(index);
  };

  const goToNext = useCallback((): void => {
    const nextIndex = (currentIndex + 1) % React.Children.count(children);
    setCurrentIndex(nextIndex);
    clearInterval(intervalIdRef.current);
  }, [children, currentIndex]);

  useEffect(() => {
    // Cannot continue if the `interval` is null or undefined.
    if (!interval) return;

    intervalIdRef.current = setInterval(goToNext, interval); // 1 minute interval

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [interval, currentIndex, children, goToNext]);

  return (
    <div className="">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item overflow-y-hidden overflow-x-auto ${
              index === currentIndex ? 'block' : 'hidden'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="absolute z-[15] flex justify-center mx-[15%] bottom-0 inset-x-0">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={
              'box-content w-10 h-[5px] pr-1 pl-1 cursor-pointer relative bg-transparent py-4 ' +
              (currentIndex === index ? 'opacity-75' : 'opacity-30')
            }
          >
            <span className="block w-full h-full rounded-sm bg-white"></span>
          </button>
        ))}
      </div>
    </div>
  );
};
