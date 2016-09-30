import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { PollsNavbar, BackIcon, PollPreview } from '~/components'
import PollOptions from './PollOptions'
import { colors } from '~/styles'

Poll.propTypes = {
  isOwnPoll: PropTypes.bool.isRequired,
  hasTaken: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onPress: PropTypes.func,
}

export default function Poll (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        title='All Polls'
        leftButton={<BackIcon onPress={props.onBack} />} />
      <PollPreview
        onPress={() => ({})}
        isOwnPoll={props.isOwnPoll}
        hasTaken={props.hasTaken}
        data={props.data}/>
      {!props.data.options
        ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary}/>
        : <PollOptions
            totalVotes={props.data.numOfResponses}
            onPress={props.onPress}
            showResults={props.hasTaken || props.isOwnPoll}
            options={props.data.options} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  activityIndicator: {
    marginTop: 30,
  },
})
