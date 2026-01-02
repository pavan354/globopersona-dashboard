'use client';
import { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Send, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const emailTemplates = {
  1: {
    to: "Alex Rivera",
    role: "CTO @ NexaGen",
    subject: "Question about NexaGen's infrastructure",
    body: "Hi Alex, I saw that NexaGen recently expanded your engineering team by 40%. Congrats on the growth! With that scale, I was curious if infrastructure monitoring has become a bottleneck for your CTO office."
  },
  2: {
    to: "Sarah Chen",
    role: "VP Product @ Orbit",
    subject: "Question about Orbit's product scaling",
    body: "Hi Sarah, I noticed Orbit is launching a new vertical. We've helped teams like yours reduce overhead by 30%. Would you be open to a quick chat next Tuesday?"
  }
};

export default function CreateCampaign() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', subject: '', strategy: '' });
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [emailContent, setEmailContent] = useState(emailTemplates[1].body);

  useEffect(() => {
    setEmailContent(emailTemplates[selectedContactId].body);
  }, [selectedContactId]);

  const strategies = [
    { title: 'The Problem Solver', desc: 'Focuses on a specific pain point and offers immediate value.' },
    { title: 'The Social Proof', desc: 'Leverages case studies and testimonials from similar companies.' },
    { title: 'The Research First', desc: "Uses gathered data to show you've done your homework." },
    { title: 'The Direct Connect', desc: 'Concise, professional, and aims straight for a call.' },
  ];

  const handleLaunch = () => {
    setIsLaunching(true);

    // --- NEW: Create the campaign object ---
    const newCampaign = {
      id: Date.now(), // Generates a unique ID
      name: formData.name || "New Campaign",
      status: "Active",
      sent: "0",
      openRate: "0%",
      lastUpdated: "Just now"
    };

    // --- NEW: Save to Local Storage ---
    // 1. Get existing campaigns (or empty list)
    const existingCampaigns = JSON.parse(localStorage.getItem('myCampaigns') || '[]');
    // 2. Add the new one to the front
    localStorage.setItem('myCampaigns', JSON.stringify([newCampaign, ...existingCampaigns]));

    setTimeout(() => {
      // alert("Campaign Launched Successfully!"); // Optional: Removed alert for smoother flow
      router.push('/campaigns');
    }, 1500);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen pl-28">
      <div className="max-w-4xl mx-auto">
        
        {/* Stepper Header */}
        <div className="flex justify-between max-w-xl mx-auto mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0 -translate-y-1/2"></div>
          {[1, 2, 3].map((num) => (
            <div key={num} className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
                step >= num 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-500'
              }`}>
                {step > num ? <Check size={16} /> : num}
              </div>
              <span className={`text-sm font-medium ${step >= num ? 'text-purple-600' : 'text-gray-500'}`}>
                {num === 1 ? 'Setup' : num === 2 ? 'Approach' : 'Preview'}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[500px]">
          
          {/* STEP 1: SETUP */}
          {step === 1 && (
            <div className="space-y-6 max-w-lg mx-auto py-8">
              <h3 className="text-xl font-bold text-gray-800">Campaign Details</h3>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Campaign Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="e.g., Enterprise Outreach 2024"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Subject Line</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="The future of workspace intelligence"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: APPROACH */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-8">Choose Outreach Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strategies.map((s) => (
                  <div
                    key={s.title}
                    onClick={() => setFormData({ ...formData, strategy: s.title })}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:-translate-y-1 ${
                      formData.strategy === s.title 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{s.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="text-gray-500 font-medium hover:text-gray-800 px-4">Back</button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!formData.strategy}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  Continue to Preview
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PREVIEW */}
          {step === 3 && (
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">Email Preview</h3>
              <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[350px]">
                
                {/* Contact List */}
                <div className="w-full md:w-1/3 border border-gray-200 rounded-xl overflow-hidden bg-white">
                  {[1, 2].map((id) => (
                    <div 
                      key={id}
                      onClick={() => {
                        setSelectedContactId(id);
                        setEmailContent(emailTemplates[id].body);
                      }}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                        selectedContactId === id ? 'bg-purple-50 border-l-4 border-l-purple-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="font-bold text-gray-800">{emailTemplates[id].to}</div>
                      <div className="text-xs text-gray-500">{emailTemplates[id].role}</div>
                    </div>
                  ))}
                </div>

                {/* Email Editor */}
                <div className="w-full md:w-2/3 border border-gray-200 rounded-xl p-6 bg-white flex flex-col">
                  <div className="border-b border-gray-100 pb-4 mb-4 text-sm text-gray-500">
                    To: <span className="font-bold text-gray-800">{emailTemplates[selectedContactId].to}</span>
                  </div>
                  <div className="mb-4 text-sm font-medium text-gray-700">
                    Subject: {emailTemplates[selectedContactId].subject}
                  </div>
                  <textarea 
                    className="w-full flex-1 resize-none outline-none text-gray-700 leading-relaxed"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="text-gray-500 font-medium hover:text-gray-800 px-4">Adjust Approach</button>
                <button 
                  onClick={handleLaunch}
                  disabled={isLaunching}
                  className="bg-purple-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-purple-700 flex items-center gap-2 transition-all shadow-lg shadow-purple-200"
                >
                  {isLaunching ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Launching...
                    </>
                  ) : (
                    <>Launch Campaign</>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}