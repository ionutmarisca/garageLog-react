/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import {StackNavigator} from "react-navigation";
import {CarDetails} from "./CarDetails";
import Communications from 'react-native-communications'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    Image,
    TextInput,
    Button,
    Alert

} from 'react-native';
import {AddCar} from "./AddCar";
import Login from "./Login";

const firebase = require('firebase');

var cars;

const firebaseConfig = {
    apiKey: "AIzaSyAqqeQpDVN5SwURvfl6aPNQ3nq6vGY1nTg",
    authDomain: "garagelog-react.firebaseapp.com",
    databaseURL: "https://garagelog-react.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "982428683893",
    persistence: true
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export class MainApp extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {feedback: '', carlist: [], loading: true, user: null};

        cars = [
            {car: {
                key: '1',
                brandName: 'Audi',
                modelName: 'A4',
                engineSize: '1998',
                imageResource: require('./img/audi.png')
            }},
            {car: {
                key: '2',
                brandName: 'BMW',
                modelName: '3 Series',
                engineSize: '1998',
                imageResource: require('./img/bmw.png')
            }},
            {car: {
                key: '3',
                brandName: 'Mercedes',
                modelName: 'C-Klasse',
                engineSize: '2459',
                imageResource: require('./img/mercedes.png')
            }}
        ];
        console.log("Here are the cars: " + cars);

        this.items = this.getReference().child('cars');
        // this.items.push(cars[0]);
        // this.items.push(cars[1]);
        // this.items.push(cars[2]);
    }

    getItems(items){
        items.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    car: child.val().car,
                    key: child.key
                });
            });
            console.log(items);
            this.setState({
                carlist: items
            });
            this.setState({loading: false});
        });
    }

    /**
     * Listen for any auth state changes and update component state
     */
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((myUser) => {
            if (myUser) {
                this.setState({user: myUser});
            }
        });
    }

    componentWillMount(){
        this.getItems(this.items);
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    getReference() {
        return firebaseApp.database().ref();
    }

    deleteCar(key){
        this.items.child(key).remove();
    }

    showAlert(title,key){
        Alert.alert('Confirmation','Are you sure you want to delete this car?',
            [
                {text: 'Yes',
                    onPress: () =>{
                        this.deleteCar(key);
                    }},
                {text: 'No'}
            ],
            {cancelable: false}
        )
    }

    render() {
        const {navigate} = this.props.navigation;
        if (!this.state.user) {
            return <Login/>;
        }
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
                    data={this.state.carlist}
                    renderItem={
                        ({item}) =>
                            <ScrollView style={styles.scrollContainer}>
                                <View style={styles.linearView}>
                                    <Image style={{height: 50, width: 50, resizeMode: 'contain'}}
                                                                               source={item.car.imageResource}/>
                                    <Text style={styles.item} onPress={
                                        () => navigate('CarDetails', {car: item.car, key: item.key})
                                    }>{item.car.brandName} {item.car.modelName}</Text>
                                    <View style={styles.deleteView}>
                                        <Button style={styles.deleteButton}
                                                onPress={ () => { this.showAlert(item.car.brandName + item.car.modelName, item.key);}}
                                                title = "Delete">
                                        </Button>
                                    </View>
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

                    <Button onPress={() => {
                        navigate('AddCar');
                    }
                    } title="Add car" style={styles.saveButton}/>
                </View>
            </View>
        );
    }
}

const SimpleNavi = StackNavigator({
    Home: {screen: MainApp},
    CarDetails: {screen: CarDetails},
    AddCar: {screen: AddCar},
    Login: {screen: Login}
});

export default class App extends Component {
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
    saveButton: {
        width: '60%',
        height: '15%',
        backgroundColor: 'blue',
        paddingTop: 20
    },
    deleteView:{
        flex: 1, flexDirection: 'row', justifyContent: 'flex-end'
    }
});
