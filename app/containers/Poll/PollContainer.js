import React, { PropTypes, Component } from 'react'
import { Poll } from '~/components'

export default class PollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  state = {}
  render () {
    return (
      <Poll
        onBack={this.props.navigator.pop}/>
    )
  }
}
