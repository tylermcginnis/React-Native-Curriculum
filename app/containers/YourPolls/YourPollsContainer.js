import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { YourPolls } from '~/components'

class YourPollsContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  state = {
  }
  render () {
    return (
      <YourPolls
        openDrawer={this.props.openDrawer} />
    )
  }
}

function mapStateToProps () {
  return {

  }
}

export default connect(
  mapStateToProps
)(YourPollsContainer)