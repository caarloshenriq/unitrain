import { useExerciseDatabase } from '@/database/UseExerciseDatabase';
import { useSQLiteContext } from 'expo-sqlite'
import { View, Text } from 'react-native'

export default function Index() {
  const db = useSQLiteContext();

  return (
    <View>
      <Text style={{textAlign: 'center'}}>Hello World</Text>
    </View>
  )
}