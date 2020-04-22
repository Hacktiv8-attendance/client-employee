import axios from 'axios';
import haversine from 'haversine-distance';
const serverUrl = 'http://18.138.253.176'

const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

const setClick = (status) => {
  return {
    type: 'SET_CLICK',
    payload: status
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
        dispatch(setError(err.response.data.message))
        dispatch(setLoading(false))
      })
  }
}

const resetPassword = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    axios({
      method: 'POST',
      url: `${serverUrl}/employee/resetPassword`,
      data
    })
      .then(({ data }) => {
        dispatch(setResetPassword(true))
      })
      .catch(err => {
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
        dispatch({type: "SET_RESET_CODE", payload: data.code})
      })
      .catch(_ => {
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
        dispatch(setUser(data))
        dispatch(setLogin(true))
      })
      .catch(err => {
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
      .catch(_ => {
        dispatch(setStatusPaidLeave('Request cannot be process, please contact your superior'))
      })
  }
}

const absent = (data) => {
  const { token, EmployeeId, jwt, latitude, longitude } = data
  return (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setClick(true))
    const locEmployee = { latitude, longitude }
    const locOffice = { latitude: -6.468127, longitude: 106.765711 }
    const distance = haversine(locEmployee, locOffice)
    if (Number(distance) < 500) {
      dispatch(setStatusAbsence('Absence failed, please check your location'))
      dispatch(setLoading(false))
    }
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
    .then(_ => {
      dispatch(setLoading(false))
      dispatch(setClick(false))
    })
    .catch(err => {
      dispatch(setError(err))
      dispatch(setClick(false))
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
      url: `${serverUrl}/employee/absence`,
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
  setClick,
  setStatusAbsence
}