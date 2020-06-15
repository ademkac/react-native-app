import React from 'react';
import {StyleSheet} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import TabBarIcon from '../assets/TabBarIcon';



const CustomDrawerContent = (props) => {
     /* let content = (
        <DrawerItem 
        label='Prijava'
        labelStyle={{
            color: '#ede7e6',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,

        }}
        icon = {(focused)=> <TabBarIcon focused={focused} style={styles.iconColor} name='md-log-in'/>}
        onPress={()=>props.navigation.navigate('Prijava')}
        />
    )

         if(this.props.isLoggedIn){
             content= (
                <DrawerItem 
        label='Odjavite se'
        labelStyle={{
            color: '#ede7e6',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,

        }}
        icon = {(focused)=> <TabBarIcon focused={focused} style={styles.iconColor} name='md-log-out'/>}
        onPress={()=>props.navigation.navigate('Logout')}
        />
             )
         }   */

    return(
<DrawerContentScrollView style={{backgroundColor:'#947a47'}}>
        <DrawerItem 
        label='Aplikacija'
        labelStyle={{
            color: '#ede7e6',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20
            

        }}
                
          />
        <DrawerItem 
        label='Pocetna' 
        labelStyle={{
            color: '#ede7e6',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            

        }}
        icon = {(focused)=> <TabBarIcon focused={focused} style={styles.iconColor} name='md-home'/>}
        onPress={()=>props.navigation.navigate('Pocetna')}
          />
            
         <DrawerItem 
        label='Prijava'
        labelStyle={{
            color: '#ede7e6',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,

        }}
        icon = {(focused)=> <TabBarIcon focused={focused} style={styles.iconColor} name='md-log-in'/>}
        onPress={()=>props.navigation.navigate('Prijava')}
        /> 
        <DrawerItem 
        label='Odjavite se'
        labelStyle={{
            color: '#ede7e6',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,

        }}
        icon = {(focused)=> <TabBarIcon focused={focused} style={styles.iconColor} name='md-log-out'/>}
        onPress={()=>props.navigation.navigate('Logout')}
        />
         {/* {content} */} 
        

    </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    iconColor: {
        color:'#ede7e6'
    }
})

/* const mapStateToProps = state => {
    return{
      isLoggedIn: state.auth.isLoggedIn
    }
  }
 */



export default  /* connect(mapStateToProps) */CustomDrawerContent;

/*  */
