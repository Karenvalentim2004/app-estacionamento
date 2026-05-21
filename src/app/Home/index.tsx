import { useState, useEffect } from 'react'

import {View, Text, FlatList, Alert, StyleSheet} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Veiculo } from '../../types/Veiculo'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { VeiculoCard } from '../../components/VeiculoCard'

export default function Home() {

  const [placa, setPlaca] = useState('')
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])

  async function salvarVeiculos(
    lista: Veiculo[]
  ) {

    await AsyncStorage.setItem(
      '@dark-estacionamento',
      JSON.stringify(lista)
    )
  }

  async function carregarVeiculos() {

    const dados =
      await AsyncStorage.getItem(
        '@dark-estacionamento'
      )

    if (dados) {
      setVeiculos(JSON.parse(dados))
    }
  }

  useEffect(() => {
    carregarVeiculos()
  }, [])

  function handleEntrada() {

    if (!placa) {
      Alert.alert('Digite uma placa')
      return
    }

    const novoVeiculo: Veiculo = {
      placa,
      entrada: new Date(),
      pago: false,
    }

    const novaLista = [
      ...veiculos,
      novoVeiculo
    ]

    setVeiculos(novaLista)

    salvarVeiculos(novaLista)

    setPlaca('')
  }

  function handleSaida(
    veiculo: Veiculo
  ) {

    const saida = new Date()

    const diferenca =
      saida.getTime() -
      new Date(veiculo.entrada).getTime()

    const minutos = Math.ceil(
      diferenca / (1000 * 60)
    )

    let total = 5

    if (minutos > 60) {

      const adicional = Math.ceil(
        (minutos - 60) / 30
      )

      total += adicional
    }

    Alert.alert(
      'Pagamento',

`
Placa: ${veiculo.placa}

Tempo: ${minutos} minuto(s)

Valor final: R$ ${total}
`
    )

    const novaLista = veiculos.map((item) => {

      if (item.placa === veiculo.placa) {

        return {
          ...item,
          pago: true,
          valor: total,
          saida,
        }
      }

      return item
    })

    setVeiculos(novaLista)

    salvarVeiculos(novaLista)
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        DARK {'\n'}
        ESTACIONAMENTO
      </Text>

      <Input
        value={placa}
        onChangeText={setPlaca}
      />

      <Button
        title="+ REGISTRAR ENTRADA"
        onPress={handleEntrada}
      />

      <FlatList
        data={veiculos}

        keyExtractor={(item) =>
          item.placa
        }

        style={{ marginTop: 20 }}

        renderItem={({ item }) => (

          <VeiculoCard
            data={item}
            onExit={() =>
              handleSaida(item)
            }
          />

        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0F172A',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#F8FAFC',
    letterSpacing: 2,
  },

})