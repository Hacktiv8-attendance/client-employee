import axios from 'axios';

const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

const setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    payload: email,
  }
}

const setPassword = (password) => {
  return {
    type: 'SET_PASSWORD',
    payload: password
  }
}

const setLoading = () => {
  return {
    type: 'SET_LOADING'
  }
}

const setError = (error) => {
  return {
    type: 'SET_ERROR',
    payload: error
  }
}

const login = (data) => {
  return (dispatch) => {
    dispatch(setLoading())
    console.log('masok function')
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/employee/login',
      data,

    })
      .then(({ data }) => {
        console.log(data, '===succsess')
        dispatch(setUser(data))
        dispatch(setLoading())
      })
      .catch(err => {
        console.log(err)
        dispatch(setError(err))
        dispatch(setLoading())
      })
  }
}

export default {
  login,
  setUser,
  setPassword,
  setEmail
}