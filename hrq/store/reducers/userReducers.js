const initialReducers = {
  payload: {
    id: 0,
    email: '',
    authLevel: 0,
    name: '',
  },
  token: '',
  absences: null,
  login: {
    email: '',
    password: '',
  },
  statusAbsence: '',
  successLogin: false,
  loading: false,
  error: null,
  resetPassword: false 
}

export default function userReducers (state = initialReducers, action) {
  switch (action.type) {
    case 'SET_USER':
      console.log('masuk root set User')
      return {...state, token: action.payload.token, payload: action.payload.payload}
    case 'SET_LOADING':
      console.log('masuk root set Loading')
      return {...state, loading: action.payload}
    case 'SET_LOGIN':
      return {...state, successLogin: action.payload}
    case 'SET_ERROR':
      console.log('masuk root set ERROR')
      return {...state, error: action.payload}
<<<<<<< HEAD
    case 'SET_RESET_PASSWORD':
      console.log('masuk root set reset password')
      return {...state, resetPassword: action.payload}
=======
    case "SET_STATUS_ABSENCE":
      return {...state, statusAbsence: action.payload}
    case 'SET_ABSENCES':
      return {...state, absences: action.payload}
>>>>>>> 6b6b806e1d5964467c2e9c36fd001d6feb4162ab
    default:
      console.log('masuk default')
      return state;
  }
}