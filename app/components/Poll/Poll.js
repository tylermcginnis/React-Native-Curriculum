import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'

Poll.propTypes = {
  data: PropTypes.object.isRequired,
}

export default function Poll ({data}) {
  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
