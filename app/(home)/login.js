import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { FontAwesome } from "@expo/vector-icons"; 
import { useRouter } from "expo-router"; 

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPressing, setIsPressing] = useState(false);

  const handleLogin = () => {
    const hardcodedUsername = "admin";
    const hardcodedPassword = "admin";


    const lowercaseEmail = email.toLowerCase();

    if (lowercaseEmail === hardcodedUsername && password === hardcodedPassword) {
      Alert.alert("Login Successful", "You have logged in successfully!");
      router.push("/(home)"); 
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  const handlePressIn = () => {
    setIsPressing(true);
  };

  const handlePressOut = () => {
    setIsPressing(false);
  };

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Feature not implemented yet.");
    // Implement forgot password functionality here
  };

  const handleCreateAccount = () => {
    Alert.alert("Create Account", "Feature not implemented yet.");
    // Implement create account functionality here
  };

  const handleLoginWithGoogle = () => {
    Alert.alert("Login with Google", "Feature not implemented yet.");
    // Implement login with Google functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AntDesign name="user" size={80} color="#007bff" />
      </View>
      <Text style={styles.title}>Employee Management System</Text>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="#007bff" style={styles.inputIcon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="#007bff" style={styles.inputIcon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
      </View>
      <Pressable
        onPress={handleLogin}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, isPressing && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={handleForgotPassword} style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Pressable>
      <Pressable onPress={handleCreateAccount} style={styles.createAccount}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </Pressable>
      <Pressable onPress={handleLoginWithGoogle} style={styles.googleButton}>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#007bff",
    fontSize: 14,
  },
  createAccount: {
    marginTop: 20,
    alignItems: "center",
  },
  createAccountText: {
    color: "#007bff",
    fontSize: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DB4437",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Login;
