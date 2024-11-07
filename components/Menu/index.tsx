import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import Popover from "react-native-popover-view";

interface OwnProps {
  option1: React.ReactNode;
  option2?: React.ReactNode;
}

const CommonMenu = ({ option1, option2 }: OwnProps) => {
  const [showPopover, setShowPopover] = React.useState(false);
  const touchableRef = React.useRef<TouchableOpacity | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity ref={touchableRef} onPress={() => setShowPopover(true)}>
        <IconButton icon="menu" iconColor="#000000" size={24} />
      </TouchableOpacity>

      <Popover
        isVisible={showPopover}
        from={touchableRef}
        onRequestClose={() => setShowPopover(false)}
      >
        <View style={styles.popoverContent}>
          {option1}
          {option2 && option2}
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  popoverContent: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 150,
  },
  menuItem: {
    padding: 8,
    fontSize: 14,
  },
});

export default CommonMenu;
