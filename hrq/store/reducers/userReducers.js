const initialReducers = {
  token: '',
  payload: {
    id: 0,
    email: '',
    authLevel: 0,
  },
  login: {
    email: '',
    password: '',
  },
  loading: false,
  error: null,
}

export default function userReducers (state = initialReducers, action) {
  switch (action.type) {
    case 'SET_USER':
      console.log('masuk root set User')
      return {...state, token: action.payload.token, payload: action.payload.payload}
    case 'SET_EMAIL':
      return {...state, login: {email: action.payload, password: state.login.password}}
    case 'SET_PASSWORD':
      return {...state, login: {email: state.login.email, password: action.payload}}
    case 'SET_LOADING':
      console.log('masuk root set Loading')
      return {...state, loading: !state.loading}
    case 'SET_ERROR':
      console.log('masuk root set ERROR')
      return {...state, error: action.payload}
    default:
      console.log('masuk default')
      return state;
  }
}