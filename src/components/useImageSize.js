"use client";
import { useState, useEffect } from "react";

export function useImageSize(url) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!url) return;

    const img = document.createElement("img");
    img.src = url;

    img.onload = () => {
      setSize({ width: img.width, height: img.height });
    };
  }, [url]);

  return size;
}

export function getImageSize(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 800, height: 600 });
    img.src = url;
  });
}
