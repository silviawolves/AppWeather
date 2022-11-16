import React from 'react';
import dayjs from 'dayjs';

import {useState, useEffect} from 'react';
import {API_KEY} from '../../../api';
import {Text, View, StyleSheet, Image} from 'react-native';

interface Props {
    weather: any;
}

const Forecast = ({weather}: Props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${API_KEY}&units=metric`,
        )
            .then((response) => response.json())
            .then((data) => {
                setIsLoaded(true);
                setForecast(data.list);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [weather]);

    const formatDays = (forecast: any) => {
        return Object.values(forecast)
            .map((data: any) => {
                return {
                    days: dayjs(data.dt * 1000)
                        .add(1, 'day')
                        .format('dddd'),
                    dayIcon: data.weather[0].icon,
                    dayMaxTemp: data.main.temp_max,
                    dayMinTemp: data.main.temp_min,
                };
            })
            .filter(
                (value: any, i: number, self: any) =>
                    i === self.findIndex((day: any) => day.days === value.days),
            )
            .slice(0, 6);
    };

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 70}}>
                {formatDays(forecast)
                    .slice(0, 5)
                    .map((data: any, i) => {
                        return (
                            <View style={styles.forecast} key={i}>
                                <Text style={styles.daily}>{data.days}</Text>

                                <View style={styles.weather}>
                                    <Image
                                        source={{
                                            uri: `https://openweathermap.org/img/wn/${data.dayIcon}.png`,
                                        }}
                                        style={styles.img}
                                    />
                                </View>

                                <Text style={styles.temperature}>
                                    ↓ {Math.round(data.dayMaxTemp)}° |{' '}
                                    {Math.round(data.dayMinTemp)}° ↑
                                </Text>
                            </View>
                        );
                    })}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    forecast: {
        backgroundColor: 'rgba(255, 255, 255, .3)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    daily: {
        fontSize: 17,
        flexBasis: '33%',
        color: 'white',
    },
    weather: {
        flexBasis: '33%',
        alignItems: 'center',
    },
    img: {
        height: 50,
        width: 50,
    },
    temperature: {
        fontSize: 17,
        color: 'white',
        flexBasis: '33%',
        textAlign: 'right',
    },
});

export default Forecast;
