import { StyleSheet, Text, View } from 'react-native';

type RectButtonProps = {
  width: number;
  text: string;
}

const RectButton: React.FC<RectButtonProps> = ({ width, text }) => {
  const padddingOffset = 4;
  const height = 46;
  const rectWidth = { width: width };
  const rectHeight = { height: height };
  const widthPlusPadding = { width: width + padddingOffset };
  const heightPlusPadding = { height: height + padddingOffset};

  return (
    <View style={[widthPlusPadding, heightPlusPadding]}>
      <View style={[styles.rectBorder, styles.bottomRect, { backgroundColor: 'black' }, rectWidth, rectHeight]}></View>
      <View style={[styles.rectBorder, styles.topRect, { backgroundColor: 'white'}, rectWidth, rectHeight]}>
        <Text style={styles.buttonText}>{ text }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rectBorder: {
    borderColor: 'black',
    borderWidth: 2.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRect: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomRect: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
  },
})

export default RectButton;