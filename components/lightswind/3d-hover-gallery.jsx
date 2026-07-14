"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from 'next/image';

// Inline helper for className merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ThreeDHoverGallery = ({
  images = [],
  itemWidth = 12,
  itemHeight = 20,
  gap = 1.2,
  perspective = 50,
  hoverScale = 15,
  transitionDuration = 1.25,
  backgroundColor,
  grayscaleStrength = 1,
  brightnessLevel = 0.5,
  activeWidth = 45,
  rotationAngle = 35,
  zDepth = 10,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
  className,
  style,
  onImageClick,
  onImageHover,
  onImageFocus,
}) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const autoPlayRef = useRef(null);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (autoPlay && images.length > 0) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? 0 : (prev + 1) % images.length;
          return nextIndex;
        });
      }, autoPlayDelay);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
    if (!autoPlay && autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [autoPlay, autoPlayDelay, images.length]);

  const handleImageClick = (index, image) => {
    setActiveIndex(activeIndex === index ? null : index);
    onImageClick?.(index, image);
  };

  const handleImageHover = (index, image) => {
    if (!autoPlay) {
      setActiveIndex(index);
    }
    onImageHover?.(index, image);
  };

  const handleImageLeave = () => {
    if (!autoPlay) {
      setActiveIndex(null);
    }
  };

  const handleImageFocus = (index, image) => {
    setFocusedIndex(index);
    onImageFocus?.(index, image);
  };

  const handleKeyDown = (event, index) => {
    if (!enableKeyboardNavigation) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleImageClick(index, images[index]);
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : images.length - 1;
        containerRef.current?.children[prevIndex]?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = index < images.length - 1 ? index + 1 : 0;
        containerRef.current?.children[nextIndex]?.focus();
        break;
    }
  };

  // Responsive values - computed once
  const responsiveItemWidth = isMobile ? 35 : itemWidth;
  const responsiveItemHeight = isMobile ? 35 : itemHeight;
  const responsiveGap = isMobile ? 0.8 : gap;
  const responsivePerspective = isMobile ? 40 : perspective;
  const responsiveHoverScale = isMobile ? 8 : hoverScale;
  const responsiveActiveWidth = isMobile ? 85 : activeWidth;
  const responsiveTransitionDuration = isMobile ? 0.8 : transitionDuration;
  const responsiveHeight = isMobile ? 300 : 550;

  const getItemStyle = (index) => {
    const isActive = activeIndex === index;
    const isFocused = focusedIndex === index;
    const baseWidthPx = 10;

    return {
      width: isActive
        ? `${responsiveActiveWidth}vw`
        : `calc(${responsiveItemWidth}vw + ${baseWidthPx}px)`,
      height: `calc(${responsiveItemHeight}vw + ${responsiveItemHeight}vh)`,
      backgroundImage: `url(${images[index]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor,
      cursor: "pointer",
      filter:
        isActive || isFocused
          ? "inherit"
          : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
      transform: isActive
        ? `translateZ(calc(${responsiveHoverScale}vw + ${responsiveHoverScale}vh))`
        : "none",
      transition: `transform ${responsiveTransitionDuration}s cubic-bezier(.1, .7, 0, 1), filter 3s cubic-bezier(.1, .7, 0, 1), width ${responsiveTransitionDuration}s cubic-bezier(.1, .7, 0, 1)`,
      willChange: "transform, filter, width",
      zIndex: isActive ? 100 : "auto",
      margin: isActive ? "0 0.3vw" : "0",
      outline: isFocused ? "2px solid #d2ff00" : "none",
      outlineOffset: "2px",
      borderRadius: "0.5rem",
    };
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full overflow-hidden bg-transparent",
        className
      )}
      style={backgroundColor ? { backgroundColor, ...style } : style}
    >
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full"
        style={{
          perspective: `calc(${responsivePerspective}vw + ${responsivePerspective}vh)`,
          gap: `${responsiveGap}rem`,
          overflowX: isMobile ? "auto" : "hidden",
          scrollSnapType: isMobile ? "x mandatory" : "none",
          padding: isMobile ? "1rem 0" : "0",
          scrollbarWidth: isMobile ? "thin" : "none",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative will-change-transform rounded-lg shadow-lg"
            style={{
              ...getItemStyle(index),
              scrollSnapAlign: isMobile ? "center" : "none",
            }}
            tabIndex={enableKeyboardNavigation ? 0 : -1}
            onClick={() => handleImageClick(index, image)}
            onMouseEnter={() => handleImageHover(index, image)}
            onMouseLeave={handleImageLeave}
            onFocus={() => handleImageFocus(index, image)}
            onBlur={() => setFocusedIndex(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            aria-label={`Image ${index + 1} of ${images.length}`}
            aria-pressed={activeIndex === index}
          >
            {/* Use Next.js Image component for optimization */}
            {!isMobile && (
              <Image
                src={image}
                alt={`Project screenshot ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
                priority={index === 0} // First image loads eagerly
                loading={index === 0 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
            )}
            {isMobile && (
              <img
                src={image}
                alt={`Project screenshot ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
                style={{
                  filter: activeIndex === index ? "none" : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
                  transform: activeIndex === index ? "translateZ(0)" : "none",
                  transition: `transform ${responsiveTransitionDuration}s cubic-bezier(.1, .7, 0, 1), filter 3s cubic-bezier(.1, .7, 0, 1)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDHoverGallery;