import React, { PropTypes, Component } from 'react'
import { Navigator, Platform, Text } from 'react-native'
import { SplashContainer } from '~/containers'

export default class PollsNavigator extends Component {
  renderScene = (route, navigator) => {
    if (this.props.isAuthed === false) {
      return <SplashContainer navigator={navigator} />
    }

    return <Text>Authed!</Text>
  }
  configureScene = (route) => {
    if (Platform.OS === 'android') {
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }

    return Navigator.SceneConfigs.FloatFromRight
  }
  render () {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
}
