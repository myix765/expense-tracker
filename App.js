import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Modal, Platform, TextInput } from 'react-native';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AddButton from './components/AddButton';
import NavBar from './components/NavBar';
import RectButton from './components/RectButton';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import ExpenseListItem from './components/ExpenseListItem';

export default function App() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const itemDefault = {
    itemCategory: "",
    itemName: "",
    itemPrice: 0.0,
    itemStore: "",
    itemLocation: "",
    itemDate: dayjs(),
  }
  const [item, setItem] = useState(itemDefault);
  const exampleItem = {
    itemCategory: "technology",
    itemName: "iPad",
    itemPrice: 699.99,
    itemStore: "Apple Store",
    itemLocation: "Some mall",
    itemDate: dayjs(),
  }

  const handleItemCategoryChange = (input) => {
    setItem({
      ...item,
      itemCategory: input.title
    });
  }
  const handleItemNameChange = (input) => {
    setItem({
      ...item,
      itemName: input
    });
  };
  const handleItemPriceChange = (input) => {
    setItem({
      ...item,
      itemPrice: input
    });
  }
  const handleItemStoreChange = (input) => {
    setItem({
      ...item,
      itemStore: input
    });
  }
  const handleItemLocationChange = (input) => {
    setItem({
      ...item,
      itemLocation: input
    });
  }
  const handleItemDateChange = (input) => {
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

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={addModalVisible || dateModalVisible}
          onRequestClose={() => {
            setAddModalVisible(false);
            setDateModalVisible(false);
          }}
        >
          <Pressable
            onPress={() => setAddModalVisible(false)}
            style={[
              Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop,
            ]}
          />
          <View style={styles.modalCenter}>
            <View style={styles.modal}>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  dateModalVisible ? setDateModalVisible(false) : setAddModalVisible(!addModalVisible)
                  setItem(itemDefault);
                }}
              >
                <MaterialIcons name='close' size={22} color={'black'}/>
              </Pressable>
              {dateModalVisible ? (
                <View style={{ marginTop: '8%' }}>
                  <DateTimePicker
                    mode="single"
                    date={item.itemDate}
                    onChange={date => {handleItemDateChange(date.date)}}
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
                          <View style={[styles.categoryDropdownButton, { borderColor: (selectedCategory && selectedCategory.color) || 'black' , paddingRight: 6 }]}>
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
                        <TextInput
                          style={[styles.itemInputText, styles.itemInput, { width: '60%'}]}
                          onChangeText={handleItemPriceChange}
                          value={item.itemPrice}
                          placeholder='Price'
                          keyboardType='numeric'
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
                    onPress={() => {
                      console.log(item);
                      setItem(itemDefault);
                      setAddModalVisible(false);
                      setDateModalVisible(false);
                    }}
                  >
                    <RectButton
                      width={208}
                      text={'Add Expense'}
                    />
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <Text style={styles.header}>EXPENSES</Text>
        <Text style={styles.moneyHeader}>$333.17</Text>
        <View style={styles.list}>
          <Text style={styles.listHeader}>Transactions</Text>
          <View style={{ gap: 10 }}>
            <ExpenseListItem
              borderColor={'orange'}
              item={exampleItem}
            />
          </View>
        </View>
        <Pressable
          style={styles.modalButton}
          onPress={() => setAddModalVisible(true)}
        >
          <AddButton/>
        </Pressable>
      </SafeAreaView>
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  listHeader: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  list: {
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
    height: '50%',
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
    // borderTopColor: 'black',
    borderBottomColor: 'black',
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderStyle: 'dashed',
    // borderRadius: 1,
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
