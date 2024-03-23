import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class DeleteUserModal extends Component {
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

    deleteUser = () => {
        // destructure state
        this.setState({ errorMessage: "", loading: true });

        fetch(`http://localhost:9080/api/v1/users/${this.props.selectedUser.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            this.props.closeModal();
            this.props.updateUser(this.props.selectedUser.id);
        })
        .catch((err) => {
            this.setState({ errorMessage: "Network Error. Please try again.", loading: false })
        })
    }

    render() {
        const { isOpen, closeModal, selectedUser } = this.props;
        const { loading, errorMessage } = this.state;
        return (
            <Modal
                visible={isOpen}
                onRequestClose={closeModal}
                animationType="slide"
                transparent
            >
                <View style={styles.BackgroundContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>would you like to delete user name ({selectedUser.fullName})?</Text>
                        <Text style={styles.subTitle}>If you are sure to delete this  user then click Agree
                        button or if you are not willing to delete just click Disagree.</Text>

                        {loading ? <Text
                            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                                style={styles.message}>{errorMessage}</Text> : null}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={this.deleteUser}>
                                <Text style={styles.buttonText}>Agree</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={closeModal}>
                                <Text style={{ ...styles.buttonText, color: "skyblue" }}>Disagree</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}



export default DeleteUserModal;

const styles = StyleSheet.create({
    BackgroundContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    container: {
        width: "90%",
        padding: 15,
        maxHeight: "40%",
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 16
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
        alignSelf: "flex-end"
    },
    buttonText: {
        color: "tomato",
        fontSize: 17
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})