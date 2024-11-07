import CommonLayout from "@/components/Layout/CommonLayout";
import { router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, HelperText, TextInput } from "react-native-paper";

interface FormData {
  name: string;
  description: string;
}

const EditSector = () => {
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("criado");
    router.push("/cadastro/cadastro");
  };

  return (
    <CommonLayout>
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
              <HelperText type="error">{errors.description.message}</HelperText>
            )}
          </>
        )}
      />
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

export default EditSector;
