import {View, Text, StyleSheet, TouchableOpacity,} from 'react-native'

import { Veiculo } from '../../types/Veiculo'

type Props = {
  data: Veiculo
  onExit: () => void
}

export function VeiculoCard({
  data,
  onExit
}: Props) {

  return (

    <View style={styles.card}>

      <View style={styles.topo}>

        <View style={styles.info}>

          <View
            style={[
              styles.bolinha,

              {
                backgroundColor:
                  data.pago
                    ? '#22C55E'
                    : '#3B82F6'
              }
            ]}
          />

          <Text style={styles.placa}>
            {data.placa}
          </Text>

          <Text style={styles.hora}>
            {new Date(
              data.entrada
            ).toLocaleTimeString()}
          </Text>

        </View>

        <View style={styles.statusContainer}>

          <View
            style={[
              styles.statusBolinha,

              {
                borderColor:
                  data.pago
                    ? '#22C55E'
                    : '#3B82F6'
              }
            ]}
          />

          <Text
            style={[
              styles.status,

              {
                color:
                  data.pago
                    ? '#22C55E'
                    : '#3B82F6'
              }
            ]}
          >

            {data.pago
              ? 'PAGO'
              : 'EM ABERTO'}

          </Text>

        </View>

      </View>

      {
        data.valor && (
          <View style={styles.valorContainer}>

            <Text style={styles.valor}>
              Valor: R$ {data.valor}
            </Text>

          </View>
        )
      }

      {
        !data.pago && (

          <TouchableOpacity
            style={styles.botao}
            onPress={onExit}
          >

            <Text style={styles.botaoTexto}>
              REGISTRAR SAÍDA
            </Text>

          </TouchableOpacity>

        )
      }

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 20,
    marginRight: 10,
  },

  placa: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 15,
  },

  hora: {
    color: '#94a3b8',
    fontSize: 16,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusBolinha: {
    width: 18,
    height: 18,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 8,
  },

  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  valorContainer: {
    marginTop: 15,
  },

  valor: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: '#dc2626',
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

})