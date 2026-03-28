import type { Config } from "tailwindcss";
import containerQueries from "@tailwindcss/container-queries";

/**
 * Tailwind v4는 기본적으로 CSS(`app/globals.css`)에서 `@plugin`으로 구성합니다.
 * 레거시 `plugins` 배열은 `@config`로 이 파일을 불러올 때 적용됩니다.
 */
const config = {
  plugins: [containerQueries],
} satisfies Config;

export default config;
