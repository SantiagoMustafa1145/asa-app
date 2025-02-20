import React, { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { StatusBar } from "react-native";
import useAuth from "@/store/user";

import "../global.css";

export default function Layout() {
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const loginUser = async () => {
      await loginWithToken();
    };
    loginUser();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle={"dark-content"} />
    </>
  );
}
