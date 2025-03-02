import 'nativewind'
import { useSQLiteContext } from 'expo-sqlite'
import { View, Text } from 'react-native'

export default function Index() {
  const db = useSQLiteContext();

  return (
    <View >
      <Text className='text-center'>Hello World</Text>
    </View>
  )
}