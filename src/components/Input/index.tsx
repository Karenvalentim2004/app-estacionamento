import {TextInput, StyleSheet} from 'react-native'

type Props = {
  value: string
  onChangeText: (text: string) => void
}

export function Input({
  value,
  onChangeText
}: Props) {

  return (
    <TextInput
      placeholder='Digite a placa'
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: '#F5EAEA',
    color: '#F5EAEA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
})