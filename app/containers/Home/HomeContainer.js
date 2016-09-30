import React, { PropTypes, Component } from 'react'
import { Home } from '~/components'

export default class HomeContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  handleNewPoll = () => {
    this.props.navigator.push({
      newPoll: true
    })
  }
  render () {
    return (
      <Home
        onNewPoll={this.handleNewPoll}
        openDrawer={this.props.openDrawer} />
    )
  }
}
