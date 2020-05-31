import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    UIManager,
    findNodeHandle,
    TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ICON_SIZE = 36

class PopUpMenu extends Component{

    state={
        icon: null
    }

    constructor(props){
        super(props);
    }

    onError=()=>{
        console.log('Popup error');
    }

    onPress=()=>{
        if(this.state.icon){
            UIManager.showPopupMenu(
                findNodeHandle(this.state.icon),
                this.props.actions,
                this.onError,
                this.props.onPress
            )
        }
    }

    onRef = icon => {
        if(!this.state.icon){
            this.setState({icon})
        }
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    <Icon 
                    name={this.props.name}
                    size={ICON_SIZE}
                    color={'#ffd27d'}
                    ref={this.onRef} />
                </TouchableOpacity>
            </View>
        );
    }
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainer: {
        backgroundColor: '#ffffff',
        margin: 50,
        padding: 10,
        borderRadius: 10,
        flex: 1
    }
})

export default PopUpMenu;
