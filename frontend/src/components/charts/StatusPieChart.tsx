import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatusPieChartProps {
  data: { name: string; value: number }[];
  title: string;
}

const COLORS = ['#2e7d32', '#0288d1', '#f9a825'];

export const StatusPieChart = ({ data, title }: StatusPieChartProps) => {
  return (
    <div className="w-full h-72 bg-white rounded shadow p-4">
      <h3 className="text-center font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
  
  >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};