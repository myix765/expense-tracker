import { View, Text, StyleSheet, Dimensions } from "react-native";

type ProgressBarProps = {
  percent: number;
  color: string;
};

const screenWidth = Dimensions.get('window').width;
const containerWidth = (screenWidth * 0.9) - 36;

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, color }) => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.barBorder, styles.barOuter]}></View>
        <View style={[styles.barBorder, styles.barFill, { width: `${percent}%`, backgroundColor: color }]}></View>
      </View>
      <Text style={styles.subText}>{percent + '%'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subText: { // shared
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: containerWidth,
  },
  barContainer: {
    width: containerWidth - 36,
  },
  barBorder: {
    // borderColor: 'black',
    height: 18,
    borderWidth: 1.5,
    borderRadius: 100,
  },
  barOuter: {
    backgroundColor: 'white',
    width: '100%',
  },
  barFill: {
    position: 'absolute',
  },
});

export default ProgressBar;