import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import CategoriesItem from '../../components/CategoriesItem/CategoriesItem';

const ITEM_WIDTH = Dimensions.get('window').width

class CategoriesScreen extends Component{
    
    state = {
        column: 2
    }

    constructor(props){
        super(props);
    }

    onNavigate=()=>{
        this.props.navigation.navigate('Kategorija1');
    }

    


    render(){
      const {column} = this.state
        return(
            <View style={styles.MainContainer}>
                <FlatList
                numColumns={column}
                 data={[
                       require("../../assets/1.jpg"),
                       require("../../assets/2.jpg"),
                       require("../../assets/3.jpg"),
                       require("../../assets/4.png"),
                   ]}
                   renderItem={({item})=> {
                       return <CategoriesItem 
                       itemWidth={(ITEM_WIDTH-20)/column} 
                       image={item}
                       onPress={this.onNavigate} />
                   }}
                   keyExtractor={
                       (index)=>{ return index}
                   } />
               
            </View>
            );
    }
    
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
  });

export default CategoriesScreen;