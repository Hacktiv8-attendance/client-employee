import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';
import allAction from '../store/actions';
import _ from 'lodash'
import Footer from '../components/Footer';
import ListPaidLeave from '../components/ListPaidLeave';

export default function ApprovalScreen() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const paidLeave = useSelector(state => state.user.paidLeave);
    const [refreshing, setRefreshing] = useState(false)

    function wait(timeout) {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }
  
    const onRefresh = useCallback(() => {
      console.log('masukkk')
      setRefreshing(true);
      dispatch(allAction.user.fetchPaidLeave({ token: user.token}))
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    useEffect(() => {
        dispatch(allAction.user.fetchPaidLeave({ token: user.token}))
    }, [])

    if (user.loading && user.click === false) return (
        <View style={styles.container}>
          <View style={styles.statusBar} />
    
          <Header
            title="Paid Leave Approval"
          />
    
          <View style={styles.containerLoading}>
            <ActivityIndicator
              size='large'
              color='#11999e'
            />
          </View>
    
          <Footer />
        </View>
      )

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            
            <Header
                title="Paid Leave Approval"
            />

            <ScrollView
                style={[styles.container, {marginTop: 20}]}
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {paidLeave.filter(element => element.completed !== true).map((element, index) => (
                    <ListPaidLeave
                        data={element}
                        key={index}
                    />
                ))}
            </ScrollView>

            <Footer />
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
    paidLeaveContainer:{
        marginBottom: 15,
    },
    contentContainer: {
        padding: 30,
        paddingTop:0
    },
    paidLeaveButton: {
        marginBottom: 10,
        borderRadius: 45,
        width: 320,
        height: 45,
        padding: 30,
        backgroundColor: '#11999e',
    },
    paidLeaveButtonOdd: {
        marginBottom: 10,
        borderRadius: 5,
        width: 320,
        height: 45,
        backgroundColor: '#40514e',
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody: {
        backgroundColor: '#e4f9f5',
        height: 250,
        width: 250,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    modalOptionContainer: {
        width: 200,
        marginTop: 50,
        marginBottom: 15,
        justifyContent: "space-around",
        flexDirection: 'row'
    },
    modalOption: {
        width: 75
    },
    containerLoading: {
        flex: 1,
        backgroundColor: '#e4f9f5',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
})