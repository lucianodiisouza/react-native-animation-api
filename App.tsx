import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SIZE = 100;

export default function App() {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // we can use timing, spring, etc
    // ref: https://reactnative.dev/docs/animations

    // Animated.timing(progress, {
    //   toValue: 1,
    //   useNativeDriver: true,
    // }).start();
    // Animated.timing(scale, {
    //   toValue: 2,
    //   useNativeDriver: true,
    // }).start();

    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(progress, {
            toValue: 0.5,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 2,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]),
      ])
    )
    .start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            opacity: progress,
            transform: [
              { scale },
              {
                rotate: progress.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [`${Math.PI}rad`, `${2 * Math.PI}rad`],
                }),
              },
            ],
            borderRadius: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE / 4, SIZE / 2],
            }),
          },
        ]}
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
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,255, 0.5)",
  },
});
