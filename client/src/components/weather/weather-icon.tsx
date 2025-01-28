interface WeatherIconProps {
  code: string;
  size?: number;
}

export function WeatherIcon({ code, size = 32 }: WeatherIconProps) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      alt="Weather icon"
      width={size}
      height={size}
      className="inline-block"
    />
  );
}
