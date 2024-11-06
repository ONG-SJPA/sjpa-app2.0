import CommonLayout from "@/components/Layout/CommonLayout";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { ref, set } from "firebase/database";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
          <Picker
            selectedValue={value}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            <Picker.Item label="Macho" value={1} />
            <Picker.Item label="Fêmea" value={2} />
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
