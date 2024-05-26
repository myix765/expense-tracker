import { StyleSheet, Text, View } from 'react-native';

const AddButton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{...styles.circleBorder, ...{ backgroundColor: 'black' }, ...styles.backCircle}}></View>
      <View style={{...styles.circleBorder, ...{ backgroundColor: 'white' }, ...styles.topCircle}}>
        <Text style={styles.plusText}>+</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 63,
    aspectRatio: 1/1,
    position: 'relative',
  },
  circleBorder: {
    borderColor: 'black',
    borderWidth: 3.8,
    borderRadius: 500,
    width: 60,
    aspectRatio: 1/1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 48,
    lineHeight: 60,
  },
  topCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backCircle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})

export default AddButton;