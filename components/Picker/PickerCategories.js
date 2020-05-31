import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

const PickerCategories = (props) => {
  /* const [selectedValue, setSelectedValue] = useState(props.kategorija1); */
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={props.selectedValue}
        style={{ height: 50, width: '100%', marginBottom: 15 }}
        onValueChange={props.setSelectedValue}
      >
        <Picker.Item label={props.kategorija1} value={props.kategorija1} />
        <Picker.Item label={props.kategorija2} value={props.kategorija2} />
        <Picker.Item label={props.kategorija3} value={props.kategorija3} />
        <Picker.Item label={props.kategorija4} value={props.kategorija4} />
      </Picker>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#eee'
  }
});

export default PickerCategories;