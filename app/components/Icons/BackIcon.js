import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

BackIcon.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

BackIcon.defaultProps = {
  size: 30,
}

export default function BackIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name='ios-arrow-back-outline'
        size={props.size}
        color={colors.blue} />
    </TouchableOpacity>
  )
}
