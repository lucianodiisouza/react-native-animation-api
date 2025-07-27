import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function App() {
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale, {
      toValue: 2,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.square, { opacity: progress, transform: [{ scale }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(0,0,255, 0.5)",
  },
});
