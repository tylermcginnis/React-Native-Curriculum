import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fontSizes } from '~/styles'

function getPercentage (count, totalVotes) {
  return count === 0 && totalVotes === 0
    ? 0
    : Math.floor((count / totalVotes) * 100)
}

PollOptions.propTypes = {
  options: PropTypes.array.isRequired,
  showResults: PropTypes.bool.isRequired,
  totalVotes: PropTypes.number.isRequired,
  onPress: PropTypes.func,
}

export default function PollOptions (props) {
  const MaybeTouchable = props.showResults === true
    ? View
    : TouchableOpacity
  return (
    <View style={styles.container}>
      {props.options.map((option, index) => {
        return (
          <View key={index} style={styles.inner}>
            {props.showResults === true
              ? <Text style={styles.percentage}>{getPercentage(option.count, props.totalVotes)}%</Text>
              : null}
            <MaybeTouchable onPress={() => props.onPress(index)} style={styles.option}>
              <Text style={styles.optionText}>{option.text}</Text>
            </MaybeTouchable>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 5,
    flex: 4,
  },
  optionText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
  },
  percentage: {
    fontSize: fontSizes.primary,
    color: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 5,
    flex: 1
  },
})
