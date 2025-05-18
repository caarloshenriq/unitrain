import { View, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { format } from "date-fns";
import { useFont } from "@shopify/react-native-skia";

interface BodyInfoChartProps {
  measure_type: string;
  data: { date: string; average_measurement: number }[];
}

export default function BodyInfoProgressChart({ measure_type, data }: BodyInfoChartProps) {
  const font = useFont(require("@/fonts/Roboto-Regular.ttf"));

  if (!font) return <Text>Carregando fonte...</Text>;

  const chartData = data.map((d) => ({ day: new Date(d.date).getTime(), measurement: d.average_measurement }));

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "black", marginBottom: 8 }}>
        {measure_type}
      </Text>

      <View style={{ width: "100%", height: 300 }}>
        {chartData.length > 0 ? (
          <CartesianChart
            data={chartData}
            xKey="day"
            yKeys={["measurement"]}
            axisOptions={{
              tickCount: 5,
              font,
              labelOffset: { x: 3, y: 5 },
              labelPosition: "inset",
              formatYLabel: (value) => `${value}`,
              formatXLabel: (value) => format(new Date(value), "dd/MM"),
            }}
          >
            {({ points }) => (
              <Line points={points.measurement} color="black" strokeWidth={4} />
            )}
          </CartesianChart>
        ) : (
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>Sem dados suficientes</Text>
        )}
      </View>
    </View>
  );
}
