import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { Home } from '~/components'

export default class HomeContainer extends Component {
  static propTypes = {}
  state = {}
  render () {
    return (
      <Home />
    )
  }
}
