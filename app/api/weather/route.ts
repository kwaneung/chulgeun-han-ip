import type { NextRequest } from "next/server";

const OWM_URL = "https://api.openweathermap.org/data/2.5/weather";

type OwmResponse = {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

function parseCoord(raw: string | null, min: number, max: number): number | null {
  if (raw == null || raw === "") return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

export async function GET(request: NextRequest) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    return Response.json(
      { error: "OPENWEATHER_API_KEY is not set" },
      { status: 503 },
    );
  }

  const lat = parseCoord(request.nextUrl.searchParams.get("lat"), -90, 90);
  const lon = parseCoord(request.nextUrl.searchParams.get("lon"), -180, 180);
  if (lat == null || lon == null) {
    return Response.json(
      { error: "Valid lat and lon query parameters are required" },
      { status: 400 },
    );
  }

  const url = new URL(OWM_URL);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("appid", key);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "kr");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    return Response.json(
      { error: "Weather request failed", detail: text.slice(0, 200) },
      { status: res.status === 401 ? 401 : 502 },
    );
  }

  const data = (await res.json()) as OwmResponse;
  const w = data.weather[0];
  if (!w) {
    return Response.json({ error: "Invalid weather payload" }, { status: 502 });
  }

  return Response.json({
    city: data.name,
    temp: Math.round(data.main.temp),
    description: w.description,
    icon: w.icon,
  });
}
