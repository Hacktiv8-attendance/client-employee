import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, ScrollView, RefreshControl } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';
import allAction from '../store/actions';
import moment from 'moment';
import _ from 'lodash'

export default function ApprovalScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const paidLeave = useSelector(state => state.user.paidLeave);
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState({})
    const loading = useSelector(state => state.user.loading)

    const refreshGesture = () => {
        dispatch(allAction.user.fetchPaidLeave({ token: user.token}))
    }

    const approval = (status) => {
        const payload = { status, id: modalContent.id, token: user.token }
        dispatch(allAction.user.approvePaidLeave(payload))
        setModal(!modal)
    }

    useEffect(() => {
        dispatch(allAction.user.fetchPaidLeave({ token: user.token}))
    }, [])

    return (
        <ScrollView 
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshGesture} />
            }
        >
            <View style={styles.statusBar}/>
            <Header title="Paid Leave Approval" />

            <View style={styles.paidLeaveContainer}>
                {paidLeave.filter(element => element.completed !== true).map((element, index) => (
                    <TouchableOpacity
                        style={index % 2 === 0 ? styles.paidLeaveButton : styles.paidLeaveButtonOdd }
                        key={element.id}
                        onPress={() => {
                            setModalContent(element)
                            setModal(!modal)
                        }}
                    >   
                        <Text style={{color: 'white'}}>{element.Employee.name}</Text>
                        <Text style={{color: 'white'}}>{element.reason}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            { modalContent && 
                <Modal
                    onRequestClose={() => setModal(!modal)}
                    animationType="fade"
                    visible={modal}
                    transparent={true}
                >   
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBody}>
                            <Text>{_.get(modalContent, ['Employee', 'name'])}</Text>
                            <Text>Reason: {modalContent.reason}</Text>
                            <Text>Duration: {modalContent.duration} day(s)</Text>
                            <Text>Start: {moment(modalContent.leaveDate).format('dddd, DD MMMM YYYY')} </Text>
                            <Text>End: {moment(modalContent.leaveDate).add(modalContent.duration - 1, 'd').format('dddd, DD MMMM YYYY')} </Text>
                            <View style={styles.modalOptionContainer}>
                                <Button color="#30e3ca" onPress={() => approval(true)} title="Approve" />
                                <Button color="#11999e" onPress={() => approval(false)} title="Reject" />
                            </View>
                            <Button color="#40514e" onPress={() => setModal(!modal)} title="Cancel" />
                        </View>
                    </View>
                </Modal>
            }
        </ScrollView>
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',

    },
    paidLeaveButton: {
        marginBottom: 10,
        borderRadius: 5,
        width: 320,
        height: 45,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#11999e',
    },
    paidLeaveButtonOdd: {
        marginBottom: 10,
        borderRadius: 5,
        width: 320,
        height: 45,
        justifyContent: "center",
        alignItems: 'center',
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
    }
    
})