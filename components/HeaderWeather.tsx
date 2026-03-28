"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** 서울 시청 근처 — 위치 권한 거부·오류 시 폴백 */
const FALLBACK = { lat: 37.5665, lon: 126.978 };

type WeatherPayload = {
  city: string;
  temp: number;
  description: string;
  icon: string;
};

function iconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function HeaderWeather() {
  const [state, setState] = useState<
    { status: "loading" } | { status: "ok"; data: WeatherPayload } | { status: "hidden" }
  >({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = (lat: number, lon: number) => {
      const q = new URLSearchParams({ lat: String(lat), lon: String(lon) });
      return fetch(`/api/weather?${q}`).then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<WeatherPayload>;
      });
    };

    const run = async () => {
      let lat = FALLBACK.lat;
      let lon = FALLBACK.lon;

      if (typeof navigator !== "undefined" && navigator.geolocation) {
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 10_000,
              maximumAge: 300_000,
            });
          });
          lat = pos.coords.latitude;
          lon = pos.coords.longitude;
        } catch {
          /* 폴백 좌표 사용 */
        }
      }

      try {
        const data = await fetchWeather(lat, lon);
        if (!cancelled) setState({ status: "ok", data });
      } catch {
        if (!cancelled) setState({ status: "hidden" });
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div
        className="flex h-8 min-w-[7rem] items-center justify-end gap-1.5 rounded-md border border-transparent text-xs text-zinc-400 dark:text-zinc-500"
        aria-hidden
      >
        <span className="inline-block h-6 w-6 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-700/80" />
        <span className="inline-block h-4 w-10 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-700/80" />
      </div>
    );
  }

  if (state.status === "hidden") {
    return null;
  }

  const { data } = state;
  return (
    <div
      className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300"
      title={`${data.city} · ${data.description}`}
    >
      <Image
        src={iconUrl(data.icon)}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0"
        unoptimized
      />
      <span className="tabular-nums font-medium text-zinc-800 dark:text-zinc-100">
        {data.temp}°
      </span>
      <span className="hidden max-w-[8rem] truncate sm:inline">{data.description}</span>
    </div>
  );
}
