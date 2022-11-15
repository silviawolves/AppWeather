/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import dayjs from 'dayjs';

import {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text,
    ImageBackground,
} from 'react-native';
import {API_KEY} from './api';

import DateLocation from './src/components/DateLocation';
import Forecast from './src/components/Forecast';
import Searchbar from './src/components/Searchbar';
import Weather from './src/components/Weather';

// import ClearUrl from './src/img/clear.jpg';
// import CloudyUrl from './src/img/cloudy.jpg';
// import DrizzleUrl from './src/img/drizzle.jpg';
// import FogUrl from './src/img/fog.jpeg';
// import RainUrl from './src/img/rain.jpg';
// import SnowUrl from './src/img/snow.jpg';
// import StormUrl from './src/img/storm.jpg';

const App = () => {
    const mapImage = (id: number) => {
        switch (true) {
            case id >= 200 && id <= 232:
                return require('./src/img/storm.jpg');
            case id >= 300 && id <= 321:
                return require('./src/img/drizzle.jpg');
            case id >= 500 && id <= 531:
                return require('./src/img/rain.jpg');
            case id >= 600 && id <= 622:
                return require('./src/img/snow.jpg');
            case id >= 701 && id <= 781:
                return require('./src/img/fog.jpeg');
            case id >= 801 && id <= 804:
                return require('./src/img/cloudy.jpg');
            case id === 800:
                return require('./src/img/clear.jpg');
            default:
                return require('./src/img/fog.jpeg');
        }
    };

    type weatherItem = {
        id: number;
        icon: any;
        main: string;
    };

    type result = {
        name: string;
        coord: {
            lon: number;
            lat: number;
        };
        sys: {
            country: string;
        };
        main: {
            temp_max: number;
            temp_min: number;
            temp: number;
        };
        weather: [weatherItem];
    };

    const onSubmit = (value: string) => {
        setCity(value);
        if (value === '') {
            setCity(city);
        }
    };

    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState('Ottawa');
    const [result, setResult] = useState<result>({
        name: '',
        coord: {
            lon: 0,
            lat: 0,
        },
        sys: {
            country: '',
        },
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
        },
        weather: [
            {
                id: 0,
                icon: '',
                main: '',
            },
        ],
    });

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        )
            .then((response) => response.json())
            .then((data) => {
                setIsLoaded(true);
                const result: result = {
                    name: data.name,
                    coord: {
                        lon: data.coord.lon,
                        lat: data.coord.lat,
                    },
                    sys: {
                        country: data.sys.country,
                    },
                    main: {
                        temp: data.main.temp,
                        temp_max: data.main.temp_max,
                        temp_min: data.main.temp_min,
                    },
                    weather: [
                        {
                            id: data.weather[0].id,
                            icon: data.weather[0].icon,
                            main: data.weather[0].main,
                        },
                    ],
                };
                setResult(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [city]);

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <SafeAreaView>
                <StatusBar barStyle="dark-content" />

                <ScrollView>
                    <View>
                        <ImageBackground
                            source={mapImage(result.weather[0].id)}
                            resizeMode="cover">
                            <View>
                                <Searchbar
                                    placeholder="Search city"
                                    onSubmit={onSubmit}
                                />
                            </View>

                            <DateLocation
                                city={result.name}
                                country={result.sys.country}
                                date={dayjs().format('dddd')}
                            />

                            <Weather
                                icon={result.weather[0].icon}
                                condition={result.weather[0].main}
                                temperature={Math.round(result.main.temp)}
                                maxTemp={Math.round(result.main.temp_max)}
                                minTemp={Math.round(result.main.temp_min)}
                            />

                            <Forecast weather={result} />
                        </ImageBackground>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default App;
