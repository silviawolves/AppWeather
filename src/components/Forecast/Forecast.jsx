import React from 'react';
import dayjs from 'dayjs';

import {useState, useEffect} from 'react';
import {API_KEY} from '../../../api';
import {View, StyleSheet, Text, Image} from 'react-native';

// type weatherItem = {
//     icon: string;
//     main: string;
// };

// type listItem = {
//     dt: number;
//     main: {
//         temp_max: number;
//         temp_min: number;
//     };
//     weather: weatherItem[];
// };

// type forecast = {
//     list: listItem[];
// };

const Forecast = (props) => {
    // const daily = (formatDay) => {
    //     return forecast
    //         .map(day => {
    //             return {

    //             }
    //         })
    // }

    // const filterDays = (forecast) => {
    //     const arrayFilter = [];
    //         if(arrayFilter.contains(forecast.dt.value)){
    //             return ''
    //         }
    //         else{
    //             arrayFilter.push(forecast.dt.value)
    //             return arrayFilter
    //         }
    // }

    const [isLoaded, setIsLoaded] = useState(false);
    const [forecast, setForecast] = useState({});
    // const [forecast, setForecast] = useState<forecast>({
    //     list: [
    //         {
    //             dt: 0,
    //             main: {
    //                 temp_max: 0,
    //                 temp_min: 0,
    //             },
    //             weather: [
    //                 {
    //                     main: '',
    //                     icon: '',
    //                 },
    //             ],
    //         },
    //     ],
    // });

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${props.data.coord.lat}&lon=${props.data.coord.lon}&appid=${API_KEY}&units=metric`,
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
    }, [props]);

    // const daily = (forecast) => {
    //     let daysFormatted = [];
    //     Object.values(forecast).map((data) => {
    //         const singleDays = dayjs(data.dt * 1000).format('dddd');
    //         console.log(singleDays);
    //         return daysFormatted;
    //     });
    // };
    // console.log(daily(forecast));

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={styles.wrapper}>
                {Object.values(forecast)
                    .slice(0, 5)
                    .map((data, i) => {
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
                {/* // .filter((value, i, self) => // i === self.findIndex(data =>
                data.dt === value.dt) // .slice(0, 6); // )} */}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 70,
    },
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

export default Forecast;
