import React from "react";
import CommonLayout from "@/components/Layout/CommonLayout";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Provider, Text, TextInput } from "react-native-paper";
import { createAnimal } from "@/repository/animal.repository";
import { getBaiaById } from "@/repository/baia.repository";

interface FormData {
  nome: string;
  idade: number;
  tipo: number;
  raca: string;
  observacao: string;
}

const CreateAnimal: React.FC = () => {
  const { idBaia } = useLocalSearchParams<{
    idBaia: string;
  }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      raca: "",
      idade: 1,
      tipo: 1,
      observacao: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const baiaData = await getBaiaById(idBaia);

    if (!baiaData) {
      return;
    }

    await createAnimal({
      ...data,
      idBaia,
      idSetor: baiaData.idSetor,
    });
    router.back();
    // router.push(`/baia/${idBaia}`);
  };

  return (
    <CommonLayout>
      <View style={styles.formContainer}>
        <View style={styles.heading}>Cadastro de Animais</View>
        <Controller
          control={control}
          name="nome"
          rules={{
            required: "O campo nome é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                label="Nome"
                mode="outlined"
                keyboardType="default"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.nome}
              />
              {errors.nome && (
                <HelperText type="error">{errors.nome.message}</HelperText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="idade"
          rules={{
            required: "O campo idade é obrigatório",
            min: { value: 1, message: "A idade deve ser pelo menos 1" },
            max: { value: 100, message: "A idade deve ser no máximo 100" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                label="Idade"
                mode="outlined"
                keyboardType="numeric"
                value={value ? value.toString() : ""}
                onBlur={onBlur}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                error={!!errors.idade}
              />
              {errors.idade && (
                <HelperText type="error">{errors.idade.message}</HelperText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="raca"
          rules={{
            required: "O campo raça é obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                label="Raça"
                mode="outlined"
                keyboardType="default"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.raca}
              />
              {errors.raca && (
                <HelperText type="error">{errors.raca.message}</HelperText>
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
              style={[
                styles.input,
                { height: 50, width: 150, marginBottom: 0 },
              ]}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="Cachorro" value={1} />
              <Picker.Item label="Gato" value={2} />
            </Picker>
          )}
        />

        {/* Campo Description */}
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
                label="Descrição do animal"
                style={[styles.input, { marginTop: 16 }]}
                mode="outlined"
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

        {/* Botão Submit */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.textButton}>Enviar</Text>
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

export default CreateAnimal;
