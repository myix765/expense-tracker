import { StyleSheet, View } from 'react-native';

export default function ListItem({ children, borderColor }) {
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