'use client';
import { useState } from 'react';
import { Send, Mail, MousePointer, UserCheck, Sparkles } from 'lucide-react';
import StatCard from '@/components/StatCard';

export default function Dashboard() {
  // Chat State
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello John! I've analyzed your recent segments. Your \"SaaS Founders\" audience is highly active. Shall we draft a campaign?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to call the Node.js API
  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Call the Node.js API Route
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();

      // 3. Add AI Response
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Error calling API:", error);
      // Fallback if API fails
      setMessages(prev => [...prev, { role: 'ai', text: "I received your message. I'm processing that for your dashboard!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { icon: Send, iconColor: 'bg-purple-100 text-purple-600', value: '128', label: 'Total Campaigns', trend: 'up', trendValue: '12%' },
    { icon: Mail, iconColor: 'bg-emerald-100 text-emerald-600', value: '45.2k', label: 'Emails Sent', trend: 'up', trendValue: '8.4%' },
    { icon: MousePointer, iconColor: 'bg-amber-100 text-amber-600', value: '24.8%', label: 'Click Rate', trend: 'down', trendValue: '2.1%' },
    { icon: UserCheck, iconColor: 'bg-rose-100 text-rose-600', value: '1,402', label: 'Conversions', trend: 'up', trendValue: '18%' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen pl-28"> 
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold">JD</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* AI Chat Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
        <div className="bg-purple-600 p-4 flex items-center gap-2 text-white font-semibold">
            <Sparkles size={20} /> Globopersona AI
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-xl shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 text-gray-400 italic">
                        Thinking...
                    </div>
                </div>
            )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
            <input 
                type="text" 
                placeholder="Type a command..." 
                className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
                onClick={handleSend}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
}