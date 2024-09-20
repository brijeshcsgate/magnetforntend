import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const colors = ['green', 'red', 'blue'];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  console.log(active, payload, label); // Debugging line, can be removed later
  if (active && payload && payload.length) {
    const uniquePayload = payload.filter(
      (entry, index, self) =>
        index === self.findIndex((e) => e.dataKey === entry.dataKey)
    );

    return (
      <div className="bg-white border border-border p-4 rounded-lg shadow-md">
        <p className="font-bold mb-2">{`Time: ${label}`}</p>
        {uniquePayload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {`${entry.name}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Main chart component
export default function VehicleTimelineChart({ data }) {
  const vehicles = Object.keys(data[0]).filter((key) => key.startsWith('UP'));

  return (
    <div className="h-[calc(100vh-59px-64px)] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            padding={{ left: 25, right: 25 }}
            orientation="top"
          />
          <YAxis
            dataKey="stage"
            type="number"
            domain={[0, 'auto']}
            ticks={data.map((d) => d.stageKey)}
            padding={{ bottom: 25 }}
            hide
          />
          <Tooltip content={<CustomTooltip />} />
          {vehicles.map((vehicle, index) => (
            <Line
              key={vehicle}
              type="linear"
              dataKey={vehicle}
              stroke={colors[index]}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
