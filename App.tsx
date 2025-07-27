import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SIZE = 100;

export default function App() {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const springConfig = (toValue: number) => ({
    toValue,
    useNativeDriver: true,
  });

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, springConfig(1)),
          Animated.spring(progress, springConfig(0.5)),
        ]),
        Animated.sequence([
          Animated.spring(scale, springConfig(2)),
          Animated.spring(scale, springConfig(1)),
        ]),
      ])
    );

    loop.start();

    return () => {
      loop.stop();
    };
  }, [progress, scale]);

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
                  outputRange: ["180deg", "360deg"],
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
    backgroundColor: "rgba(0,0,255,0.5)",
  },
});
