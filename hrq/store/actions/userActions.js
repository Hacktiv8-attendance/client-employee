import axios from 'axios';
import haversine from 'haversine-distance';

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

const setLocation = (loc) => {
  return {
    type: 'SET_LOCATION',
    payload: loc
  }
}

const setEmailReset = (value) => {
  return {
    type: 'SET_EMAIL_RESET',
    payload: value
  }
}

const setBroadcast = (data) => {
  return {
    type: 'SET_BROADCAST',
    payload: data
  }
}

const fetchBroadcast = (token) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'get',
      url: 'http://127.0.0.1:3000/employee/message',
      headers: {
        token
      }
    })
      .then(({ data }) => {
        dispatch(setBroadcast(data))
        dispatch(setLoading(false))
      })
      .catch(err => {
        console.log(err.response.data.message)
        dispatch(setError(err.response.data.message))
        dispatch(setLoading(false))
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
        console.log(err.response)
        dispatch(setError('Email not Found'))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    }
  }


const findEmail = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/employee/findEmail',
      data
    })
      .then(({ data }) => {
        console.log(data.email)
        dispatch(setEmailReset(data.email))
      })
      .catch(err => {
        console.log('INI ERRORRR')
        console.log(err.response)
        dispatch(setError('Email not Found'))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    }
  }
     

const login = (data) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/employee/login',
      data
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

const setStatusPaidLeave = (status) => {
  return {
    type: 'SET_STATUS_PAID_LEAVE',
    payload: status
  }
}

const requestPaidLeave = (data) => {
  console.log(data)
  const { SuperiorId, reason, leaveDate, duration, token } = data
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/employee/paidLeave',
      data: {
        SuperiorId,
        reason,
        leaveDate,
        duration
      },
      headers: {
        token
      }
    })
      .then(_ => {
        dispatch(setStatusPaidLeave('Request has been send'))
      })
      .catch(err => {
        console.log(err.response.data)
        dispatch(setStatusPaidLeave('Request cannot be process, please contact your superior'))
      })
  }
}

const absent = (data) => {
  const { token, EmployeeId, jwt, latitude, longitude } = data
  return (dispatch) => {
    dispatch(setLoading(true))
    const locEmployee = { latitude, longitude }
    const locOffice = { latitude: -6.468127, longitude: 106.765711 }
    const distance = haversine(locEmployee, locOffice)
    console.log(distance)
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/employee/sendQR',
      data: {
        EmployeeId,
        jwt
      },
      headers: {
        token
      }
    })
    .then(({ data }) => {
      dispatch(setStatusAbsence(data))
      dispatch(setLoading(false))
    })
    .catch(err => {
      dispatch(setError(err))
      dispatch(setLoading(false))
    })
  }
}

const setAbsence = (absence) => {
  return {
    type: 'SET_ABSENCES',
    payload: absence
  }
}

const fetchAbsence = ({ id, token }) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'get',
      url: `http://127.0.0.1:3000/employee/absence/`,
      headers: {
        token
      }
    })
    .then(({ data }) => {
      console.log(data)
      dispatch(setAbsence(data))
      dispatch(setLoading(false))
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch(setError(err.response.data.message))
      dispatch(setLoading(false))
    }) 
  }
}

const setStatusAbsence = (status) => {
  return {
    type: 'SET_STATUS_ABSENCE',
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
  absent,
  setLoading,
  setError,
  setLogin,
  fetchAbsence,
  resetPassword,
  setResetPassword,
  setEmailReset,
  findEmail,
  setLocation,
  requestPaidLeave,
  setStatusPaidLeave,
  fetchBroadcast
}