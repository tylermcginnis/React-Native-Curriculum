import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Image } from 'react-native'
import { colors, fontSizes } from '~/styles'

DrawerHeader.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

function DrawerHeader (props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: props.avatar}}/>
      <Text style={styles.nameText}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: 'center',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  nameText: {
    fontSize: fontSizes.primary,
    color: colors.primary,
    marginTop: 8,
    marginBottom: 3,
  },
})

export default connect(
  ({users, authentication}) => ({
    avatar: users[authentication.authedId].info.avatar,
    name: users[authentication.authedId].info.name,
  })
)(DrawerHeader)