import { ArrowUp, ArrowDown } from 'lucide-react';

export default function StatCard({ icon: Icon, title, value, label, trend, trendValue, iconColor }) {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-lg ${iconColor} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${iconColor.replace('bg-', 'text-')}`} />
        </div>
        
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {trendValue}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}