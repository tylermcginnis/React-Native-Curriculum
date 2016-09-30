import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { PollsNavbar, NewPollIcon, HamburgerIcon } from '~/components'

Home.propTypes = {
  openDrawer: PropTypes.func,
  onNewPoll: PropTypes.func.isRequired,
}

export default function Home (props) {
  return (
    <View styl>
      <PollsNavbar
        title='All Polls'
        leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
        rightButton={<NewPollIcon onPress={props.onNewPoll}/>} />
      <Text>
        Home
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
})
