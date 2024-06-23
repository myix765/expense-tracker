import { View, Text, StyleSheet, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import RectButton from './RectButton';

type SortButtonProps = {
  sortMode: string;
};

const SortButton: React.FC<SortButtonProps> = ({ sortMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SORT BY: </Text>
      <Pressable>
        <RectButton
          width={90}
          height={34}
          borderRadius={9.5}
          borderWidth={1.5}
        >
          <View style={styles.sortButton}>
            <Text style={styles.text}>PRICE</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </View>
        </RectButton>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 5,
  },
})

export default SortButton;