
# Weather Dashboard

A modern, responsive weather application built with React that provides real-time weather information and forecasts. Users can search for cities and view current weather conditions along with a 4-day forecast.

## Features

- Real-time weather data using OpenWeather API
- Current weather conditions including temperature, humidity, wind speed, and more
- 4-day weather forecast
- Responsive design for mobile and desktop
- Clean and intuitive user interface
- Error handling with toast notifications

## Installation

1. Clone the repository in Replit
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
   - Create a new secret in the Replit Secrets tab named `OPENWEATHER_API_KEY`
   - Add your OpenWeather API key (obtain one at [OpenWeather](https://openweathermap.org/api))

## Usage

1. Start the development server:
```bash
npm run dev
```
2. The application will be available at the URL provided by Replit

### Common Use Cases

1. Search for a city:
   - Enter the city name in the search box
   - Click the Search button or press Enter
   - View current weather and forecast

2. View weather details:
   - Current temperature
   - Weather description
   - Humidity
   - Wind speed
   - Atmospheric pressure
   - "Feels like" temperature

## Troubleshooting

Common issues and solutions:

1. "City not found" error
   - Check the spelling of the city name
   - Try including the country code (e.g., "London,UK")

2. Weather data not loading
   - Verify your OpenWeather API key is correctly set in Replit Secrets
   - Check your internet connection
   - Try refreshing the page

3. Forecast not displaying
   - Ensure the city search was successful
   - Check the browser console for any error messages

## Contributing

1. Fork the project in Replit
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## Tech Stack

- React
- TypeScript
- TanStack Query
- Tailwind CSS
- Express.js
- OpenWeather API

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the project's issue tracker.

---
Built with ♥️ using Replit
