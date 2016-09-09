import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { PollsNavbar, HamburgerIcon } from '~/components'
import { colors, fontSizes } from '~/styles'

function Poll ({data}) {
  return (
    <Text>{JSON.stringify(data)}</Text>
  )
}

YourPolls.propTypes = {
  polls: PropTypes.array.isRequired,
  openDrawer: PropTypes.func,
}

export default function YourPolls (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
        title='Your Polls'/>
      {props.polls.length === 0
        ? <Text style={styles.noData}>Make your first poll! 🚀</Text>
        : props.polls.map((data) => <Poll key={data.id} data={data}/>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noData: {
    margin: 20,
    textAlign: 'center',
    fontSize: fontSizes.primary,
    color: colors.primary,
  }
})
