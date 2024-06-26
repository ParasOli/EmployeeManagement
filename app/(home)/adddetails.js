import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

const AddDetails = () => {
  const router = useRouter(); 
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false); 

  const handleRegister = async () => {
    const employeeData = {
      employeeName: name,
      employeeId: employeeId,
      designation: designation,
      phoneNumber: mobileNo,
      dateOfBirth: dob,
      joiningDate: joiningDate,
      activeEmployee: true,
      salary: salary,
      address: address,
    };

    try {
      const response = await axios.post("http://localhost:8000/addEmployee", employeeData);
      console.log("Registration successful", response.data);
      Alert.alert("Registration Successful", response.data.message);
      
      clearFields();
      
      router.push("/(home)/index");
    } catch (error) {
      console.error("Registration failed", error);
      Alert.alert("Registration Failed", "An error occurred during registration");
    }
  };

  const clearFields = () => {
    setName("");
    setEmployeeId("");
    setDob("");
    setMobileNo("");
    setSalary("");
    setAddress("");
    setJoiningDate("");
    setDesignation("");
  };

  const handlePressIn = () => {
    setButtonPressed(true); // Set button press state to true
  };

  const handlePressOut = () => {
    setButtonPressed(false); 
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Ionicons
        onPress={() => router.back()}
        style={{ marginLeft: 10 }}
        name="arrow-back"
        size={24}
        color="black"
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}>
          Add a New Employee
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name (First and Last Name)</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="Enter Full Name"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Employee ID</Text>
          <TextInput
            value={employeeId}
            onChangeText={(text) => setEmployeeId(text)}
            style={styles.input}
            placeholder="Enter Employee ID"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            value={designation}
            onChangeText={(text) => setDesignation(text)}
            style={styles.input}
            placeholder="Enter Designation"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={styles.input}
            placeholder="Enter Mobile Number"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            value={dob}
            onChangeText={(text) => setDob(text)}
            style={styles.input}
            placeholder="Enter Date of Birth"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Joining Date</Text>
          <TextInput
            value={joiningDate}
            onChangeText={(text) => setJoiningDate(text)}
            style={styles.input}
            placeholder="Enter Joining Date"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Salary</Text>
          <TextInput
            value={salary}
            onChangeText={(text) => setSalary(text)}
            style={styles.input}
            placeholder="Enter Salary"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
            placeholder="Enter Address"
            placeholderTextColor="black"
          />
        </View>

        <Pressable
          onPress={handleRegister}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.addButton,
            { opacity: buttonPressed ? 0.6 : 1 } 
          ]}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add Employee
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default AddDetails;
