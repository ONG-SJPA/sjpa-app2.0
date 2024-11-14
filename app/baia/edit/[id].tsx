import CommonLayout from "@/components/Layout/CommonLayout";
import { router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, HelperText, TextInput, Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useEditBaiaPage } from "./useEditBaiaPage";
import { updateBaia } from "@/repository/baia.repository";
import { FormData } from "./types";

const EditBaia = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      id: "",
      numeroBaia: null,
      tipo: 0,
      observacao: "",
    },
  });

  useEditBaiaPage({ setValue });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.numeroBaia) {
      throw new Error("Número da baia é obrigatório");
    }

    await updateBaia({
      id: data.id,
      numeroBaia: data.numeroBaia,
      tipo: data.tipo,
      observacao: data.observacao,
    });
    router.push("/cadastro/cadastro");
  };

  return (
    <CommonLayout>
      <View style={styles.formContainer}>
        <View style={styles.heading}>
          <Title>Editar de Baia</Title>
        </View>
        <Controller
          control={control}
          name="numeroBaia"
          rules={{
            required: "O campo número da baia é obrigatório",
            max: {
              value: 999,
              message: "O número da baia deve ser no máximo 999",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Código da baia"
                mode="outlined"
                style={styles.input}
                value={value ? value.toString() : ""}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text ? parseInt(text) : null)}
                keyboardType="numeric"
                error={!!errors.numeroBaia}
              />
              {errors.numeroBaia && (
                <HelperText type="error">
                  {errors.numeroBaia.message}
                </HelperText>
              )}
            </>
          )}
        />

        {/* Campo Type */}
        <Controller
          control={control}
          name="tipo"
          rules={{ required: "O campo tipo é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              style={[styles.input, { height: 50, width: 150 }]}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="Canil" value={1} />
              <Picker.Item label="Gatil" value={2} />
            </Picker>
          )}
        />
        <Controller
          control={control}
          name="observacao"
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
                label="Descrição da baia"
                mode="outlined"
                style={styles.input}
                multiline
                numberOfLines={4}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.observacao}
              />
              {errors.observacao && (
                <HelperText type="error">
                  {errors.observacao.message}
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
    color: "#ffffff",
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

export default EditBaia;
