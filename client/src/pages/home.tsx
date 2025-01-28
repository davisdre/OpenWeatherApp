import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SearchBox } from "@/components/weather/search-box";
import { CurrentWeather } from "@/components/weather/current-weather";
import { Forecast } from "@/components/weather/forecast";
import { useState } from "react";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="backdrop-blur-sm bg-white/80">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">Weather Forecast</h1>
            <SearchBox onCitySelect={handleCitySelect} onError={handleError} />
          </CardContent>
        </Card>

        {selectedCity && (
          <Card className="backdrop-blur-sm bg-white/80">
            <CardContent className="p-6">
              <div className="space-y-6">
                <CurrentWeather city={selectedCity} onError={handleError} />
                <Forecast city={selectedCity} onError={handleError} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <footer className="text-center text-sm text-blue-600 py-4">
        Made with ♥️ by Drew | Powered by Replit
      </footer>
    </div>
  );
}
