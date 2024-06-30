import SQLite, { SQLError, SQLiteDatabase } from "react-native-sqlite-storage";
import { ItemType } from "../constants/globalTypes";
SQLite.enablePromise(true);

type Column = {
  name: string;
  type: string;
};

const expenseTableName = "expenses";
const categoryTableName = "categories"

export const getDBConnection = async () => {
  return SQLite.openDatabase(
    {
      name: 'ExpenseTracker.db',
      location: 'default'
    },
    () => { },
    (error: SQLError) => {
      console.error('Error opening database:', error);
    }
  );
}

export const createTable = async (db: SQLiteDatabase,
  tableName: string,
  columnArray: Column[]): Promise<void> => {
  const columns = columnArray.map(column => `${column.name} ${column.type}`).join(', ');
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;

  try {
    await db.executeSql(query);
  } catch (e) {
    console.error(`Error creating table ${tableName}:`, e);
  }
}

export const initializeDB = async () => {
  // move this to json or something later?
  const expenseColumns: Column[] = [
    { name: 'expense_id', type: 'integer primary key autoincrement' },
    { name: 'category_id', type: 'integer' },
    { name: 'name', type: 'text' },
    { name: 'cost', type: 'numeric' },
    { name: 'store', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'date', type: 'datetime' }
  ];

  const categoryColumns: Column[] = [
    { name: 'category_id', type: 'integer primary key autoincrement' },
    { name: 'name', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'limit', type: 'numeric' }
  ];

  try {
    const db = await getDBConnection();
    await createTable(db, expenseTableName, expenseColumns);
    await createTable(db, 'categories', categoryColumns);

    return db;
  } catch (e) {
    console.error('Error initializing database:', e);
  }
}

export const insertExpense = async (db: SQLiteDatabase, item: ItemType) => {
  const columns = 'category_id, name, cost, store, location, date';
  const categoryID = getCategoryIDFromName(db, item.itemCategory);
  const values = `${categoryID}, ${item.itemName}, ${item.itemCost}, ${item.itemStore}, ${item.itemLocation}, ${item.itemDate}`;
  const query = `INSERT INTO ${expenseTableName}(${columns}) VALUES(${values})`;

  try {
    await db.executeSql(query);
  } catch (e) {
    console.log(`Error inserting expense: `, e);
  }
}

export const deleteExpense = async (db: SQLiteDatabase, item: ItemType) => {
  const query = `DELETE FROM ${expenseTableName} WHERE name=${item.itemName}`;

  try {
    await db.executeSql(query);
  } catch (e) {
    console.log('Erro deleting expense: ', e);
  }
}

export const getCategoryIDFromName = async (db: SQLiteDatabase, categoryName: string) => {
  const query = `SELECT cateory_id FROM categories WHERE name=${categoryName}`;

  try {
    const results = await db.executeSql(query);
    if (results[0].rows.length = 1) { // = 1 because there should only be one category? not sure best way to handle
      return results[0].rows.item(0).id;
    } else {
      // throw exception because the category should exist
      return null; // temp
    }
  } catch (e) {
    console.error(`Error fetching ID: `, e);
  }
}

export const getExpenses = async (db: SQLiteDatabase): Promise<ItemType[]> => {
  const query = `SELECT * FROM ${expenseTableName}`;

  try {
    const expenseArr: ItemType[] = [];
    const results = await db.executeSql(query);
    console.log(`getting expenses: ${results}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        expenseArr.push(result.rows.item(index))
      }
    })
    console.log("expenseArr", expenseArr);
    return expenseArr;
  } catch (e) {
    console.error(e);
    throw Error('Failed to get todoItems: ' + e);
  }
}