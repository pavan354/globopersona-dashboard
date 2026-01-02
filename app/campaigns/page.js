'use client'; 
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CampaignsPage() {
  const initialData = [
    { id: 101, name: 'Spring Onboarding', status: 'Active', sent: '5,400', openRate: '42.5%', lastUpdated: '2 hours ago' },
    { id: 102, name: 'Winback Q1', status: 'Paused', sent: '12,102', openRate: '31.2%', lastUpdated: 'Yesterday' },
  ];

  const [campaigns, setCampaigns] = useState(initialData);

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('myCampaigns') || '[]');
    if (savedCampaigns.length > 0) {
      setCampaigns([...savedCampaigns, ...initialData]);
    }
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen pl-28">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Campaigns</h2>
        <Link href="/create" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
          <Plus size={18} /> Create New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Sent</th>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Open Rate</th>
              <th className="p-4 text-sm font-semibold text-gray-500 uppercase">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((c, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900">{c.name}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>{c.status.toUpperCase()}</span></td>
                <td className="p-4 text-gray-700">{c.sent}</td>
                <td className="p-4 text-gray-700">{c.openRate}</td>
                <td className="p-4 text-gray-500">{c.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}