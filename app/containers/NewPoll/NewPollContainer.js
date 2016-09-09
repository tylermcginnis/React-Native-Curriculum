import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { NewPoll } from '~/components'
import { addAndHandlePoll } from '~/redux/modules/polls'

class NewPollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  state = {
    title: '',
    options: [
      {text: '', count: 0},
      {text: '', count: 0},
    ],
  }
  handleSubmitPoll = () => {
    this.props.dispatch(addAndHandlePoll({
      title: this.state.title,
      options: this.state.options,
    }))
    .then(this.props.navigator.pop)
  }
  handleAddNewOption = () => {
    this.setState({
      options: this.state.options.concat([{text: '', count: 0}])
    })
  }
  handleUpdateTitle = (title) => {
    this.setState({title})
  }
  handleUpdateOption = (index, text) => {
    this.setState({
      options: [
        ...this.state.options.slice(0, index),
        {text, count: 0},
        ...this.state.options.slice(index + 1)
      ]
    })
  }
  render () {
    return (
      <NewPoll
        title={this.state.title}
        options={this.state.options}
        onUpdateTitle={this.handleUpdateTitle}
        onUpdateOption={this.handleUpdateOption}
        onAddNewOption={this.handleAddNewOption}
        onClosePoll={this.props.navigator.pop}
        onSubmitPoll={this.handleSubmitPoll} />
    )
  }
}

export default connect()(NewPollContainer)
