import {useState} from "react";
import {LayoutAnimation, Platform, Pressable, Text, UIManager, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface HelpItemProps {
    question: string;
    answer: string;
}

export default function HelpItem({question, answer}: HelpItemProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View className="mb-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
            <Pressable onPress={toggleExpand} className="flex-row justify-between items-center">
                <Text className="text-black dark:text-gray-200 font-bold text-lg flex-1">{question}</Text>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={expanded ? "#4A90E2" : "gray"}
                />
            </Pressable>
            {expanded && (
                <View className="mt-2">
                    <Text className="text-gray-700 dark:text-gray-300 text-base">{answer}</Text>
                </View>
            )}
        </View>
    );
}
