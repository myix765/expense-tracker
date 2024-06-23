import { StyleSheet, View } from 'react-native';

type ListItemProps = {
  children: React.ReactNode;
  borderColor: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, borderColor }) => {
  const borderColorStyle = { borderColor: borderColor };

  return (
  <View style={[styles.listItem, borderColorStyle]}>
    {children}
  </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 2,
    borderRadius: 15,
    width: '100%',

    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 15,
  },
})

export default ListItem;