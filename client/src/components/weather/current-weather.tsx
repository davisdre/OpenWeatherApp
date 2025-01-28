import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherIcon } from "./weather-icon";
import { Card } from "@/components/ui/card";

interface CurrentWeatherProps {
  city: string;
  onError: (message: string) => void;
}

export function CurrentWeather({ city, onError }: CurrentWeatherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/weather?city=${encodeURIComponent(city)}`],
    retry: false,
  });

  if (error) {
    onError((error as Error).message);
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-blue-900">{city}</h2>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-white/50">
          <div className="flex items-center gap-4">
            <WeatherIcon code={data.weather[0].icon} size={64} />
            <div>
              <p className="text-4xl font-bold">{Math.round(data.main.temp)}°F</p>
              <p className="text-gray-600 capitalize">{data.weather[0].description}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-lg font-semibold">{data.main.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="text-lg font-semibold">{Math.round(data.wind.speed)} mph</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Feels like</p>
              <p className="text-lg font-semibold">{Math.round(data.main.feels_like)}°F</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="text-lg font-semibold">{data.main.pressure} hPa</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}