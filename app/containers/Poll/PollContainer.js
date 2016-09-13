import React, { PropTypes, Component } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { Poll } from '~/components'
import { fetchAndHandlePollData, addAndHandleResponse } from '~/redux/modules/polls'

class PollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    poll: PropTypes.object.isRequired,
    ownPolls: PropTypes.object.isRequired,
    pollsVotedOn: PropTypes.object.isRequired,
  }
  componentDidMount () {
    if (!this.props.poll.options) {
      InteractionManager.runAfterInteractions(() => {
        this.props.dispatch(fetchAndHandlePollData(this.props.poll.id))
      })
    }
  }
  render () {
    return (
      <Poll
        onPress={(index) => this.props.dispatch(addAndHandleResponse(this.props.poll.id, index, this.props.poll.uid))}
        data={this.props.poll}
        isOwnPoll={typeof this.props.ownPolls[this.props.poll.id] !== 'undefined'}
        hasTaken={typeof this.props.pollsVotedOn[this.props.poll.id] !== 'undefined'}
        onBack={this.props.navigator.pop}/>
    )
  }
}

function mapStateToProps ({polls, authentication}, props) {
  return {
    poll: polls.polls[props.id],
    ownPolls: authentication.ownPolls,
    pollsVotedOn: authentication.pollsVotedOn,
  }
}

export default connect(
  mapStateToProps
)(PollContainer)