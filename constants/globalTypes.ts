import { Dayjs } from "dayjs";
import { DateType } from "react-native-ui-datepicker";

export type ItemType = {
  itemCategory: string;
  itemName: string;
  itemCost: number;
  itemStore: string;
  itemLocation: string;
  itemDate: Dayjs | DateType;
};
