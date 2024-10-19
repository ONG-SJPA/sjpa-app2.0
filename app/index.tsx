import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  return (
    <SafeAreaView>
      <Text>
        Você pode fazer a página de login aqui Igor, se clicar no botão login vc
        vai pro app
      </Text>
      <Link href="/cadastro/cadastro" asChild>
        <Button>Login</Button>
      </Link>
    </SafeAreaView>
  );
}
