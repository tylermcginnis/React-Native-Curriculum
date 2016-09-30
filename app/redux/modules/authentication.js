import { getAccessToken, authWithToken, updateUser, logout } from '~/api/auth'

const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
const AUTHENTICATING = 'AUTHENTICATING'

function authenticating () {
  return {
    type: AUTHENTICATING,
  }
}


function notAuthed () {
  return {
    type: NOT_AUTHED,
  }
}

function isAuthed (uid, displayName, photoURL) {
  return {
    type: IS_AUTHED,
    uid,
    displayName,
    photoURL,
  }
}

export function handleAuthWithFirebase () {
  return function (dispatch, getState) {
    dispatch(authenticating())
    return getAccessToken()
      .then(({accessToken}) => authWithToken(accessToken))
      .catch((error) => console.warn('Error in handleAuthWithFirebase: ', error))
  }
}

export function onAuthChange (user) {
  return function (dispatch) {
    if (!user) {
      dispatch(notAuthed())
    } else {
      const { uid, displayName, photoURL } = user
      dispatch(isAuthed(uid, displayName, photoURL))
      updateUser({uid, displayName, photoURL})
    }
  }
}

const initialState = {
  isAuthed: true,
  isAuthenticating: false,
  authedId: '',
}

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true,
      }
    case NOT_AUTHED :
      return {
        ...state,
        isAuthenticating: false,
        isAuthed: false,
        authedId: '',
      }
    case IS_AUTHED :
      return {
        ...state,
        isAuthed: true,
        isAuthenticating: false,
        authedId: action.uid,
        displayName: action.displayName,
        photoURL: action.photoURL,
      }
    default :
      return state
  }
}