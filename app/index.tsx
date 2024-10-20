import React, { useState } from "react";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";
import { Text, Headline, TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as navigate from "expo-router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  /// TODO: Validaçãoes para a versão final
  // email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  // password: yup
  //   .string()
  //   .min(6, "Obrigatório no mínimo 6 caracteres")
  //   .required("A senha é obrigatória"),

  // VALIDAÇÕES PARA TESTES E DENSENVOLVIMENTO
  email: yup.string().required("Coloca alguma coisa porra"),
  password: yup.string().required("Precisa caraio"),
});

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isVisiblePassword, setisVisiblePassword] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    // Quando tiver validado e colcoar a logica do login aqui
    // replace coloca a proxima tela no tipo da pilha de rotas
    // como o login é a primeira tela ele a proxima tela será a unica tela
    // para impedir que o user volta para o login
    navigate.router.replace("/cadastro/cadastro");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={["#63C0C5", "#60C3B1", "#62C189", "#5FBF78", "#5ABC65"]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo-ong.png")}
              resizeMode="contain"
            />
            <Headline style={styles.heading}>Bem Vindo!</Headline>
            <Text>Faça login para usar o app</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Email"
                    mode="flat"
                    placeholder="Digite seu email"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.email}
                    style={styles.input}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    label="Senha"
                    mode="flat"
                    placeholder="Digite sua senha"
                    secureTextEntry={!isVisiblePassword}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.password}
                    style={styles.input}
                    right={
                      <TextInput.Icon
                        size={20}
                        icon={isVisiblePassword ? "eye-off" : "eye"}
                        onPress={() => setisVisiblePassword((value) => !value)}
                      />
                    }
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </>
              )}
            />
            {/*  */}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
            >
              Login
            </Button>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: "25%",
    justifyContent: "flex-end",
  },
  header: {
    height: "75%",
    width: "75%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: 30,
    marginLeft: 20,
  },
  logo: {
    width: 56,
    height: 48,
  },
  heading: {
    fontSize: 28,
    marginTop: 4,
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 16,
  },
  form: {
    marginTop: 40,
  },

  button: {
    marginTop: 16,
    backgroundColor: "#60C3B1",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    fontSize: 14,
    borderBlockEndColor: "#ccc",
    borderBottomColor: "#ccc",
    backgroundColor: "transparent",
  },
});

export default Login;
