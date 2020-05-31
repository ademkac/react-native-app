import React from 'react';
import { View, StyleSheet} from 'react-native';
import {SearchBar, ButtonGroup} from 'react-native-elements'


const header = (props) => {
    return (
        <View style={styles.container}>
           <SearchBar 
        containerStyle={{backgroundColor: 'white'}}
        inputContainerStyle={{backgroundColor: '#eee'}}
        placeholder="Pretraga..."
        lightTheme round editable={true}
        value={props.search}
        onChangeText={props.onChangeTextHandler}
        onClear={props.onClearHandler} />
        <ButtonGroup 
                       onPress={props.updateIndex}
                       selectedIndex={props.selectedIndex}
                       buttons={props.buttons}
                       containerStyle={{height: 40}} />
     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export default header;