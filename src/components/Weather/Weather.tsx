import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

type weatherProps = {
    icon: string;
    condition: string;
    temperature: number;
    maxTemp: number;
    minTemp: number;
};

const Weather = (props: weatherProps) => {
    return (
        <>
            <View style={styles.conditionsWrapper}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://openweathermap.org/img/wn/${props.icon}.png`,
                    }}
                />
                <Text style={styles.condition}>{props.condition}</Text>
            </View>

            <View style={styles.temperatureWrapper}>
                <Text style={styles.temperature}>{props.temperature}° C</Text>
            </View>

            <View style={styles.rangeWrapper}>
                <Text style={styles.range}>Max: {props.maxTemp}° C | </Text>
                <Text style={styles.range}> Min: {props.minTemp}° C</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    conditionsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    image: {
        height: 50,
        width: 50,
    },
    condition: {
        fontSize: 20,
        color: 'white',
        textTransform: 'uppercase',
        marginLeft: 20,
    },
    temperatureWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 80,
        color: 'white',
    },
    rangeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    range: {
        fontSize: 20,
        color: 'white',
        fontWeight: '200',
    },
});

export default Weather;
