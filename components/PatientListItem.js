import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

import { Card } from 'react-native-paper';
const PatientListItem = props => {

    return (

    <View style={styles.patient}>
        <TouchableOpacity onPress={props.onSelect} useForeground>
          <Card>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.age}>Age: {props.age}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </Card>
        </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
    patient: {
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: 'white',
      height: 300,
      margin: 20
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '20%',
      padding: 10
    },
    title: {
      fontSize: 18,
      marginVertical: 4
    },
    age: {
      fontSize: 14,
      color: '#888'
    },
    actions: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '20%',
      paddingHorizontal: 20
    }
  });


export default PatientListItem;