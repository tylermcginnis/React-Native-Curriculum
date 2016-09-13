import { ref } from '~/config/constants'
import { increaseCount, increaseNumOfResponses, addPollVotedOn, increaseUserNumOfResponses } from '~/api/polls'

import { setOwnPolls, setPollsVotedOn } from '~/redux/modules/authentication'

const ADD_LISTENER = 'ADD_LISTENER'
const ADD_MULTIPLE_POLLS = 'ADD_MULTIPLE_POLLS'
const ADD_POLL = 'ADD_POLL'
const SET_POLL_OPTIONS = 'SET_POLL_OPTIONS'
const INCREASE_RESPONSE_COUNT = 'INCREASE_RESPONSE_COUNT'

function addListener () {
  return {
    type: ADD_LISTENER,
  }
}

function addMultiplePolls (polls) {
  return {
    type: ADD_MULTIPLE_POLLS,
    polls,
  }
}

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}

function setPollOptions (id, options) {
  return {
    type: SET_POLL_OPTIONS,
    id,
    options,
  }
}

function increaseResponseCount (id, index) {
  return {
    type: INCREASE_RESPONSE_COUNT,
    id,
    index,
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
        const previousPollLength = Object.keys(getState().polls.polls).length
        const newPolls = snapshot.val() || {}
        if (previousPollLength !== Object.keys(newPolls).length) {
          dispatch(addMultiplePolls(snapshot.val() || {}))
        }

        if (listenerSet === false) {
          dispatch(addListener())
          listenerSet = true
        }
      })
  }
}

export function fetchAndHandlePollData (id) {
  return function (dispatch) {
    return ref.child(`pollData/${id}`)
      .once('value')
      .then((snapshot) => dispatch(setPollOptions(id, snapshot.val())))
  }
}

export function addAndHandleResponse (id, index, authorId) {
  return function (dispatch, getState) {
    dispatch(increaseResponseCount(id, index))
    dispatch(setPollsVotedOn({[id]: index}))
    return Promise.all([
      increaseCount(id, index),
      increaseNumOfResponses(id),
      increaseUserNumOfResponses(authorId, id),
      addPollVotedOn(getState().authentication.authedId, id, index)
    ])
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
    case ADD_MULTIPLE_POLLS :
      return {
        ...state,
        polls: {...action.polls},
      }
    case ADD_LISTENER :
      return {
        ...state,
        listenerSet: true,
      }
    case SET_POLL_OPTIONS :
      return {
        ...state,
        polls: {
          ...state.polls,
          [action.id]: {
            ...state.polls[action.id],
            options: action.options,
          }
        }
      }
    case INCREASE_RESPONSE_COUNT :
      return {
        ...state,
        polls: {
          ...state.polls,
          [action.id]: {
            ...state.polls[action.id],
            numOfResponses: state.polls[action.id].numOfResponses + 1,
            options: state.polls[action.id].options.map((option, index) => {
              return index === action.index
                ? {text: option.text, count: option.count + 1}
                : option
            })
          }
        }
      }
    default :
      return state
  }
}