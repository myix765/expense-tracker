import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Modal, Platform, TextInput, Dimensions, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CurrencyInput from 'react-native-currency-input';
import dayjs, { Dayjs } from 'dayjs';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

import AddButton from '../components/AddButton';
import NavBar from '../components/NavBar';
import RectButton from '../components/RectButton';
import ExpenseListItem from '../components/ExpenseListItem';
import SafeAreaViewAndroid from '../constants/SafeAreaViewAndroid';
import { ItemType } from '../constants/globalTypes';

const screenHeight = Dimensions.get('window').height;

const ExpenseScreen: React.FC = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);

  const itemDefault = {
    itemCategory: "",
    itemName: "",
    itemCost: -1,
    itemStore: "",
    itemLocation: "",
    itemDate: dayjs(),
  };

  const [item, setItem] = useState<ItemType>(itemDefault);
  const [expenses, setExpense] = useState<ItemType[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const [isItemCategoryValid, changeIsItemCategoryValid] = useState<boolean>(false);
  const [isItemNameValid, changeIsItemNameValid] = useState<boolean>(false);
  const [isItemCostValid, changeIsItemCostValid] = useState<boolean>(false);
  const [isItemStoreValid, changeIsItemStoreValid] = useState<boolean>(false);
  const [isItemLocationValid, changeIsItemLocationValid] = useState<boolean>(false);
  const [addedInvalid, changeAddedInvalid] = useState<boolean>(false);

  const validateAddItem = () => {
    if (item.itemCategory != itemDefault.itemCategory) {
      changeIsItemCategoryValid(true);
    }
    if (item.itemName != itemDefault.itemName) {
      changeIsItemNameValid(true);
    }
    if (item.itemCost != itemDefault.itemCost) {
      changeIsItemCostValid(true);
    }
    if (item.itemStore != itemDefault.itemStore) {
      changeIsItemStoreValid(true);
    }
    if (item.itemLocation != itemDefault.itemLocation) {
      changeIsItemLocationValid(true);
    }
  }

  const resetValidToFalse = (): void => {
    changeIsItemCategoryValid(false);
    changeIsItemNameValid(false);
    changeIsItemCostValid(false);
    changeIsItemStoreValid(false);
    changeIsItemLocationValid(false);
    changeAddedInvalid(false);
  }

  const addExpense = (): void => {
    console.log(item);
    validateAddItem();
    if (isItemCategoryValid && isItemNameValid && isItemCostValid && isItemStoreValid && isItemLocationValid) {
      setExpense((currentExpenses) => [
        ...currentExpenses,
        item,
      ]);
      setTotalExpense(totalExpense + item.itemCost);

      setItem(itemDefault);
      setAddModalVisible(false);
      setDateModalVisible(false);
    } else {
      changeAddedInvalid(true);
    }
  }

  // need to work on this
  type CategoryType = {
    title: string;
    icon: string;
    color: string;
  }
  const handleItemCategoryChange = (input: CategoryType) => {
    setItem({
      ...item,
      itemCategory: input.title
    });
  }
  const handleItemNameChange = (input: string) => {
    setItem({
      ...item,
      itemName: input
    });
  };
  const handleItemCostChange = (input: number) => {
    const cost = Number(input);
    console.log(input);
    if (input !== null) {
      setItem({
        ...item,
        itemCost: input,
      });
    } else {
      setItem({
        ...item,
        itemCost: -1,
      });
    }
  }
  const handleItemStoreChange = (input: string) => {
    setItem({
      ...item,
      itemStore: input
    });
  }
  const handleItemLocationChange = (input: string) => {
    setItem({
      ...item,
      itemLocation: input
    });
  }
  const handleItemDateChange = (input: Dayjs | DateType) => {
    setItem({
      ...item,
      itemDate: input
    });
    setDateModalVisible(false);
  }

  const categories = [
    {
      title: 'food',
      icon: 'circle',
      color: 'orange'
    },
    {
      title: 'tech',
      icon: 'circle',
      color: 'aqua'
    }
  ]

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.contentContainer, SafeAreaViewAndroid.AndroidSafeArea]}>
        <Text style={styles.header}>EXPENSES</Text>
        <Text style={styles.moneyHeader}>{new Intl.NumberFormat("en-IN", { style: 'currency', currency: 'USD' }).format(totalExpense).replace(/\u00A0/g, '')}</Text>
        <View style={styles.list}>
          <Text style={styles.listHeader}>Transactions</Text>
          {(expenses.length != 0) ? (
            <FlatList
              data={expenses}
              renderItem={(expenseData) => {
                return (
                  <ExpenseListItem
                    borderColor={'orange'}
                    item={expenseData.item}
                    isSearch={false}
                  />
                )
              }}
              // keyExtractor={expense => expense.expense_id} // handle this later
              contentContainerStyle={{ gap: 10 }}
              alwaysBounceVertical={false}
            />
          )
            : (
              <Text>No expenses added yet</Text>
            )}
        </View>
        <Pressable
          style={styles.modalButton}
          onPress={() => setAddModalVisible(true)}
        >
          <AddButton />
        </Pressable>
      </SafeAreaView>
      <NavBar />
      <Modal
        animationType='fade'
        transparent={true}
        visible={addModalVisible || dateModalVisible}
        statusBarTranslucent
        onRequestClose={() => {
          setAddModalVisible(false);
          setDateModalVisible(false);
        }}
      >
        <View style={styles.modalCenter}>
          <Pressable
            onPress={() => setAddModalVisible(false)}
            style={[
              Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop,
              styles.backdrop,
            ]}
          />
          <View style={styles.modal}>
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                dateModalVisible ? setDateModalVisible(false) : setAddModalVisible(!addModalVisible)
                setItem(itemDefault);
              }}
            >
              <MaterialIcons name='close' size={22} color={'black'} />
            </Pressable>
            {dateModalVisible ? (
              <View style={{ marginTop: '8%' }}>
                <DateTimePicker
                  mode="single"
                  date={item.itemDate}
                  onChange={date => { handleItemDateChange(date.date) }}
                />
              </View>
            ) : (
              <View>
                <View style={[styles.rowCenter, { marginBottom: 12 }]}>
                  <Text style={styles.categoryHeader}>Category:</Text>
                  <SelectDropdown
                    data={categories}
                    onSelect={(selectedCategory) => handleItemCategoryChange(selectedCategory)}
                    renderButton={(selectedCategory, isOpen) => {
                      return (
                        <View style={[styles.categoryDropdownButton, { borderColor: (selectedCategory && selectedCategory.color) || 'black', paddingRight: 6 }]}>
                          <View style={[styles.rowCenter, styles.categorySelectorItem]}>
                            {selectedCategory && (
                              <MaterialIcons
                                name={selectedCategory.icon}
                                size={12}
                                color={selectedCategory.color}
                              />
                            )}
                            <Text
                              style={styles.categoryLabel}
                            >{(selectedCategory && selectedCategory.title) || 'Pick Category'}</Text>
                          </View>
                          <MaterialIcons
                            name={isOpen ? 'expand-less' : 'expand-more'}
                            size={24}
                            color={'black'}
                          />
                        </View>
                      )
                    }}
                    renderItem={(category, index, isSelected) => {
                      return (
                        <View style={[styles.rowCenter, styles.categorySelectorItem, { paddingVertical: 4 }]}>
                          <MaterialIcons
                            name={'circle'}
                            size={12}
                            color={category.color}
                          />
                          <Text style={styles.categoryLabel}>{category.title}</Text>
                        </View>
                      )
                    }}
                    dropdownStyle={styles.categoryDropdown}
                    dropdownOverlayColor={'transparent'}
                    showsVerticalScrollIndicator
                  />
                </View>
                <View style={styles.itemInputs}>
                  <View style={styles.rowCenter}>
                    <TextInput
                      style={[styles.itemInputText, styles.itemInput, { width: '60%' }]}
                      onChangeText={handleItemNameChange}
                      value={item.itemName}
                      placeholder='Item Name'
                    />
                    <View style={[styles.rowCenter, { justifyContent: 'flex-end', width: '40%' }]}>
                      <Text style={[styles.itemInputText, styles.itemInput]}>$ </Text>
                      <CurrencyInput
                        style={[styles.itemInputText, styles.itemInput, { width: '60%' }]}
                        value={item.itemCost === -1 ? null : item.itemCost}
                        placeholder='Cost'
                        delimiter=","
                        separator="."
                        precision={2}
                        minValue={0}
                        onChangeValue={handleItemCostChange}
                        keyboardType='number-pad'
                      />
                    </View>
                  </View>
                  <TextInput
                    style={[styles.itemInputText, styles.itemInput]}
                    onChangeText={handleItemStoreChange}
                    value={item.itemStore}
                    placeholder='Store'
                  />
                  <TextInput
                    style={[styles.itemInputText, styles.itemInput]}
                    onChangeText={handleItemLocationChange}
                    value={item.itemLocation}
                    placeholder='Location'
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <View style={styles.rowCenter}>
                    <Text style={[styles.itemInputText, styles.itemInput, { marginRight: 16 }]}>Date:</Text>
                    {/* date picker */}
                    <Pressable
                      style={styles.datePickerButton}
                      onPress={() => setDateModalVisible(true)}
                    >
                      <Text style={styles.itemInputText}>{item.itemDate.format('MM/DD/YY')}</Text>
                    </Pressable>
                  </View>
                </View>
                <Pressable
                  style={{ alignItems: 'center', marginTop: 24 }}
                  onPress={addExpense}
                >
                  <RectButton
                    width={208}
                    height={46}
                    borderRadius={12}
                    borderWidth={2.5}
                  >
                    <Text style={styles.buttonText}>Add Expense</Text>
                  </RectButton>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    marginTop: 8,
  },
  moneyHeader: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 40,
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  },
  listHeader: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },

  modalButton: {
    position: 'absolute',
    bottom: 22,
    right: 0,
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    height: screenHeight / 2,
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 20,
  },
  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.32,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryHeader: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
  },
  itemInputText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  itemInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  categoryDropdownButton: {
    borderWidth: 2.5,
    borderRadius: 8,
    width: '50%',
    marginHorizontal: 12,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  categorySelectorItem: {
    gap: 10,
    paddingLeft: 12,
    paddingVertical: 3,
  },
  categoryDropdown: {
    borderRadius: 12,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2.5,
    maxHeight: 200,
    paddingVertical: 3,
  },
  itemInputs: {
    gap: 10,
  },
  datePickerButton: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseScreen;