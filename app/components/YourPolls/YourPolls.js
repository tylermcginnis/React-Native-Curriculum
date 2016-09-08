import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { PollsNavbar, HamburgerIcon } from '~/components'

YourPolls.propTypes = {

}

export default function YourPolls (props) {
  return (
    <View>
      <PollsNavbar
        leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
        title='Your Polls'/>
    </View>
  )
}

const styles = StyleSheet.create({

})
