import { StyleSheet, Text, View, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function NavBar() {

  return (
    <View style={styles.navBar}>
      <Pressable style={styles.navLink}>
        <MaterialIcons name='payment' size={32} color={'black'}/>
        <Text style={styles.navLinkText}>expenses</Text>
      </Pressable>
      <Pressable style={styles.navLink}>
        <MaterialIcons name='search' size={32} color={'black'}/>
        <Text style={styles.navLinkText}>search</Text>
      </Pressable>
      <Pressable style={styles.navLink}>
        <MaterialIcons name='account-balance' size={32} color={'black'} />
        <Text style={styles.navLinkText}>budget</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    borderTopWidth: 3,
    borderTopColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
    paddingTop: 10,
    paddingBottom: 32,
  },
  navLink: {
    alignItems: 'center',
    width: 56,
  },
  navLinkText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
  }
})