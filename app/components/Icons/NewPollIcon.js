import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '~/styles'

NewPollIcon.propTypes = {
  size: PropTypes.number.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

NewPollIcon.defaultProps = {
  size: 30,
}

export default function NewPollIcon (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon
        name='ios-add-outline'
        size={props.size}
        color={colors.blue} />
    </TouchableOpacity>
  )
}
