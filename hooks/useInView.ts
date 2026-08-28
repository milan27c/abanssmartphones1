"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Stop observing after the first intersection. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/** Small IntersectionObserver wrapper for non-Motion components. */
export function useInView<T extends Element>({
  once = true,
  rootMargin = "-80px",
  threshold = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView } as const;
}
