import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import SafeAreaViewAndroid from "../constants/SafeAreaViewAndroid";
import ProgressBar from "../components/ProgressBar";
import BudgetListItem from "../components/BudgetListItem";

const BudgetScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <SafeAreaView style={[styles.contentContainer, SafeAreaViewAndroid.AndroidSafeArea]}>
        <Text style={styles.header}>Budget Planner</Text>
        <Text style={styles.subheader}>Total</Text>
        <View style={styles.totalBudget}>
          <Text style={styles.moneyHeader}>$300.16</Text>
          <Text style={[styles.subMoneyHeader, { lineHeight: 40 }]}> / $600.0</Text>
        </View>
        <ProgressBar
          percent={100}
          color="#AEAEB2"
        />
        <View style={styles.list}>
          <Text style={[styles.subheader, { marginBottom: 8 }]}>Categories</Text>
          <View style={{ gap: 10 }}>
            <BudgetListItem
              categoryName="groceries"
            />
            <BudgetListItem
              categoryName="groceries"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { // shared
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    marginTop: 8,
  },
  subheader: { // shared
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
  },
  moneyHeader: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 40,
  },
  subMoneyHeader: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
  },

  contentContainer: { // shared
    flex: 1,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  totalBudget: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  list: {
    width: '100%',
    marginTop: 24,
  }
});

export default BudgetScreen;