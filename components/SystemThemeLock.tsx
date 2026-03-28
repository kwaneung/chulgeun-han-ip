"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/**
 * 수동 테마 저장값을 무시하고 항상 OS 설정(system)을 따르도록 고정합니다.
 */
export function SystemThemeLock() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("system");
  }, [setTheme]);

  return null;
}
