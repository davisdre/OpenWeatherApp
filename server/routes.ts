import type { Express } from "express";
import { createServer, type Server } from "http";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "demo";
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

export function registerRoutes(app: Express): Server {
  app.get("/api/weather/validate", async (req, res) => {
    const city = req.query.city as string;
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    try {
      const isZipCode = /^\d{5}$/.test(city);
      const queryParam = isZipCode ? `zip=${city},us` : `q=${encodeURIComponent(city)}`;
      const response = await fetch(
        `${OPENWEATHER_API_URL}/weather?${queryParam}&appid=${OPENWEATHER_API_KEY}&units=imperial`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      res.json({ city: data.name });
    } catch (error) {
      res.status(404).json({ message: "City not found" });
    }
  });

  app.get("/api/weather", async (req, res) => {
    const city = req.query.city as string;
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    try {
      const isZipCode = /^\d{5}$/.test(city);
      const queryParam = isZipCode ? `zip=${city},us` : `q=${encodeURIComponent(city)}`;
      const response = await fetch(
        `${OPENWEATHER_API_URL}/weather?${queryParam}&appid=${OPENWEATHER_API_KEY}&units=imperial`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  app.get("/api/forecast", async (req, res) => {
    const city = req.query.city as string;
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    try {
      const isZipCode = /^\d{5}$/.test(city);
      const queryParam = isZipCode ? `zip=${city},us` : `q=${encodeURIComponent(city)}`;
      const response = await fetch(
        `${FORECAST_API_URL}?${queryParam}&appid=${OPENWEATHER_API_KEY}&units=imperial`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch forecast data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
