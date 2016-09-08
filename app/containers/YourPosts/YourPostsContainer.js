import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { YourPosts } from '~/components'

export default class YourPostsContainer extends Component {
  static propTypes = {}
  state = {}
  render () {
    return (
      <YourPosts />
    )
  }
}
