
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./weather-icon";
import { Skeleton } from "@/components/ui/skeleton";
import type { ForecastData } from "@/lib/weather";

interface ForecastProps {
  city: string;
  onError: (message: string) => void;
}

export function Forecast({ city, onError }: ForecastProps) {
  const { data, isLoading, error } = useQuery<ForecastData>({
    queryKey: [`/api/forecast?city=${encodeURIComponent(city)}`],
    retry: false,
  });

  if (error) {
    onError((error as Error).message);
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    );
  }

  const dailyForecasts = data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {dailyForecasts.map((forecast) => (
        <Card key={forecast.dt} className="p-4 bg-white/50">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {new Date(forecast.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <div className="flex items-center gap-2">
              <WeatherIcon code={forecast.weather[0].icon} size={40} />
              <p className="text-2xl font-bold">{Math.round(forecast.main.temp)}°F</p>
            </div>
            <p className="text-sm text-gray-600 capitalize">{forecast.weather[0].description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
