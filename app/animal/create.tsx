import React from "react";
import CommonLayout from "@/components/Layout/CommonLayout";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Provider, TextInput } from "react-native-paper";

interface FormData {
  name: string;
  year: number;
  type: number;
  race: string;
  description: string;
}

interface TypeOption {
  label: string;
  value: number;
}

const CreateAnimal: React.FC = () => {
  const { sector } = useLocalSearchParams<{ sector: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      race: "",
      year: 0,
      type: 1,
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("criado");
    router.push(`/sector/${sector}`);
  };

  return (
    <CommonLayout>
      <View style={styles.formContainer}>
        <View style={styles.heading}>Cadastro de Animais</View>
        <Controller
          control={control}
          name="name"
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
                value={value ? value.toString() : ""}
                onBlur={onBlur}
                onChangeText={(text) => onChange(parseInt(text, 10))}
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
          name="year"
          rules={{
            required: "O campo idade é obrigatório",
            min: { value: 1, message: "A idade deve ser pelo menos 1" },
            max: { value: 100, message: "A iddade deve ser no máximo 100" },
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
                error={!!errors.year}
              />
              {errors.year && (
                <HelperText type="error">{errors.year.message}</HelperText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="race"
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
                value={value ? value.toString() : ""}
                onBlur={onBlur}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                error={!!errors.race}
              />
              {errors.race && (
                <HelperText type="error">{errors.race.message}</HelperText>
              )}
            </>
          )}
        />

        {/* Campo Type */}
        <Controller
          control={control}
          name="type"
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
                label="Descrição do animal"
                style={[styles.input, { marginTop: 16 }]}
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

        {/* Botão Submit */}
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

export default CreateAnimal;
