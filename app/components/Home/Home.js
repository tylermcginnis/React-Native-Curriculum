import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform, ActivityIndicator, ListView } from 'react-native'
import { PollsNavbar, NewPollIcon, HamburgerIcon } from '~/components'
import { colors, fontSizes } from '~/styles'

Home.propTypes = {
  noPolls: PropTypes.bool.isRequired,
  listenerSet: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  openDrawer: PropTypes.func,
  handleNewPoll: PropTypes.func.isRequired,
}

export default function Home (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        title='All Polls'
        leftButton={Platform.OS === 'android' ? <HamburgerIcon onPress={props.openDrawer} /> : null}
        rightButton={<NewPollIcon onPress={props.handleNewPoll}/>} />
      {props.listenerSet === false
        ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary}/>
        : props.noPolls === true
            ? <Text style={styles.noPolls}>There are no polls 😞</Text>
            : <ListView renderRow={props.renderRow} dataSource={props.dataSource} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  activityIndicator: {
    marginTop: 30,
  },
  noPolls: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fontSizes.primary,
    margin: 30,
  }
})
