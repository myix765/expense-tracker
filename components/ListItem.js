import { StyleSheet, Text, View } from 'react-native';

export default function ListItem({ text, borderColor }) {
  const borderColorStyle = { borderColor: borderColor };

  return (
  <View style={[styles.listItem, borderColorStyle]}>
      <Text style={styles.listItemHeader}>{text}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 2,
    borderRadius: 15,
    width: '100%',

    paddingTop: 13,
    paddingBottom: 14,
    paddingLeft: 18,
    paddingRight: 13,
  },
  listItemHeader: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  }
})