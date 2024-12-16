import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const chat = () => {
  const chats = useQuery({ queryKey: ["chats"], queryFn: async () => "" });
  return (
    <View>
      <Text>chat</Text>
    </View>
  );
};

export default chat;

const styles = StyleSheet.create({});
