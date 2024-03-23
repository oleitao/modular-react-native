import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import Moment from 'moment';

class UserScreen extends Component {
  state = {
    user: [],
    isAddUserModalOpen: false,
    isEditUserModalOpen: false,
    isDeleteUserModalOpen: false,
    loading: false,
    errorMessage: "",
    selectedUser: {}
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ errorMessage: "", loading: true })
    
    fetch('http://localhost:9080/api/v1/users', {
      method: "GET",
	  headers: {
		  'User-Agent': 'PostmanRuntime/7.37.0',
		  'Accept': '*/*',
		  'Accept-Encoding': 'gzip, deflate, br',
		  'Connection': 'keep-alive'
	  }})
    .then(res => res.json())
    .then(res => this.setState({
      user: res,
      loading: false, errorMessage: ""
    }))
    .catch(() => this.setState({
      loading: false,
      errorMessage: "Network Error. Please try again."
    }))
  }

  toggleAddUserModal = () => {
    this.setState({ isAddUserModalOpen: !this.state.isAddUserModalOpen });
  }

  ttoggleEditUserModal = () => {
    this.setState({ isEditUserModalOpen: !this.state.isEditUserModalOpen });
  }

  toggleDeleteUserModal = () => {
    this.setState({ isDeleteUserModalOpen: !this.state.isDeleteUserModalOpen });
  }

  addUser = (data) => {
    // this.state.user array is seprated into object by rest operator
    this.setState({ user: [data, ...this.state.user] })
  }

  updateUser = (data) => {
    // updating user data with updated data if user id is matched with updated data id
    this.setState({ user: this.state.user.map(emp => emp.id == data.id ? data : emp) });
  }

  deleteUser = userId => {
    // delete user lsit with deleted data if user id is matched with updated data id
    this.setState({ user: this.state.user.filter(emp => emp.id !== userId) })
  }

  render() {

    Moment.locale('pt');

    const { loading, errorMessage, user, isAddUserModalOpen,
      isEditUserModalOpen, isDeleteUserModalOpen, selectedUser } = this.state;

    return (
      <ScrollView>

        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.toggleAddUserModal}
            style={styles.button}>
            <Text style={styles.buttonText}>Add user</Text>
          </TouchableOpacity>

          <Text style={styles.title}>User Lists:</Text>
          {user.map((data, index) => <View
            style={styles.userListContainer}
            key={data.id}>
            <Text style={{ ...styles.listItem, color: "tomato" }}>{index + 1}.</Text>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.listItem}>user sex: {data.sex == 'M' ? 'Male' : 'Female'}</Text>
            <Text style={styles.listItem}>user age: {data.age}</Text>
            <Text style={styles.listItem}>user birthday: {Moment(data.birthday).format('YYYY-MM-DD')}</Text>
            <Text style={styles.listItem}>user hobby: {data.hobby}</Text>
            <Text style={styles.listItem}>user email: {data.email}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.ttoggleEditUserModal();
                  this.setState({ selectedUser: data })
                }}
                style={{ ...styles.button, marginVertical: 0 }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.toggleDeleteUserModal();
                  this.setState({ selectedUser: data })
                }}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>)}

          {loading ? <Text
            style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
              style={styles.message}>{errorMessage}</Text> : null}

          {/* AddUserModal modal is open when add user button is clicked */}
          {isAddUserModalOpen ? <AddUserModal
            isOpen={isAddUserModalOpen}
            closeModal={this.toggleAddUserModal}
            addUser={this.addUser}
          /> : null}

          {/* EditUserModal modal is open when edit button is clicked in particular user list*/}
          {isEditUserModalOpen ? <EditUserModal
            isOpen={isEditUserModalOpen}
            closeModal={this.ttoggleEditUserModal}
            selectedUser={selectedUser}
            updateUser={this.updateUser}
          /> : null}

          {/* DeleteUserModal modal is open when delete button is clicked in particular user list*/}
          {isDeleteUserModalOpen ? <DeleteUserModal
            isOpen={isDeleteUserModalOpen}
            closeModal={this.toggleDeleteUserModal}
            selectedUser={selectedUser}
            updateUser={this.deleteUser}
          /> : null}
        </View>

      </ScrollView>
    );
  }
}

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  userListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16
  },
  listItem: {
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    color: "tomato",
    fontSize: 17
  }
})