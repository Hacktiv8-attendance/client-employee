import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Text } from 'react-native';
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
                {paidLeave.length > 0
                    ? paidLeave.filter(element => element.completed !== true).map((element, index) => (
                    <ListPaidLeave
                        data={element}
                        key={index}
                    />
                    ))
                    : <Text style={styles.textBlank}>There is no request for approval</Text>
                }
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
    textBlank: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 200
    },
    statusBar: {
        height: Constant.statusBarHeight,
        backgroundColor: '#11999e'
    },
    contentContainer: {
        padding: 30,
        paddingTop:0
    },
    containerLoading: {
        flex: 1,
        backgroundColor: '#e4f9f5',
        alignItems: 'center',
        justifyContent: 'center'
    }
    
})