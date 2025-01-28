import React, { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { StatusBar } from "react-native";
import useAuth from "@/store/user";

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
      </Stack>
      <StatusBar barStyle={"dark-content"} />
    </>
  );
}
