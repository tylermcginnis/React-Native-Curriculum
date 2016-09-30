import React, { PropTypes, Component } from 'react'
import { YourPolls } from '~/components'

export default class YourPollsContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  render () {
    return (
      <YourPolls
        openDrawer={this.props.openDrawer} />
    )
  }
}
