import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { PollsNavbar, BackIcon } from '~/components'
import { colors } from '~/styles'

Poll.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default function Poll (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        title='All Polls'
        leftButton={<BackIcon onPress={props.onBack} />} />
      <Text>
        Poll
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
})
