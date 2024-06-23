import { StyleSheet, View } from 'react-native';

type ListItemProps = {
  children: React.ReactNode;
  borderColor: string;
  itemType: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, borderColor, itemType }) => {
  const borderColorStyle = { borderColor: borderColor };
  let paddingStyle;

  if (itemType == 'expense') {
    paddingStyle = {
      paddingVertical: 14,
      paddingLeft: 18,
      paddingRight: 15,
    }
  } else if (itemType == 'category') {
    paddingStyle = {
      paddingVertical: 14,
      paddingHorizontal: 18,
    }
  }

  return (
    <View style={[styles.listItem, borderColorStyle, paddingStyle]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 2,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
})

export default ListItem;