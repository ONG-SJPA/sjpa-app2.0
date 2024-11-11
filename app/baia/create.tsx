import React from "react";
import CommonLayout from "@/components/Layout/CommonLayout";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { ref, set } from "firebase/database";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Provider, TextInput } from "react-native-paper";

interface FormData {
  number: number;
  type: number;
  description: string;
}

interface TypeOption {
  label: string;
  value: number;
}

const CreateBay: React.FC = () => {
  const { sector } = useLocalSearchParams<{ sector: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      number: 0,
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
        <View style={styles.heading}>Cadastro de Baia</View>
        <Controller
          control={control}
          name="number"
          rules={{
            required: "O campo número é obrigatório",
            min: { value: 1, message: "O número deve ser pelo menos 1" },
            max: { value: 100, message: "O número deve ser no máximo 100" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                label="Número da baia"
                mode="outlined"
                keyboardType="numeric"
                value={value ? value.toString() : ""}
                onBlur={onBlur}
                onChangeText={(text) => onChange(parseInt(text, 10))}
                error={!!errors.number}
              />
              {errors.number && (
                <HelperText type="error">{errors.number.message}</HelperText>
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
              <Picker.Item label="Canil" value={1} />
              <Picker.Item label="Gatil" value={2} />
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
                label="Descrição da baia"
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

export default CreateBay;
