import React, { PropTypes, Component } from 'react'
import { Navigator, Platform } from 'react-native'
import { SplashContainer } from '~/containers'

export default class PollsNavigator extends Component {
  renderScene = (route, navigator) => {
    return <SplashContainer navigator={navigator} />
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
