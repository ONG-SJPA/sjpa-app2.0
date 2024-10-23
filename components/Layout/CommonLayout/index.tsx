import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";

interface OwnProps {
  children: React.ReactNode;
}

function CommonLayout({ children }: OwnProps) {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#63C0C5",
      }}
    >
      <LinearGradient
        colors={["#63C0C5", "#60C3B1", "#62C189", "#5FBF78", "#5ABC65"]}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

export default CommonLayout;
