import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getWeatherIconUrl } from '../utils/weatherApi';
import WeatherDetails from './WeatherDetails'
import FavoriteButton from './FavoriteButton';


interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min?: number;
    temp_max?: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
  timezone: number;
}

interface CurrentWeatherProps {
  data: WeatherData | null;
  units: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, units }) => {
  if (!data) return null;

  const {
    name,
    sys: { country },
    weather,
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max },
    wind: { speed },
    visibility,
    timezone
  } = data;

  const weatherDescription = weather[0].description;
  const iconCode = weather[0].icon;
  const iconUrl = getWeatherIconUrl(iconCode);
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  // Calculate city's local time using timezone offset
  const cityDate = new Date();
  // Adjust for the city's timezone
  // First get UTC time in ms
  const utcTime = cityDate.getTime() + (cityDate.getTimezoneOffset() * 60000);
  // Then add the city's timezone offset (converting from seconds to milliseconds)
  const cityTime = new Date(utcTime + (timezone * 1000));

  // Format date for the city
  const formattedDate = cityTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time for the city
  const formattedTime = cityTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Determine time of day for background styling based on city's local time
  const hour = cityTime.getHours();
  let timeStyle = {};

  if (hour >= 5 && hour < 12) {
    timeStyle = styles.morningBg;
  } else if (hour >= 12 && hour < 18) {
    timeStyle = styles.afternoonBg;
  } else if (hour >= 18 && hour < 21) {
    timeStyle = styles.eveningBg;
  } else {
    timeStyle = styles.nightBg;
  }

  // Determine background based on weather condition
  const getWeatherStyle = (iconCode: string) => {
    if (iconCode.includes('01')) return styles.clearBg;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return styles.cloudBg;
    if (iconCode.includes('09') || iconCode.includes('10')) return styles.rainBg;
    if (iconCode.includes('11')) return styles.thunderBg;
    if (iconCode.includes('13')) return styles.snowBg;
    if (iconCode.includes('50')) return styles.fogBg;
    return {};
  };

  const weatherStyle = getWeatherStyle(iconCode);

  return (
    <View style={[styles.weatherCard, timeStyle, weatherStyle]}>
      <View style={styles.cardBody}>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.locationInfo}>
              {/* Add the favorite button next to location */}

              <View style={[styles.weatherCard, timeStyle, weatherStyle]}>
                <View style={styles.cardBody}>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <View style={styles.locationInfo}>
                        <View style={styles.locationHeader}>
                          <Text style={styles.locationTitle}>
                            {name}, {country}
                          </Text>
                          <FavoriteButton
                            cityName={name}
                            countryCode={country}
                            temperature={temp}
                            condition={weatherDescription}
                          />
                        </View>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Text style={styles.timeText}>
                          {formattedTime} (Local Time)
                        </Text>
                      </View>

                      <View style={styles.currentWeather}>
                        <Image
                          source={{ uri: iconUrl }}
                          style={styles.weatherIcon}
                        />
                        <View>
                          <Text style={styles.currentTemp}>{Math.round(temp)}{tempUnit}</Text>
                          <Text style={styles.description}>{weatherDescription}</Text>

                          {temp_min && temp_max && Math.round(temp_min) !== Math.round(temp_max) && (
                            <View style={styles.tempRange}>
                              <Text style={styles.tempHigh}>
                                H: {Math.round(temp_max)}{tempUnit}
                              </Text>
                              <Text style={styles.tempLow}>
                                L: {Math.round(temp_min)}{tempUnit}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.detailsContainer}>
                      <WeatherDetails
                        feelsLike={Math.round(feels_like)}
                        humidity={humidity}
                        windSpeed={speed}
                        pressure={pressure}
                        visibility={visibility / 1000} // Convert to km
                        tempUnit={tempUnit}
                        windUnit={windUnit}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherCard: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#3f3f3f',
  },
  cardBody: {
    padding: 16,
  },
  row: {
    flexDirection: 'column',
  },
  column: {
    flex: 1,
  },
  locationInfo: {
    marginBottom: 20,
  },
  locationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 10,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginRight: 12,
  },
  currentTemp: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: '300',
  },
  tempRange: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tempHigh: {
    color: '#ff7f7f',
    marginRight: 12,
  },
  tempLow: {
    color: '#7f7fff',
  },
  detailsContainer: {
    marginTop: 20,
  },
  // Weather backgrounds
  morningBg: {
    backgroundColor: '#87CEEB',
  },
  afternoonBg: {
    backgroundColor: '#4682B4',
  },
  eveningBg: {
    backgroundColor: '#4B0082',
  },
  nightBg: {
    backgroundColor: '#191970',
  },
  clearBg: {
    backgroundColor: '#FFB300',
  },
  cloudBg: {
    backgroundColor: '#5b6d75',
  },
  rainBg: {
    backgroundColor: '#4f97d1',
  },
  thunderBg: {
    backgroundColor: '#5C6BC0',
  },
  snowBg: {
    backgroundColor: '#E0E0E0',
  },
  fogBg: {
    backgroundColor: '#BDBDBD',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
});

export default CurrentWeather;