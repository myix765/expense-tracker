import { Text, StyleSheet } from "react-native";
import ExpenseScreen from "./screens/ExpenseScreen";

import SearchScreen from "./screens/SearchScreen";
import BudgetScreen from "./screens/BudgetScreen";

import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return <ExpenseScreen />;
};

const styles = StyleSheet.create({

});

export default App;