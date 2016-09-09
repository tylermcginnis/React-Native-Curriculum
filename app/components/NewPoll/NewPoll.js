import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { PollsNavbar, Close, Submit } from '~/components'
import { colors, fontSizes } from '~/styles'

function Option ({option, index, onUpdateOption, value}) {
  return (
    <TextInput
      maxLength={140}
      placeholder='Option'
      onChangeText={(text) => onUpdateOption(index, text)}
      value={value}
      style={styles.inputField}
    />
  )
}

NewPoll.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateOption: PropTypes.func.isRequired,
  onAddNewOption: PropTypes.func.isRequired,
  onSubmitPoll: PropTypes.func.isRequired,
  onClosePoll: PropTypes.func.isRequired,
}

export default function NewPoll (props) {
  return (
    <View style={styles.container}>
      <PollsNavbar
        title='New Poll'
        leftButton={<Close onPress={props.onClosePoll}/>}
        rightButton={<Submit onPress={props.onSubmitPoll}/>} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            maxLength={60}
            placeholder={'Poll Title'}
            autoFocus={true}
            style={styles.inputField}
            onChangeText={props.onUpdateTitle}
            value={props.title} />
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.label}>Options:</Text>
          {props.options.map((option, index) => (
            <Option
              key={index}
              option={option}
              index={index}
              value={props.options[index].text}
              onUpdateOption={props.onUpdateOption}
            />
          ))}
        </View>
        {props.options.length === 4
          ? null
          : <TouchableOpacity onPress={props.onAddNewOption} style={styles.newOptionBtn}>
              <Text style={styles.btnText}>New Option</Text>
            </TouchableOpacity>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  inputField: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: fontSizes.secondary,
    color: colors.primary,
    marginBottom: 3,
  },
  newOptionBtn: {
    backgroundColor: colors.blue,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 10,
  },
  btnText: {
    color: colors.white,
  }
})
