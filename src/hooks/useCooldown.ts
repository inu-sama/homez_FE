"use client";
import { useEffect, useState, useRef } from "react";

export function useCooldown(key: string, duration = 60) {
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`cooldown_${key}`);
    if (saved) {
      const elapsed = (Date.now() - parseInt(saved)) / 1000;
      if (elapsed < duration) {
        setCooldown(duration - Math.floor(elapsed));
      }
    }
  }, [key, duration]);

  useEffect(() => {
    if (cooldown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [cooldown]);

  const startCooldown = (immediate = false) => {
    const now = Date.now();
    localStorage.setItem(`cooldown_${key}`, now.toString());

    if (immediate) {
      setCooldown(duration);
    } else {
      setTimeout(() => setCooldown(duration), 0);
    }
  };

  return {
    cooldown,
    isCoolingDown: cooldown > 0,
    startCooldown,
  };
}
