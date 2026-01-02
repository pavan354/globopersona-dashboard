import { BarChart2 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen pl-28 flex flex-col items-center justify-center text-center">
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
            <BarChart2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Deep Analytics</h2>
        <p className="text-gray-500">Advanced reporting and ROI tracking features are coming soon.</p>
      </div>
    </div>
  );
}