import { useWorkoutDatabase } from "@/database/UseWorkoutDatabase";
import { ResumeWorkoutType } from "@/types/Workout";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface ResumeWorkoutProps {
    workoutsInfoId: number;
}

export default function ResumeWorkout({ workoutsInfoId }: ResumeWorkoutProps) {
    const db = useSQLiteContext();
    const workout = useWorkoutDatabase(db);
    const [loadedWorkout, setWorkout] = useState<ResumeWorkoutType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWorkout() {
            setLoading(true);
            const fetchedWorkout = await workout.getResumeWorkout(workoutsInfoId);
            setWorkout(fetchedWorkout);
            setLoading(false);
        }

        fetchWorkout();
    }, [workoutsInfoId]);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg font-bold">Carregando treino...</Text>
            </View>
        );
    }

    if (loadedWorkout != null && !loading) {
        return (
            <View className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
                <Text className="text-black dark:text-white text-lg font-bold mb-1">{loadedWorkout.workout_name}</Text>
                <Text className="dark:text-white text-xs text-gray-500 mb-2">{loadedWorkout.session_date}</Text>
                <View className="flex-row justify-between items-center">
                    <Text className="text-base text-gray-800 dark:text-white ">
                        Volume: <Text className="font-semibold text-black dark:text-white">{loadedWorkout.total_volume} kg</Text>
                    </Text>
                    <Text className="text-base text-gray-800 dark:text-white ">
                        Séries: <Text className="font-semibold text-black dark:text-white">{loadedWorkout.total_series}</Text>
                    </Text>
                    <Text className="text-base text-gray-800 dark:text-white ">
                        Exercícios: <Text className="font-semibold text-black dark:text-white">{loadedWorkout.distinct_exercises}</Text>
                    </Text>
                </View>
            </View>
        );
    }

    return null;
}