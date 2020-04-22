const initialReducers = {
  payload: {
    id: 0,
    email: '',
    authLevel: 0,
    name: '',
  },
  token: '',
  tokenNotif: null,
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
  broadcast: null,
  resetPassword: false,
  emailReset: '',
  paidLeave: [],
  resetCode: null,
  click: false
}

export default function userReducers (state = initialReducers, action) {
  switch (action.type) {
    case 'SET_USER':
      return {...state, token: action.payload.token, payload: action.payload.payload}
    case 'SET_LOADING':
      return {...state, loading: action.payload}
    case 'SET_STATUS_PAID_LEAVE':
      return {...state, statusPaidLeave: action.payload}
    case 'SET_LOGIN':
      return {...state, successLogin: action.payload}
    case 'SET_LOCATION':
      return {...state, location: action.payload}
    case 'SET_ERROR':
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
    case 'APPROVE_PAIDLEAVE' :
      return {...state, paidLeave: [...state.paidLeave].filter(paidLeave => paidLeave.id !== action.payload)}
    case 'SET_BROADCAST':
      return {...state, broadcast: action.payload}
    case 'SET_RESET_CODE':
      return {...state, resetCode: action.payload}
    case 'SET_TOKEN_NOTIF':
      return {...state, tokenNotif: action.payload}
    case 'SET_CLICK':
      return {...state, click: action.payload}
    default:
      return state;
  }
}