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
  statusPaidLeave: '',
  successLogin: false,
  loading: false,
  location: null,
  error: null,
  resetPassword: false,
  emailReset: '',
  paidLeave: []
}

export default function userReducers (state = initialReducers, action) {
  switch (action.type) {
    case 'SET_USER':
      console.log('masuk root set User')
      return {...state, token: action.payload.token, payload: action.payload.payload}
    case 'SET_LOADING':
      console.log('masuk root set Loading')
      return {...state, loading: action.payload}
    case 'SET_STATUS_PAID_LEAVE':
      console.log('masuk root set paid leave')
      return {...state, statusPaidLeave: action.payload}
    case 'SET_LOGIN':
      return {...state, successLogin: action.payload}
    case 'SET_LOCATION':
      console.log('setLocation', action.payload)
      return {...state, location: action.payload}
    case 'SET_ERROR':
      console.log('masuk root set ERROR')
      return {...state, error: action.payload}
    case "SET_STATUS_ABSENCE":
      return {...state, statusAbsence: action.payload}
    case 'SET_ABSENCES':
      return {...state, absences: action.payload}
    case 'SET_RESET_PASSWORD':
      return {...state, resetPassword: action.payload}
    case 'SET_EMAIL_RESET':
      return {...state, emailReset: action.payload}
    case 'SET_PAIDLEAVE':
      return {...state, paidLeave: action.payload}
    default:
      console.log('masuk default')
      return state;
  }
}