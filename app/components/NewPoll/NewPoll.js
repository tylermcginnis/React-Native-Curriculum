import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { PollsNavbar, Close, Submit } from '~/components'

NewPoll.propTypes = {
  onSubmitPoll: PropTypes.func.isRequired,
  onClosePoll: PropTypes.func.isRequired,
}

export default function NewPoll (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        title='New Poll'
        leftButton={<Close onPress={props.onClosePoll}/>}
        rightButton={<Submit onPress={props.onSubmitPoll}/>} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
