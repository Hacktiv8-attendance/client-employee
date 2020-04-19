import axios from 'axios';
// import { useNavigation } from '@react-navigation/native'
// const navigation = useNavigation()

const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

const setLoading = (data) => {
  return {
    type: 'SET_LOADING',
    payload: data
  }
}

const setError = (error) => {
  return {
    type: 'SET_ERROR',
    payload: error
  }
}

const setResetPassword = (value) => {
  return {
    type: 'SET_RESET_PASSWORD',
    payload: value
  }
}

const login = (data) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/employee/login',
      data,

    })
      .then(({ data }) => {
        console.log(data, '===succsess')
        dispatch(setUser(data))
        dispatch(setLogin(true))
      })
      .catch(err => {
        console.log(err.response.data.message)
        dispatch(setError(err.response.data.message))
      })
  }
}

const resetPassword = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    console.log(data)
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/employee/resetPassword',
      data
    })
      .then(({ data }) => {
        console.log(data)
        dispatch(setResetPassword(true))
      })
      .catch(err => {
        console.log('INI ERRORRR')
        console.log(err.name)
        dispatch(setError(err))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    }
  }
      
      
const absent = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/employee/sendQR',
      data,
      headers: {
        token: data.token
      }
    })
    .then(({ data }) => {
      dispatch(setAbsent(data))
      dispatch(setLoading(false))
    })
    .catch(err => {
      dispatch(setError(err))
      dispatch(setLoading(false))
    })
  }
}

const setAbsent = (status) => {
  return {
    type: 'SET_ABSENT',
    payload: status
  }
}

const setLogin = (status) => {
  return {
    type: 'SET_LOGIN',
    payload: status
  }
}

export default {
  login,
  setUser,
  setPassword,
  setEmail,
  resetPassword,
  absent,
  setLoading,
  setError,
  setLogin
}