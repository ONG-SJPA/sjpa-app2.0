import React from "react";
import CommonLayout from "@/components/Layout/CommonLayout";
import { router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, HelperText, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { createSector } from "@/repository/setor.repository";

interface FormData {
  name: string;
  description: string;
}

const CreateSector = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createSector({
      nome: data.name,
      observacao: data.description,
    });
    router.push("/cadastro/cadastro");
  };

  return (
    <CommonLayout>
      <View style={styles.formContainer}>
        <View style={styles.heading}>Cadastro de Setor</View>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "O campo nome é obrigatório",
            maxLength: {
              value: 3,
              message: "O nome deve ter no máximo 3 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                label="Código do Setor"
                mode="outlined"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.name}
              />
              {errors.name && (
                <HelperText type="error">{errors.name.message}</HelperText>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{
            required: "O campo descrição é obrigatório",
            maxLength: {
              value: 1000,
              message: "A descrição deve ter no máximo 1000 caracteres",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                label="Descrição do Setor"
                mode="outlined"
                multiline
                numberOfLines={4}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.description}
              />
              {errors.description && (
                <HelperText type="error">
                  {errors.description.message}
                </HelperText>
              )}
            </>
          )}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <span style={styles.textButton}>Enviar</span>
        </Button>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    marginTop: 4,
    marginBottom: 8,
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#258b31",
  },

  textButton: {
    color: "#fffff",
    fontWeight: "500",
  },
  input: {
    marginBottom: 16,
    fontSize: 14,
    borderCurve: "circular",
    borderColor: "trasparent",
    backgroundColor: "#ffffff",
  },
});

export default CreateSector;
