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
