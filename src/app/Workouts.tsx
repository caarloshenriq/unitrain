import { useSQLiteContext } from 'expo-sqlite'
import { View, Text } from 'react-native'

export default function Workouts() {
  const db = useSQLiteContext();

  return (
    <View >
      <Text className='text-center'>Hello World (Workout page)</Text>
    </View>
  )
}