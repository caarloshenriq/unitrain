import { View, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { format } from "date-fns";
import { useFont } from "@shopify/react-native-skia";

interface WorkoutProgressChartProps {
  workout_name: string;
  data: { date: string; average_weight: number }[];
}

export default function WorkoutProgressChart({ workout_name, data }: WorkoutProgressChartProps) {
  const font = useFont(require("@/fonts/Roboto-Regular.ttf"));

  if (!font) return <Text>Carregando fonte...</Text>;

  const chartData = data.length >= 2
    ? data.map((d) => ({ day: new Date(d.date).getTime(), weight: d.average_weight }))
    : data.length === 1
      ? [
          { day: new Date(data[0].date).getTime(), weight: data[0].average_weight },
          { day: new Date(data[0].date).getTime() + 1000 * 60 * 60, weight: data[0].average_weight },
        ]
      : [];

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "black", marginBottom: 8 }}>
        {workout_name}
      </Text>

      <View style={{ width: "100%", height: 300 }}>
        {chartData.length > 0 ? (
          <CartesianChart
            data={chartData}
            xKey="day"
            yKeys={["weight"]}
            axisOptions={{
              tickCount: 5,
              font,
              labelOffset: { x: 3, y: 5 },
              labelPosition: "inset",
              formatYLabel: (value) => `${value} kg`,
              formatXLabel: (value) => format(new Date(value), "dd/MM"),
            }}
          >
            {({ points }) => (
              <Line points={points.weight} color="black" strokeWidth={4} />
            )}
          </CartesianChart>
        ) : (
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>Sem dados suficientes</Text>
        )}
      </View>
    </View>
  );
}
