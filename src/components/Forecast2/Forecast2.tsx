import React from 'react';
import dayjs from 'dayjs';

import {useState, useEffect} from 'react';
import {API_KEY} from '../../../api';
import {Text, View, StyleSheet, Image} from 'react-native';

interface Props {
    weather: any;
}

const Forecast2 = ({weather}: Props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${API_KEY}&units=metric`,
        )
            .then((response) => response.json())
            .then((data) => {
                setIsLoaded(true);
                // const forecast: forecast = {
                //     list: [
                //         {
                //             dt: data.list[0].dt,
                //             main: {
                //                 temp_max: data.list[0].main.temp_max,
                //                 temp_min: data.list[0].main.temp_min,
                //             },
                //             weather: [
                //                 {
                //                     main: data.list[0].weather[0].main,
                //                     icon: data.list[0].weather[0].icon,
                //                 },
                //             ],
                //         },
                //     ],
                // };
                setForecast(data.list);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [weather]);

    const day = (forecast: any) => {
        Object.values(forecast).map((data: any) => {
            const days = dayjs(data.dt * 1000).format('dddd');
            const dayIcon = data.weather[0].icon;
            const dayMaxTemp = data.main.temp_max;
            const dayMinTemp = data.main.temp_min;
            console.log(
                Math.round(dayMaxTemp),
                Math.round(dayMinTemp),
                dayIcon,
            );
            console.log('weather ' + days);
            // .filter(
            //     (value, i, self) =>
            //         i === self.findIndex((day) => day.dt === value.dt),
            // );
        });
    };

    // const filteredDays = (day) => {
    //     return day.filter(
    //         (value, i, self) =>
    //             i === self.findIndex((day) => day.dt === value.dt),
    //     );
    // };
    // console.log(filteredDays());

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 70}}>
                {Object.values(forecast)
                    .slice(0, 5)
                    .map((data: any, i) => {
                        return (
                            <View style={styles.forecast} key={i}>
                                <Text style={styles.daily}>
                                    {dayjs(data.dt * 1000).format('dddd')}
                                </Text>

                                <View style={styles.weather}>
                                    <Image
                                        source={{
                                            uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                                        }}
                                        style={styles.img}
                                    />
                                </View>

                                <Text style={styles.temperature}>
                                    ↓ {Math.round(data.main.temp_min)}° |{' '}
                                    {Math.round(data.main.temp_max)}° ↑
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
        padding: 20,
        marginBottom: 10,
    },
    daily: {
        fontSize: 15,
        flexBasis: '33%',
        color: 'white',
    },
    weather: {
        flexBasis: '33%',
        alignItems: 'center',
    },
    img: {
        height: 30,
        width: 30,
    },
    temperature: {
        color: 'white',
        flexBasis: '33%',
        textAlign: 'right',
    },
});

export default Forecast2;
