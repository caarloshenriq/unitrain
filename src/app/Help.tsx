import { useSQLiteContext } from 'expo-sqlite'
import { View, Text } from 'react-native'

export default function Help() {
  const db = useSQLiteContext();

  return (
    <View >
      <Text className='text-center'>Hello World (Help page)</Text>
    </View>
  )
}