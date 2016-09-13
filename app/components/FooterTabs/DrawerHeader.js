import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { colors, fontSizes } from '~/styles'

DrawerHeader.propTypes = {
  photoURL: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
}

function DrawerHeader (props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: props.photoURL}}/>
      <Text style={styles.nameText}>{props.displayName}</Text>
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

function mapStateToProps ({users, authentication}) {
  const { authedId } = authentication
  return {
    photoURL: authentication.photoURL,
    displayName: authentication.displayName,
  }
}

export default connect(
  mapStateToProps
)(DrawerHeader)
