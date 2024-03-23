import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Moment from 'moment';

class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            sex: '',
            age: 0,
            birthday: new Date(),
            hobby:'',
            email: '',
            loading: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        const { user_fullName, user_sex, user_age, user_birthday, user_hobby, user_email } = this.props.selectedUser;
        
        this.setState({
            fullName: user_fullName,
            sex: user_sex,
            age: user_age,
            birthday: user_birthday,
            hobby: user_hobby,
            email: user_email
        })
    }

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }

    updateUser = () => {
        // destructure state
        const { fullName, sex, age, birthday, hobby, email } = this.state;
        this.setState({ errorMessage: "", loading: true });

        if (fullName && sex && age && birthday && hobby && email) {

            fetch(`http://localhost:9080/api/v1/users/${this.props.selectedUser.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: this.state.fullName,
                    sex: this.state.sex,
                    age: this.state.age,
                    birthday: this.state.birthday,
                    hobby: this.state.hobby,
                    email: this.state.email
                })
            })
            .then(res => res.json())
            .then(res => {
                this.props.closeModal();
                this.props.updateUser({
                    user_fullName: res.fullName,
                    user_sex: res.sex,
                    user_age: res.age,
                    user_birthday: res.birthday,
                    user_hobby: res.hobby,
                    user_email: email,
                    id: this.props.selectedUser.id
                });
            })
            .catch(() => {
                this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
            })           
        } else {
            this.setState({ errorMessage: "Fields are empty.", loading: false })
        }
    }

    render() {
        
        Moment.locale('pt');

        const { isOpen, closeModal } = this.props;
        const { fullName, sex, age, birthday, hobby, email, loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Update User</Text>

                    <TextInput
                        value={fullName}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "fullName")}
                        placeholder="Full Name" />                    
                    <TextInput
                        value={sex}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "sex")}
                        placeholder="Sex" />                    
                    <TextInput
                        defaultValue={age}
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "age")}
                        placeholder="Age" />

                     <TextInput
                        defaultValue={Moment(birthday).format('YYYY-MM-DD')}
                        keyboardType="date"
                        style={styles.textBox}                        
                        onChangeText={(text) => this.handleChange(text, "birthday")}
                        placeholder="Birthday" /> 

                    <TextInput
                        defaultValue={hobby}
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "hobby")}
                        placeholder="Hobby" />
                    <TextInput
                        defaultValue={email}
                        style={styles.textBox}
                        keyboardType="email-address"
                        onChangeText={(text) => this.handleChange(text, "email")}
                        placeholder="Email" />


                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.updateUser}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={closeModal}
                            style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        );
    }
}



export default EditUserModal;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})