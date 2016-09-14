import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { PollsNavigator } from '~/containers'
import { PreSplash } from '~/components'
import { connect } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
  }
  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.isAuthenticating === true
          ? <PreSplash />
          : <PollsNavigator isAuthed={this.props.isAuthed} />}
      </View>
    )
  }
}

function mapStateToProps ({authentication}) {
  return {
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
  }
}

export default connect(
  mapStateToProps
)(AppContainer)