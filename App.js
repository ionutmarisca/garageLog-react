/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import {StackNavigator} from "react-navigation";
import CarDetails from "./CarDetails";
import Communications from 'react-native-communications'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    Image,
    TextInput,
    Button

} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var cars;

export class MainApp extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {feedback: ''};

        cars = [
            {
                key: '1',
                brandName: 'Audi',
                modelName: 'A4',
                engineSize: '1998',
                imageResource: require('./img/audi.png')
            },
            {
                key: '2',
                brandName: 'BMW',
                modelName: '3 Series',
                engineSize: '1998',
                imageResource: require('./img/bmw.png')
            },
            {
                key: '3',
                brandName: 'Mercedes',
                modelName: 'C-Klasse',
                engineSize: '2459',
                imageResource: require('./img/mercedes.png')
            }
        ]
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <View>
                    <Header
                        leftComponent={{icon: 'menu', color: '#fff'}}
                        centerComponent={{text: 'garageLog', style: {color: '#fff'}}}
                        rightComponent={{icon: 'home', color: '#fff'}}
                    />
                </View>
                <FlatList
                    data={cars}
                    renderItem={
                        ({item}) =>
                            <ScrollView style={styles.scrollContainer}>
                                <View style={styles.linearView}>
                                    <Image style={{height: 50, width: 50, resizeMode: 'contain'}}
                                           source={item.imageResource}/>
                                    <Text style={styles.item} onPress={
                                        () => navigate('CarDetails', {car: item})
                                    }>{item.brandName} {item.modelName}</Text>
                                </View>
                            </ScrollView>
                    }
                />

                <View style={styles.container}>
                    <View style={styles.oneLineTextContainer}>
                        <TextInput
                            style={styles.textBoxSmall}
                            placeholder="Feedback..."
                            onChangeText={(text) => this.setState({feedback: text})}
                        />
                    </View>

                    <Button
                        onPress={() => Communications.email(['ionutmarisca@gmail.com'], null, null, null, this.state.feedback)}
                        title="Send Mail"
                        color='#476dc5'
                        style={styles.sendBtn}>
                    </Button>
                </View>
            </View>
        );
    }
}

const SimpleNavi = StackNavigator({
    Home: {screen: MainApp},
    CarDetails: {screen: CarDetails},
});

export default class App extends React.Component {
    render() {
        return <SimpleNavi/>;
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    linearView: {
        flexDirection: 'row',
        padding: 8,
    },
    item: {
        paddingTop: 14,
        paddingLeft: 8
    },
    sendBtn: {
        flex: 1,
        width: '50%',
        padding: 20,
    },
});
