import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '~/styles'

Poll.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    numOfResponses: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  hasTaken: PropTypes.bool,
  isOwnPoll: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

Poll.defaultProps = {
  hasTaken: false,
}

export default function Poll ({data, hasTaken, isOwnPoll, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {borderColor: hasTaken || isOwnPoll ? colors.blue : colors.red}]}>
      <View style={styles.top}>
        <Image style={styles.img} source={{uri: data.photoURL}} />
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.txt}>{data.displayName}</Text>
        <Text style={styles.txt}>Count: {data.numOfResponses}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 2,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  title: {
    color: colors.primary,
    fontSize: fontSizes.primary,
    flexWrap: 'wrap',
    flex: 1,
  },
  txt: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
  },
})
