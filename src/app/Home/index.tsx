import {useState} from 'react'
import {View, Text, FlatList, Alert,StyleSheet} from "react-native"

import { Veiculo } from '../../types/Veiculo'

export default function Home(){
    const [placa, setPlaca] = useState('')
    const [entrada, setEntrada] = useState('')
    const [veiculos, setVeiculos] = useState<Veiculo[]>([])
}

