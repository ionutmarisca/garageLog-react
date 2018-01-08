import React from 'react'
import {Button, StyleSheet, TextInput, View, ScrollView, Image} from "react-native";
import {firebaseApp} from './App'

export class AddCar extends React.Component {
    save() {
        const items = firebaseApp.database().ref().child('cars');
        items.push({
            car: {
                brandName: this.state.brandName,
                modelName: this.state.modelName,
                engineSize: this.state.engineSize,
                imageResource: require('./img/audi.png')
            }
        });
    }

    render() {
        const {goBack} = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.carTitle} placeholder="Brand name..."
                                   onChangeText={(text) => this.setState({brandName: text})}/>
                        <TextInput placeholder="Model name..."
                                   onChangeText={(text) => this.setState({modelName: text})}/>
                        <TextInput placeholder="Image URL..." onChangeText={(text) => this.setState({imageUrl: text})}/>
                        <TextInput style={{textAlign: 'center', paddingBottom: 15}} placeholder="Engine size..."
                                   onChangeText={(text) => this.setState({engineSize: text})}/>
                    </View>
                    <Button onPress={() => {
                        this.save();
                        goBack();
                    }
                    } title="Add car" style={styles.saveButton}/>
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