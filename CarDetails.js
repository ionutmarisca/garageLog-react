import React from 'react'
import {Button, StyleSheet, TextInput, View, ScrollView, Image} from "react-native";
import {firebaseApp} from './App'

export class CarDetails extends React.Component {
    updateCar(key) {
        const items = firebaseApp.database().ref().child('cars');

        if (this.state.brandNameChange)
            items.child(key).child("car").child("brandName").set(this.state.brandName);
        if (this.state.modelNameChange)
            items.child(key).child("car").child("modelName").set(this.state.modelName);
        if (this.state.engineSizeChange)
            items.child(key).child("car").child("engineSize").set(this.state.engineSize);
    }

    render() {
        const {goBack} = this.props.navigation;
        const {params} = this.props.navigation.state;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.carTitle} onChangeText={(text) => {
                            this.setState({brandName: text});
                            this.setState({brandNameChange: true});
                        }}>{params.car.brandName} </TextInput>
                        <TextInput style={{width: 150, textAlign: 'center'}} onChangeText={(text) => {
                            this.setState({modelName: text});
                            this.setState({modelNameChange: true});
                        }}> {params.car.modelName} </TextInput>
                        <Image style={styles.logoImage} source={params.car.imageResource}/>
                        <TextInput
                            style={{textAlign: 'center', paddingBottom: 15}} onChangeText={(text) => {
                            this.setState({engineSize: text});
                            this.setState({engineSizeChange: true});
                        }}> {params.car.engineSize} </TextInput>
                    </View>
                    <Button onPress={() => {
                        this.updateCar(params.key);
                        goBack();
                    }
                    } title="Save changes" style={styles.saveButton}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9e9ef',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    editInputTextView: {
        height: '100%',
    },
    saveButton: {
        width: '60%',
        height: '15%',
        backgroundColor: 'blue',
        paddingTop: 20
    },
    carTitle: {
        color: '#5b88e9',
        fontSize: 25,
        textAlign: 'center'
    },
    logoImage: {
        height: 220,
        width: 200,
        resizeMode: 'contain',
        marginBottom: 28,
        marginTop: 28
    }
});