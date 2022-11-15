import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type dateLocationProps = {
    city: string;
    country: string;
    date: string;
};

const DateLocation = (props: dateLocationProps) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.location}>
                {props.city}, {props.country}
            </Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: 30,
    },
    location: {
        fontSize: 32,
        color: 'white',
        paddingBottom: 10,
    },
    date: {
        fontSize: 20,
        color: 'white',
        fontWeight: '200',
    },
});

export default DateLocation;
