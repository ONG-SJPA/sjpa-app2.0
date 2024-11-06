import CommonLayout from "@/components/Layout/CommonLayout";
import { Text } from "@/components/Themed";
import database from "@/firebase/realtimeDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, HelperText, Provider, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

// Define os tipos para os dados do formulário
interface FormData {
  number: number;
  type: string;
  description: string;
}

// Define o tipo para as opções de "type" vindas do banco de dados
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
      type: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const bayRef = ref(database, `sectors/${sector}/bays/${data.number}`);

    set(bayRef, {
      type: Number(data.type),
      description: data.description,
    });

    router.push(`/sector/${sector}`);
  };

  return (
    <CommonLayout>
      {/* Campo Number */}
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
              label="Number"
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
          <Provider>
            <Dropdown
              label="Type"
              mode="outlined"
              value={value}
              onSelect={onChange}
              options={[
                { label: "Macho", value: "1" },
                { label: "Fêmea", value: "2" },
              ]}
              error={!!errors.type}
            />
            {errors.type && (
              <HelperText type="error">{errors.type.message}</HelperText>
            )}
          </Provider>
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
              label="Description"
              mode="outlined"
              multiline
              numberOfLines={4}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.description}
            />
            {errors.description && (
              <HelperText type="error">{errors.description.message}</HelperText>
            )}
          </>
        )}
      />

      {/* Botão Submit */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 16 }}
      >
        Submit
      </Button>
    </CommonLayout>
  );
};

export default CreateBay;
