import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { PollsNavbar, HamburgerIcon, PollPreview } from '~/components'

YourPolls.propTypes = {
  openDrawer: PropTypes.func,
}

export default function YourPolls (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
        title='Your Polls'/>
      <Text>
        YourPolls
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
