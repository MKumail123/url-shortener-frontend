import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsChart = ({ data, chartType }) => {
  // Transform the data for charts
  const chartData = useMemo(() => {
    if (chartType === 'location') {
      // Group data by city
      const cityData = [];
      let totalClicks = 0;
      
      Object.entries(data).forEach(([city, hours]) => {
        const cityClicks = Object.values(hours).reduce((sum, clicks) => sum + clicks, 0);
        totalClicks += cityClicks;
        cityData.push({ name: city, value: cityClicks });
      });
      
      // Sort by clicks and calculate percentages
      return cityData
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          percent: ((item.value / totalClicks) * 100).toFixed(1)
        }));
    } else {
      // Group data by hour
      const hourData = {};
      
      Object.values(data).forEach(hours => {
        Object.entries(hours).forEach(([hour, clicks]) => {
          hourData[hour] = (hourData[hour] || 0) + clicks;
        });
      });
      
      // Convert to array and sort by hour
      return Object.entries(hourData)
        .map(([hour, clicks]) => ({
          hour: `${hour}:00`,
          clicks
        }))
        .sort((a, b) => {
          const hourA = parseInt(a.hour.split(':')[0]);
          const hourB = parseInt(b.hour.split(':')[0]);
          return hourA - hourB;
        });
    }
  }, [data, chartType]);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#F44336', '#3F51B5'];

  if (chartType === 'location') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} clicks`, 'Clicks']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="max-h-[300px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {chartData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Time chart
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} clicks`, 'Clicks']} />
          <Bar dataKey="clicks" fill="#3B82F6" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;