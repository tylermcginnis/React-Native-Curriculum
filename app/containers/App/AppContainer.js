import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { PollsNavigator } from '~/containers'
import { PreSplash } from '~/components'

export default class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
  }
  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.isAuthenticating === true
          ? <PreSplash />
          : <PollsNavigator isAuthed={false} />}
      </View>
    )
  }
}