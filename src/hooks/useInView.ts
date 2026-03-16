"use client";

import { useEffect, useRef } from "react";

/**
 * Adds the `in-view` class to elements with `animate-on-scroll`,
 * `animate-fade-left`, or `animate-fade-right` when they enter the viewport.
 */
export function useScrollAnimations() {
  const observed = useRef(false);

  useEffect(() => {
    if (observed.current) return;
    observed.current = true;

    const selectors = ".animate-on-scroll, .animate-fade-left, .animate-fade-right";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe existing elements
    document.querySelectorAll(selectors).forEach((el) => observer.observe(el));

    // Observe dynamically added elements
    const mutation = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(selectors)) observer.observe(node);
            node.querySelectorAll(selectors).forEach((el) => observer.observe(el));
          }
        });
      });
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
}
