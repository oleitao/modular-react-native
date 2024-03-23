import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class AddUserModal extends Component {
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

    handleChange = (value, state) => {
        this.setState({ [state]: value })
    }

    addUser = () => {
        // destructure state
        const { fullName, sex, age, birthday, hobby, email } = this.state;
        this.setState({ errorMessage: "", loading: true });

        if (fullName && sex && age && birthday && hobby && email) {
            fetch('http://localhost:9080/api/v1/users', {
                method: "POST",
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
                this.props.addUser({
                    user_fullName: res.fullName,
                    user_sex: res.sex,
                    user_age: res.age,
                    user_birthday: res.birthday,
                    user_hobby: res.hobby,
                    user_email: res.email,
                    id: res.id
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
        const { isOpen, closeModal } = this.props;
        const { loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Add New User</Text>

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "fullName")}
                        placeholder="Full Name" />

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "sex")}
                        placeholder="Sex" />

                    <TextInput
                        keyboardType="numeric"
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "age")}
                        placeholder="Age" />

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "birthday")}
                        placeholder="Birthday" />

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "hobby")}
                        placeholder="Hobby" />

                    <TextInput
                        style={styles.textBox}
                        onChangeText={(text) => this.handleChange(text, "email")}
                        placeholder="Email" />


                    {loading ? <Text
                        style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                            style={styles.message}>{errorMessage}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.addUser}
                            style={{ ...styles.button, marginVertical: 0 }}>
                            <Text style={styles.buttonText}>Submit</Text>
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



export default AddUserModal;

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