import * as React from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
  } from 'react-native';
class ExpandableItemComponent extends React.Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        layoutHeight: 0,
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.item.isExpanded) {
        this.setState(() => {
          return {
            layoutHeight: null,
          };
        });
      } else {
        this.setState(() => {
          return {
            layoutHeight: 0,
          };
        });
      }
    }
    /* shouldComponentUpdate(nextProps, nextState) {
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        return true;
      }
      return false;
    } */
  
    render() {
        const context = this;
      return (
        <View>
          {/*Header of the Expandable List Item*/}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onClickFunction}
            style={styles.header}>
            <Text style={styles.headerText}>{this.props.item.category_name}</Text>
          </TouchableOpacity>
          <View
            style={{
              height: this.state.layoutHeight,
              overflow: 'hidden',
            }}>
            {/*Content under the header of the Expandable List Item*/}
            {this.props.item.subcategory.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.content}
                onPress={() => context.props.navObj.navigate('Permission2')}>
                <Text style={styles.text}>
                   {item.val}
                </Text>
                <View style={styles.separator} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  }
export default class ExpandableViewSeparate extends React.Component {
    //Main View defined under this Class
    constructor() {
      super();
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      this.state = { listDataSource: CONTENT };
    }
  
    updateLayout = index => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...this.state.listDataSource];
      array[index]['isExpanded'] = !array[index]['isExpanded'];
      this.setState(() => {
        return {
          listDataSource: array,
        };
      });
    };
  
    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
            {this.state.listDataSource.map((item, key) => (
              <ExpandableItemComponent
                key={item.category_name}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
                navObj={this.props.navObj}
              />
            ))}
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
    
     flex:1
      
    },
    topHeading: {
      paddingLeft: 10,
      fontSize: 20,
    },
    header: {
      backgroundColor: '#F5FCFF',
      padding: 16,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '500',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
    },
    text: {
      fontSize: 16,
      color: '#606070',
      padding: 10,
    },
    content: {
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff',
    },
  });
  
  //Dummy content to show
  //You can also use dynamic data by calling webservice
  const CONTENT = [
    {
      isExpanded: false,
      category_name: 'Kategorije',
      subcategory: [
          { id: 1, val: 'Javni parking' },
           { id: 3, val: 'Gradski prevoz' },
          {id: 2, val: 'Pogrebne usluge'},
          {id: 4, val: 'Dimnicarske usluge'}],
    }
  ];