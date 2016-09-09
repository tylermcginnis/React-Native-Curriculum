import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { YourPolls } from '~/components'

class YourPollsContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  componentDidMount () {

  }
  render () {
    return (
      <YourPolls
        openDrawer={this.props.openDrawer} />
    )
  }
}

function mapStateToProps ({polls}) {
  return {
    polls: true
  }
}

export default connect(
  mapStateToProps
)(YourPollsContainer)