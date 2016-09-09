import { getAccessToken, authWithToken, updateUser, logout } from '~/api/auth'
import { ref } from '~/config/constants'
import { fetchAndSetPollsListener } from '~/redux/modules/polls'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'
export const LOGGING_OUT = 'LOGGING_OUT'
const SET_POLLS_VOTED_ON = 'SET_POLLS_VOTED_ON'
const SET_OWN_POLLS = 'SET_OWN_POLLS'

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

function loggingOut () {
  return {
    type: LOGGING_OUT
  }
}

function setPollsVotedOn (polls) {
  return {
    type: SET_POLLS_VOTED_ON,
    polls,
  }
}

export function setOwnPolls (ownPolls) {
  return {
    type: SET_OWN_POLLS,
    ownPolls,
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
      ref.child(`users/${uid}`)
        .once('value')
        .then((snapshot) => {
          const userInfo = snapshot.val()
          return Promise.all(
            userInfo === null
              ? [
                  dispatch(setPollsVotedOn({})),
                  dispatch(setOwnPolls({})),
                  dispatch(fetchAndSetPollsListener()),
                ]
              : [
                  dispatch(setPollsVotedOn(userInfo.pollsVotedOn || {})),
                  dispatch(setOwnPolls(userInfo.ownPolls || {})),
                  dispatch(fetchAndSetPollsListener()),
              ]
          )
        })
        .then(() => dispatch(isAuthed(uid, displayName, photoURL)))

      updateUser({uid, displayName, photoURL})
    }
  }
}

export function handleUnauth () {
  return function (dispatch) {
    logout()
    dispatch(loggingOut())
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: true,
  authedId: '',
  displayName: '',
  photoURL: '',
  pollsVotedOn: {},
  ownPolls: {},
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
    case SET_POLLS_VOTED_ON :
      return {
        ...state,
        pollsVotedOn: {
          ...state.polls,
          ...action.polls
        }
      }
    case SET_OWN_POLLS :
      return {
        ...state,
        ownPolls: {
          ...state.ownPolls,
          ...action.ownPolls
        }
      }
    default :
      return state
  }
}