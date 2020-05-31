import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    placeholder={props.placeholder}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
    onChangeText={props.onChangeText}
    value={props.value.value}
    valid={props.value.valid}
    touched={props.value.touched}
    multiline={props.multiline}
    numberOfLines={props.numberOfLines}
    textAlignVertical={props.textAlignVertical}
    autoCorrect={props.autoCorrect}
    autoCapitalize='sentences'
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: "red"
  }
});

export default defaultInput;