import {TouchableOpacity, Text, StyleSheet} from 'react-native'

type Props = {
  title: string
  onPress: () => void
  color?: string
}

export function Button({
  title,
  onPress,
  color = '#3B82F6'
}: Props) {

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color }
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  text: {
    color: '#F8FAFC',
    fontWeight: 'bold',
  },

})