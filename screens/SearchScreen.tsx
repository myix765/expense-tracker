import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import dayjs from 'dayjs';

import SafeAreaViewAndroid from '../constants/SafeAreaViewAndroid';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ExpenseListItem from '../components/ExpenseListItem';
import SortButton from '../components/SortButton';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortMode, setSortMode] = useState<string>("Price");

  const exampleItem = {
    itemCategory: "food",
    itemName: "test",
    itemCost: 0.03,
    itemStore: "sdf",
    itemLocation: "sdf",
    itemDate: dayjs(),
  };
  const exampleItem2 = {
    itemCategory: "food",
    itemName: "sdf",
    itemCost: 6.66,
    itemStore: "ewr",
    itemLocation: "swererwf",
    itemDate: dayjs(),
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <SafeAreaView style={[styles.contentContainer, SafeAreaViewAndroid.AndroidSafeArea]}>
        <Text style={styles.header}>Expense Search</Text>
        <View style={styles.searchBox}>
          <MaterialIcons
            name={'search'}
            size={24}
          />
          <TextInput
            style={styles.textFont}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder='Search for item'
          />
        </View>
        <SortButton
          sortMode={sortMode}
        />
        <View style={[styles.list, { gap: 10 }]}>
          <ExpenseListItem
            borderColor='blue'
            item={exampleItem}
            isSearch={true}
          />
          <ExpenseListItem
            borderColor='orange'
            item={exampleItem2}
            isSearch={true}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { // shared
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    marginTop: 8,
  },
  textFont: { // shared
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  },

  contentContainer: { // shared
    flex: 1,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  searchBox: {
    marginTop: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 15,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 8,
    gap: 8,
  },
  list: {
    marginTop: 15,
    width: '100%',
  },
});

export default SearchScreen;