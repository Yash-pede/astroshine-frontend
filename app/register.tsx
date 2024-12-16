import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [sessionName, setSessionName] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://10.10.123.39:5050/chat/${sessionName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: "Astrologers",
            ts: Math.floor(Date.now() / 1000),
            message: "Welcome to astroshine",
            replyTo: username,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        router.push("/chat");
      }

      return await response.json();
    },
  });

  const handleNext = () => {
    mutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Session Name"
        value={sessionName}
        onChangeText={setSessionName}
      />

      <TouchableOpacity
        style={[styles.button, mutation.isPending && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Next</Text>
        )}
      </TouchableOpacity>

      {mutation.isError && (
        <Text style={styles.error}>
          An error occurred: {mutation.error.message}
        </Text>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#007bff80",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
