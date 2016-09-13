import React, { PropTypes, Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { Home, PollPreview } from '~/components'

class HomeContainer extends Component {
  static propTypes = {
    polls: PropTypes.object.isRequired,
    pollsVotedOn: PropTypes.object.isRequired,
    ownPolls: PropTypes.object.isRequired,
    listenerSet: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
  }
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.polls)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.polls !== this.props.polls) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.polls)
      })
    }
  }
  handleNewPoll = () => {
    this.props.navigator.push({
      newPoll: true
    })
  }
  handlePollPress = (poll) => {
    this.props.navigator.push({
      poll: true,
      id: poll.id,
    })
  }
  renderRow = (data) => {
    return (
      <PollPreview
        key={data.id}
        onPress={() => this.handlePollPress(data)}
        isOwnPoll={typeof this.props.ownPolls[data.id] !== 'undefined'}
        hasTaken={typeof this.props.pollsVotedOn[data.id] !== 'undefined'}
        data={data}/>
    )
  }
  render () {
    return (
      <Home
        noPolls={Object.keys(this.props.polls).length === 0}
        listenerSet={this.props.listenerSet}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        handleNewPoll={this.handleNewPoll}
        openDrawer={this.props.openDrawer} />
    )
  }
}

function mapStateToProps ({polls, authentication}) {
  return {
    polls: polls.polls,
    ownPolls: authentication.ownPolls,
    pollsVotedOn: authentication.pollsVotedOn,
    listenerSet: polls.listenerSet,
  }
}

export default connect(
  mapStateToProps
)(HomeContainer)