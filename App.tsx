import { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        task,
        completed: false,
        createdAt: new Date(),
      },
    ]);
    setTask("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    const item = todos.find((todo) => todo.id === id);
    const remainingTodos = todos.filter((todo) => todo.id !== id);

    if (!item) return;

    const updatedItem = { ...item, completed: !item.completed };

    setTodos([...remainingTodos, updatedItem]);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [todos]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Tarefa"
            placeholderTextColor="#0000008a"
            value={task}
            onChangeText={setTask}
            autoCorrect={false}
          />
          <Pressable style={styles.sendButton} onPress={addTodo}>
            <Text>Ir</Text>
          </Pressable>
        </View>
        <View style={styles.todoList}>
          <ScrollView contentContainerStyle={styles.scrollList}>
            {todos.map((todo) => (
              <View key={todo.id} style={styles.todoListItem}>
                <Text
                  style={{
                    textDecorationLine: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.task}
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity onPress={() => removeTodo(todo.id)}>
                    <Text>❌</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
                    <Text>✅</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, alignItems: "center", paddingHorizontal: 16 },
  inputRow: { flexDirection: "row", paddingHorizontal: 16, gap: 8 },
  textInput: {
    backgroundColor: "lightgray",
    paddingLeft: 8,
    height: 50,
    borderRadius: 4,
    color: "black",
    fontWeight: "bold",
    flex: 1,
  },
  sendButton: {
    width: "15%",
    height: 50,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  // list
  scrollList: { gap: 8 },
  todoList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  todoListItem: {
    width: "100%",
    height: 50,
    borderWidth: 0.2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 4,
    flexDirection: "row",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
});
