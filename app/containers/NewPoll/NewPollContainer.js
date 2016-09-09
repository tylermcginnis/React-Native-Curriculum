import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { NewPoll } from '~/components'

export default class NewPollContainer extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  state = {
    title: '',
    options: [
      {text: ''},
      {text: ''},
    ],
  }
  handleSubmitPoll = () => {
    console.log(this.state)
    this.props.navigator.pop()
  }
  handleAddNewOption = () => {
    this.setState({
      options: this.state.options.concat([{text: ''}])
    })
  }
  handleUpdateTitle = (title) => {
    this.setState({title})
  }
  handleUpdateOption = (index, text) => {
    this.setState({
      options: [
        ...this.state.options.slice(0, index),
        {text},
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
