import React, { Component } from 'react'
import { Splash } from '~/components'

export default class SplashContainer extends Component {
  handleLoginFinished = (error, result) => {
    if (error) {
      console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      console.log('Auth Successful')
    }
  }
  render () {
    return (
      <Splash onLoginFinished={this.handleLoginFinished} />
    )
  }
}