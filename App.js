import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (e) => {
    setText(e);
  };
  const addGoalHandler = () => {
    setCourseGoals((prev) => [
      ...prev,
      { text: text, id: Math.random().toString() },
    ]);
    setText("");
  };

  const onDeleteHandler = (id) => {
    const removeGoals = courseGoals.filter((item) => item.id !== id);
    setCourseGoals(removeGoals);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <View style={styles.appContainer}>
      <Button title="Add new goal" color="blue" onPress={openModal} />
      {modal && (
        <GoalInput
          goalInputHandler={goalInputHandler}
          addGoalHandler={addGoalHandler}
          text={text}
          modal={modal}
        />
      )}

      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem itemData={itemData} onDeleteHandler={onDeleteHandler} />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
