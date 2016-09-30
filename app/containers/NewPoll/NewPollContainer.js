import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { NewPoll } from '~/components'

export default class NewPollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  state = {}
  handleSubmitPoll = () => {

  }
  render () {
    return (
      <NewPoll
        onClosePoll={this.props.navigator.pop}
        onSubmitPoll={this.handleSubmitPoll} />
    )
  }
}
