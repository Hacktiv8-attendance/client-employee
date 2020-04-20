import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';
import allAction from '../store/actions';
import moment from 'moment';
import Footer from '../components/Footer';

export default function ApprovalScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const paidLeave = useSelector(state => state.user.paidLeave)
    
    const fetchButton = () => {
        dispatch(allAction.user.fetchPaidLeave({ token: user.token}))
    }

    const elementPress = (id) => {
        console.log(id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            <Header />
            <TouchableOpacity 
                style={styles.button}
                onPress={fetchButton}
                >
                <Text style={styles.buttonText}>Fetch Approval</Text>
            </TouchableOpacity>
            {paidLeave.map(element => (
                <TouchableOpacity
                    key={element.id}
                    onPress={() => elementPress(element.id)}
                >
                    <Text>{element.reason}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4f9f5',
    },
    statusBar: {
        height: Constant.statusBarHeight,
        backgroundColor: '#11999e'
    },
    button: {
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11999e',
    },
    buttonText: {
        textAlign: 'center',
        color: '#e4f9f5'
    },
})