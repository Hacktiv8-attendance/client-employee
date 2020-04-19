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
    case "SET_STATUS_ABSENCE":
      return {...state, statusAbsence: action.payload}
    case 'SET_ABSENCES':
      return {...state, absences: action.payload}
    default:
      console.log('masuk default')
      return state;
  }
}