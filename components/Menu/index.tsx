import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import Popover from "react-native-popover-view";

interface OwnProps {
  option1: React.ReactNode;
  option2?: React.ReactNode;
}

const CommonMenu = ({ option1, option2 }: OwnProps) => {
  const [showPopover, setShowPopover] = useState(false);
  const touchableRef = useRef<TouchableOpacity | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity ref={touchableRef} onPress={() => setShowPopover(true)}>
        <IconButton icon="menu" iconColor="#000" size={28} />
      </TouchableOpacity>

      <Popover
        isVisible={showPopover}
        from={touchableRef}
        onRequestClose={() => setShowPopover(false)}
        popoverStyle={styles.popover}
      >
        <View style={styles.popoverContent}>
          <TouchableOpacity
            onPress={() => setShowPopover(false)}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{option1}</Text>
          </TouchableOpacity>

          {option2 && <View style={styles.divider} />}

          {option2 && (
            <TouchableOpacity
              onPress={() => setShowPopover(false)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{option2}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
  },
  popover: {
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 220,
  },
  popoverContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default CommonMenu;
