import axios from 'axios';
import haversine from 'haversine-distance';
const serverUrl = 'http://localhost:3000'

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

const setTokenNotif = (token) => {
  return {
    type: 'SET_TOKEN_NOTIF',
    payload: token
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
      url: `${serverUrl}/employee/message`,
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
      url: `${serverUrl}/employee/resetPassword`,
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
      url: `${serverUrl}/employee/requestCode`,
      data
    })
      .then(({ data }) => {
        console.log('MASUK SINIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        dispatch({type: "SET_RESET_CODE", payload: data.code})
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
      url: `${serverUrl}/employee/login`,
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
      url: `${serverUrl}/employee/paidLeave`,
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
    axios({
      method: 'post',
      url: `${serverUrl}/employee/sendQR`,
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

const fetchAbsence = ({ token }) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'get',
      url: `${serverUrl}/employee/absence/${id}`,
      headers: {
        token
      }
    })
    .then(({ data }) => {
      dispatch(setAbsence(data))
      dispatch(setLoading(false))
    })
    .catch(err => {
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

const setPaidLeave = (payload) => {
  return {
    type: "SET_PAIDLEAVE",
    payload
  }
}

const fetchPaidLeave = ({ token }) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: "GET",
      url: `${serverUrl}/employee/paidLeave`,
      headers: {
        token
      }
    })
    .then(({ data }) => {
      dispatch(setPaidLeave(data))
    })
    .catch(err => {
      console.log(err)
      dispatch(setError(err.response.data.message))
    })
    .finally(() => dispatch(setLoading(false)))
  }
}

const approvePaidLeave = ({ id, status, token }) => {  
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: "PUT",
      url: `${serverUrl}/employee/paidLeave/${id}`,
      data: { 
        status
      },
      headers: {
        token
      }
    })
      .then(({ data }) => {
        dispatch({
          type: 'APPROVE_PAIDLEAVE',
          payload: id
        })
        alert(`You ${status ? 'approved' : 'rejected' } the paid leave`)
      })
      .catch(err => {
        dispatch(setError(err.response.data.message))
      })
      .finally(() => dispatch(setLoading(false)))
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
  fetchPaidLeave,
  approvePaidLeave,
  setPaidLeave,
  fetchBroadcast,
  setTokenNotif,
}