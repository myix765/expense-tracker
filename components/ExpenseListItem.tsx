import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Dayjs } from 'dayjs';
import { DateType } from 'react-native-ui-datepicker';
import ListItem from './ListItem';

type ExpenseListItemProps = {
  item: {
    itemCategory: string;
    itemName: string;
    itemCost: number;
    itemStore: string;
    itemLocation: string;
    itemDate: Dayjs | DateType;
  };
  borderColor: string;
  isSearch: boolean;
};

// how does this type work
const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ item, borderColor, isSearch }) => {
  const [isMinimized, setMinimized] = useState(false);

  return (
    <ListItem
      borderColor={borderColor}
      itemType='expense'
    >
      <View style={styles.firstLine}>
        <View style={[styles.firstLine, { width: '88%' }]}>
          <Text style={styles.expenseName}>{item.itemName}</Text>
          <Text style={styles.expenseCost}>{(isSearch ? 'Lowest: ' : '') + '$' + item.itemCost}</Text>
        </View>
        <Pressable
          onPress={() => setMinimized(!isMinimized)}
        >
          <MaterialIcons name={isMinimized ? "remove" : "add"} size={20} color="black" />
        </Pressable>
      </View>
      {isMinimized && <View style={styles.fields}>
        <View style={styles.rowCenter}>
          <Text style={styles.expenseSubheader}>STORE: </Text>
          <Text style={styles.expenseField}>{item.itemStore}</Text>
        </View>
        <View style={styles.rowCenter}>
          <Text style={styles.expenseSubheader}>Location: </Text>
          <Text style={styles.expenseField}>{item.itemLocation}</Text>
        </View>
        <View style={styles.rowCenter}>
          <Text style={styles.expenseSubheader}>Date Purchased: </Text>
          <Text style={styles.expenseField}>{item.itemDate.format('MM/DD/YY')}</Text>
        </View>
        {isSearch && <Pressable>
          <Text style={[styles.seeOtherButton, styles.subText]}>see other item purchases</Text>
        </Pressable>}
      </View>}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  expenseName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  expenseCost: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  },
  expenseSubheader: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
  },
  expenseField: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  subText: { //shared
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },

  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeOtherButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  fields: {
    paddingHorizontal: 12,
    marginTop: 4,
    gap: 4,
    width: '100%'
  }
});

export default ExpenseListItem;