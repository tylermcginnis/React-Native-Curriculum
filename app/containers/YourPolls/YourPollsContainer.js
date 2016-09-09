import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { YourPolls } from '~/components'

class YourPollsContainer extends Component {
  static propTypes = {
    polls: PropTypes.array.isRequired,
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  componentDidMount () {

  }
  render () {
    return (
      <YourPolls
        polls={this.props.polls}
        openDrawer={this.props.openDrawer} />
    )
  }
}

function mapStateToProps ({polls, authentication}) {
  return {
    polls: Object.keys(authentication.ownPolls).map((id) => polls.polls[id])
  }
}

export default connect(
  mapStateToProps
)(YourPollsContainer)