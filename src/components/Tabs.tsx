import { View, Text, Pressable } from "react-native";
import { ReactNode } from "react";

interface TabProps {
  tabs: { key: string; title: string; content: ReactNode }[];
  activeTab: string;
  onChangeTab: (key: string) => void;
}

export default function Tabs({ tabs, activeTab, onChangeTab }: TabProps) {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => onChangeTab(tab.key)}
            style={{
              padding: 10,
              borderBottomWidth: activeTab === tab.key ? 2 : 0,
              borderBottomColor: "black",
            }}
          >
            <Text>{tab.title}</Text>
          </Pressable>
        ))}
      </View>
      <View>{tabs.find((tab) => tab.key === activeTab)?.content}</View>
    </View>
  );
}
