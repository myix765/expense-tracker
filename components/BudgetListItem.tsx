import { View, Text, StyleSheet, Pressable } from "react-native";
import ListItem from "./ListItem";
import ProgressBar from "./ProgressBar";

type BudgetListItemProps = {
  categoryName: string;
};

const BudgetListItem: React.FC<BudgetListItemProps> = ({ categoryName }) => {
  return (
    <View>
      <ListItem
        borderColor="green"
        itemType="category"
      >
        <View style={[styles.firstLine, { marginBottom: 8, width: '100%' }]}>
          <View style={[styles.firstLine, { gap: 6 }]}>
            <Text style={styles.expenseName}>{categoryName}</Text>
            <Text style={[styles.subText, styles.count]}>9</Text>
          </View>
          <Text style={styles.field}>$96.00 / $200.00</Text>
        </View>
        <ProgressBar
          percent={53}
          color="green"
        />
        <Pressable
          style={{ marginTop: 10 }}
        >
          <Text style={styles.subText}>see all category purchases</Text>
        </Pressable>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseName: { // shared
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  subText: { // shared
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  field: { // shared
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    textTransform: 'capitalize',
  },

  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  count: {
    color: '#AEAEB2',
    // lineHeight: 15,
  }
});

export default BudgetListItem;