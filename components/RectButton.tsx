import { StyleSheet, Text, View } from 'react-native';

type RectButtonProps = {
  children: React.ReactNode;
  width: number;
  height: number;
  borderRadius: number;
  borderWidth: number;

}

const RectButton: React.FC<RectButtonProps> = ({ children, width, height, borderRadius, borderWidth }) => {
  const paddingOffset = 4;
  const dimensions = { width: width, height: height }
  const widthPlusPadding = width + paddingOffset;
  const heightPlusPadding = height + paddingOffset;
  const radius = { borderRadius: borderRadius }
  const strokeWidth = { borderWidth: borderWidth }

  return (
    <View style={[{ width: widthPlusPadding }, { height: heightPlusPadding }]}>
      <View style={[styles.rectBorder, styles.bottomRect, { backgroundColor: 'black' }, radius, strokeWidth, dimensions]}></View>
      <View style={[styles.rectBorder, styles.topRect, { backgroundColor: 'white', flexDirection: 'row' }, radius, strokeWidth, dimensions]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rectBorder: {
    borderColor: 'black',
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
})

export default RectButton;