import React from 'react'
import {Button, StyleSheet, TextInput, View, ScrollView, Image} from "react-native";

export default class CarDetails extends React.Component {
    render() {
        const {goBack} = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.carTitle}>{params.car.brandName} </TextInput>
                        <TextInput style={{width: 150, textAlign: 'center'}}> {params.car.modelName} </TextInput>
                        <Image style={styles.logoImage} source={params.car.imageResource}/>
                        <TextInput
                            style={{textAlign: 'center', paddingBottom: 15}}> {params.car.engineSize} </TextInput>
                    </View>
                    <Button onPress={() => {
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