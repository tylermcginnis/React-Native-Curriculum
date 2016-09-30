import React from 'react'
import { AppContainer } from '~/containers'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'
import * as reducers from './redux'

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    devTools()
  )
)

export default function Polls (props) {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}