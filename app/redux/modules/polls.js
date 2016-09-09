import { ref } from '~/config/constants'

import { setOwnPolls } from '~/redux/modules/authentication'

const ADD_LISTENER = 'ADD_LISTENER'
const ADD_MUTIPLE_POLLS = 'ADD_MUTIPLE_POLLS'
const ADD_POLL = 'ADD_POLL'

function addListener () {
  return {
    type: ADD_LISTENER,
  }
}

function addMultiplePolls (polls) {
  return {
    type: ADD_MUTIPLE_POLLS,
    polls,
  }
}

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}

export function addAndHandlePoll (poll) {
  return function (dispatch, getState) {
    const {displayName, photoURL, authedId} = getState().authentication
    const id = ref.child('polls').push().key

    const pollPreview = {
      id,
      photoURL,
      displayName,
      uid: authedId,
      title: poll.title,
      numOfResponses: 0,
    }

    dispatch(setOwnPolls({[id]: {
      numOfResponses: 0,
      title: poll.title,
    }}))
    dispatch(addPoll({
      ...pollPreview,
      options: poll.options
    }))

    return Promise.all([
      ref.child(`pollPreviews/${id}`).set(pollPreview),
      ref.child(`pollData/${id}`).set(poll.options),
      ref.child(`users/${authedId}/ownPolls/${id}`).set({
        title: poll.title,
        numOfResponses: 0,
      })
    ])
  }
}

export function fetchAndSetPollsListener () {
  return function (dispatch, getState) {
    let listenerSet = false
    ref.child('pollPreviews')
      .on('value', (snapshot) => {
        dispatch(addMultiplePolls(snapshot.val() || {}))

        if (listenerSet === false) {
          dispatch(addListener())
          listenerSet = true
        }
      })
  }
}

const initialState = {
  listenerSet: false,
  polls: {},
}

export default function polls (state = initialState, action) {
  switch (action.type) {
    case ADD_POLL :
      return {
        ...state,
        polls: {
          ...state.polls,
          [action.poll.id]: action.poll,
        }
      }
    case ADD_MUTIPLE_POLLS :
      return {
        ...state,
        polls: {...action.polls},
      }
    case ADD_LISTENER :
      return {
        ...state,
        listenerSet: true,
      }
    default :
      return state
  }
}