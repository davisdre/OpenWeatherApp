import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface SearchBoxProps {
  onCitySelect: (city: string) => void;
  onError: (message: string) => void;
}

export function SearchBox({ onCitySelect, onError }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const searchMutation = useMutation({
    mutationFn: async (city: string) => {
      const response = await fetch(`/api/weather/validate?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    },
    onSuccess: (data) => {
      onCitySelect(data.city);
      setQuery("");
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchMutation.mutate(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          placeholder="Enter city name or zip code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Button 
        type="submit"
        disabled={!query.trim() || searchMutation.isPending}
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
