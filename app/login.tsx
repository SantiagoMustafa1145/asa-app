import useAuth from "@/store/user";
import { Alert, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function LoginView() {
  const { user, login } = useAuth();
  useEffect(() => {}, [user]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dni: "",
      password: "",
    },
  });

  const handlePress = async ({
    dni,
    password,
  }: {
    dni: string;
    password: string;
  }) => {
    const result: boolean = await login({ dni, password });
    if (result) {
      return Alert.alert(
        "Has iniciado Sesión",
        "Su sesión se ha iniciado correctamente"
      );
    }
    return Alert.alert("Acceso Denegado", "DNI o Contraseña incorrecta");
  };

  if (user) {
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <View>
      <View>
        <Controller
          control={control}
          name="dni"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="DNI"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="PASSWORD"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>
      <Button onPress={handleSubmit(handlePress)}>Ingresar</Button>
    </View>
  );
}
