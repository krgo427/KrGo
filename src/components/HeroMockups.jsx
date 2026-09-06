import React, { useState } from 'react'

export const SoftwareMockup = () => {
  const [activeFile, setActiveFile] = useState('App.tsx');
  
  return (
    <div className="w-full h-full bg-[#1e1e1e] rounded-3xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl border border-slate-700 select-none">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black/50 text-[#cccccc] text-xs">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div>KrGoTech - {activeFile}</div>
        <div className="flex gap-2 opacity-50">
          <div className="w-3 h-3 border border-current rounded-sm"></div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-[#1e1e1e] hidden sm:flex flex-col text-[#cccccc] text-xs">
          <div className="uppercase p-2 font-bold tracking-widest text-[#858585] text-[10px]">Explorer</div>
          <div className="px-2 py-1 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer"><span className="text-blue-400">▼</span> src</div>
          <div className="px-2 py-1 pl-6 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer"><span className="text-blue-400">▼</span> components</div>
          {['App.tsx', 'Header.tsx', 'Dashboard.tsx'].map(file => (
            <div 
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-2 py-1 pl-10 flex items-center gap-2 cursor-pointer ${activeFile === file ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
            >
              ⚛ {file}
            </div>
          ))}
          <div className="px-2 py-1 pl-6 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer"><span className="text-blue-400">▶</span> utils</div>
          <div className="px-2 py-1 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer">package.json</div>
        </div>
        {/* Editor */}
        <div className="flex-1 flex bg-[#1e1e1e]">
          <div className="w-10 bg-[#1e1e1e] flex flex-col items-center py-2 text-[#858585] text-xs border-r border-[#2d2d2d] flex-shrink-0">
             {[...Array(15)].map((_, i) => <div key={i} className="py-0.5">{i+1}</div>)}
          </div>
          <div className="p-4 overflow-hidden text-xs sm:text-sm leading-relaxed whitespace-pre font-mono flex-1">
            {activeFile === 'App.tsx' && (
              <>
                <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">React</span>, {'{'} <span className="text-[#9cdcfe]">useState</span>, <span className="text-[#9cdcfe]">useEffect</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'react'</span>;<br/>
                <span className="text-[#c586c0]">import</span> {'{'} <span className="text-[#9cdcfe]">fetchAnalytics</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'@/utils/api'</span>;<br/><br/>
                
                <span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">const</span> <span className="text-[#dcdcaa]">KrGoApp</span> = () <span className="text-[#569cd6]">=&gt;</span> {'{'}<br/>
                {'  '}<span className="text-[#569cd6]">const</span> [data, setData] = <span className="text-[#dcdcaa]">useState</span>(<span className="text-[#569cd6]">null</span>);<br/><br/>
                
                {'  '}<span className="text-[#dcdcaa]">useEffect</span>(() <span className="text-[#569cd6]">=&gt;</span> {'{'}<br/>
                {'    '}<span className="text-[#569cd6]">const</span> <span className="text-[#dcdcaa]">init</span> = <span className="text-[#569cd6]">async</span> () <span className="text-[#569cd6]">=&gt;</span> {'{'}<br/>
                {'      '}<span className="text-[#569cd6]">const</span> res = <span className="text-[#c586c0]">await</span> <span className="text-[#dcdcaa]">fetchAnalytics</span>();<br/>
                {'      '}<span className="text-[#dcdcaa]">setData</span>(res);<br/>
                {'    }'};<br/>
                {'    '}<span className="text-[#dcdcaa]">init</span>();<br/>
                {'  }'}, []);<br/><br/>
      
                {'  '}<span className="text-[#c586c0]">return</span> (<br/>
                {'    '}&lt;<span className="text-[#4ec9b0]">DashboardLayout</span> data={'{'}<span className="text-[#9cdcfe]">data</span>{'}'}&gt;<br/>
                {'      '}&lt;<span className="text-[#4ec9b0]">AnalyticsWidget</span> /&gt;<br/>
                {'    '}&lt;/<span className="text-[#4ec9b0]">DashboardLayout</span>&gt;<br/>
                {'  '});<br/>
                {'}'};
              </>
            )}
            {activeFile !== 'App.tsx' && (
              <>
                <span className="text-[#6a9955]">// Content for {activeFile} loaded...</span><br/>
                <span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">const</span> <span className="text-[#dcdcaa]">{activeFile.split('.')[0]}</span> = () <span className="text-[#569cd6]">=&gt;</span> {'{'}<br/>
                {'  '}<span className="text-[#c586c0]">return</span> &lt;<span className="text-[#4ec9b0]">div</span>&gt;<span className="text-[#ce9178]">Loading {activeFile}...</span>&lt;/<span className="text-[#4ec9b0]">div</span>&gt;;<br/>
                {'}'};
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsMockup = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  
  return (
    <div className="w-full h-full bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl overflow-hidden flex shadow-2xl border border-gray-200 dark:border-slate-800">
      {/* Sidebar */}
      <div className="w-16 sm:w-48 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-slate-800 flex flex-col py-6">
         <div className="px-4 mb-8 font-black text-xl text-blue-600 hidden sm:block">Analytics</div>
         <div className="px-4 mb-8 font-black text-xl text-blue-600 sm:hidden text-center">A</div>
         
         <div className="flex-1 flex flex-col gap-2">
           {['Overview', 'Performance', 'Audiences', 'Campaigns', 'Settings'].map((item) => (
              <div 
                key={item} 
                onClick={() => setActiveTab(item)}
                className={`px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-3 cursor-pointer select-none transition-colors ${activeTab === item ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <div className="w-5 h-5 rounded bg-current opacity-75 hidden sm:block"></div>
                <div className="w-5 h-5 rounded bg-current opacity-75 sm:hidden mx-auto"></div>
                <span className="font-semibold text-sm hidden sm:block">{item}</span>
              </div>
           ))}
         </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 bg-slate-50 dark:bg-[#0f172a] overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg sm:text-2xl dark:text-white truncate">{activeTab}</div>
          <select 
            className="px-2 py-1 sm:px-4 sm:py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
             <option>This Year</option>
          </select>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: 'Revenue', value: '$124.5K', trend: '+14.5%', color: 'text-emerald-500' },
            { label: 'Active Users', value: '45.2K', trend: '+8.2%', color: 'text-emerald-500' },
            { label: 'Bounce Rate', value: '24.1%', trend: '-2.4%', color: 'text-rose-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#1e293b] p-3 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1 sm:mb-2 font-medium truncate">{stat.label}</div>
              <div className="text-sm sm:text-lg lg:text-xl font-black dark:text-white mb-1">{stat.value}</div>
              <div className={`text-[10px] sm:text-xs font-bold ${stat.color}`}>{stat.trend}</div>
            </div>
          ))}
        </div>
        
        <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-800 p-4 sm:p-6 shadow-sm relative overflow-hidden flex flex-col">
           <div className="text-sm font-bold text-slate-800 dark:text-white mb-4 z-10 relative">Growth Trend</div>
           <svg className="w-full h-full absolute inset-0 pt-16 sm:pt-20 px-4" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,80 Q10,40 25,60 T50,30 T75,50 T100,10 L100,100 L0,100 Z" fill="rgba(59,130,246,0.15)" />
              <path d="M0,80 Q10,40 25,60 T50,30 T75,50 T100,10" fill="none" stroke="#3b82f6" strokeWidth="3" />
           </svg>
        </div>
      </div>
    </div>
  );
};

export const AIMockup = () => {
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Write a React component that fetches user data from an API and displays it in a responsive grid.' },
    { role: 'ai', text: 'Certainly! Here is a functional React component that uses useEffect to fetch data and Tailwind CSS for the responsive grid layout.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: `As an AI demo, I acknowledge your prompt: "${userMsg}". In a full app, I would process this natively!` }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-slate-800 relative">
      <div className="bg-slate-50 dark:bg-[#111] p-3 sm:p-4 border-b border-gray-200 dark:border-slate-800 font-bold text-slate-800 dark:text-white flex items-center justify-between z-10 shadow-sm">
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <div>
              <div className="text-sm">Nexus AI Assistant</div>
              <div className="text-[10px] text-emerald-500 font-medium">● Online</div>
           </div>
         </div>
      </div>
      
      <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 text-xs sm:text-sm overflow-y-auto bg-white dark:bg-[#0a0a0a] pb-24 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 sm:p-4 rounded-2xl max-w-[85%] sm:max-w-[90%] shadow-sm flex flex-col gap-3 ${msg.role === 'user' ? 'bg-blue-50 dark:bg-blue-900/30 text-slate-800 dark:text-blue-100 rounded-tr-sm self-end border border-blue-100 dark:border-blue-800' : 'bg-white dark:bg-[#111] text-slate-800 dark:text-slate-300 rounded-tl-sm self-start border border-gray-200 dark:border-slate-800'}`}>
            <p>{msg.text}</p>
            {msg.role === 'ai' && i === 1 && (
              <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 w-full">
                 <div className="bg-slate-800 px-3 py-1 text-[10px] text-slate-400 font-mono">UserGrid.jsx</div>
                 <div className="p-3 font-mono text-[10px] sm:text-xs text-slate-300 overflow-x-auto leading-relaxed">
                   <span className="text-purple-400">export default function</span> <span className="text-blue-400">UserGrid</span>() {'{'}<br/>
                   &nbsp;&nbsp;<span className="text-purple-400">const</span> [users, setUsers] = useState([]);<br/><br/>
                   &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-400">div</span> className=<span className="text-green-400">"grid grid-cols-1 md:grid-cols-3 gap-4"</span>&gt;<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}users.map(u =&gt; &lt;<span className="text-blue-400">UserCard</span> key={'{'}u.id{'}'} /&gt;){'}'}<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-400">div</span>&gt;<br/>
                   &nbsp;&nbsp;);<br/>
                   {'}'}
                 </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="bg-white dark:bg-[#111] text-slate-800 dark:text-slate-300 p-4 rounded-2xl rounded-tl-sm self-start border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 bg-white dark:bg-[#111] border-t border-gray-200 dark:border-slate-800">
         <form onSubmit={handleSend} className="relative flex items-center w-full">
           <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Reply to Nexus..."
             className="w-full bg-slate-50 dark:bg-[#0a0a0a] rounded-full pl-4 pr-12 py-2 sm:py-3 text-slate-800 dark:text-white text-xs sm:text-sm border border-gray-200 dark:border-slate-800 outline-none focus:border-blue-500 transition-colors"
           />
           <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white disabled:opacity-50 transition-opacity">
              ↑
           </button>
         </form>
      </div>
    </div>
  );
};

export const CloudMockup = () => {
  const [region, setRegion] = useState('us-east-1');
  
  return (
    <div className="w-full h-full bg-[#0a0f1c] rounded-3xl overflow-hidden flex flex-col p-4 sm:p-6 shadow-2xl border border-[#1e293b] font-sans">
      <div className="flex justify-between items-center mb-6 border-b border-[#1e293b] pb-4">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/20">AWS</div>
           <div>
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="text-white font-bold text-sm bg-transparent outline-none cursor-pointer hover:text-indigo-400 transition-colors"
              >
                <option value="us-east-1">us-east-1 (N. Virginia)</option>
                <option value="eu-west-1">eu-west-1 (Ireland)</option>
                <option value="ap-south-1">ap-south-1 (Mumbai)</option>
              </select>
              <div className="text-slate-400 text-[10px] sm:text-xs">Production Cluster • EKS</div>
           </div>
        </div>
        <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] sm:text-xs font-bold flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> <span className="hidden sm:inline">Healthy</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
         {[
           { label: 'Nodes', val: region === 'us-east-1' ? '24/24' : '12/12', color: 'bg-emerald-500' },
           { label: 'Pods', val: region === 'us-east-1' ? '142' : '68', color: 'bg-blue-500' },
           { label: 'CPU Load', val: region === 'us-east-1' ? '42%' : '28%', color: 'bg-indigo-500' },
           { label: 'Mem', val: region === 'us-east-1' ? '68%' : '51%', color: 'bg-amber-500' }
         ].map((stat, i) => (
           <div key={i} className="bg-[#111827] p-3 rounded-xl border border-[#1e293b] hover:border-indigo-500/30 transition-colors group cursor-default">
              <div className="text-slate-400 text-[10px] mb-1 truncate">{stat.label}</div>
              <div className="text-sm sm:text-lg font-black text-white">{stat.val}</div>
              <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                 <div className={`h-full ${stat.color} group-hover:brightness-125 transition-all`} style={{ width: stat.val.includes('%') ? stat.val : '100%' }}></div>
              </div>
           </div>
         ))}
      </div>
      
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden">
         <div className="bg-[#111827] rounded-xl border border-[#1e293b] p-4 flex flex-col hover:border-indigo-500/30 transition-colors">
            <div className="text-slate-300 text-xs font-bold mb-4">API Latency (ms)</div>
            <div className="flex-1 flex items-end gap-1 group">
               {[20, 25, 40, 30, 22, 60, 25, 20, 22, 28, 45, 30, 25].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-500/60 hover:bg-indigo-400 rounded-t-sm transition-colors cursor-crosshair" style={{ height: `${h}%` }}></div>
               ))}
            </div>
         </div>
         
         <div className="bg-[#111827] rounded-xl border border-[#1e293b] p-4 flex flex-col hover:border-indigo-500/30 transition-colors overflow-y-auto">
            <div className="text-slate-300 text-xs font-bold mb-4">Active Deployments</div>
            <div className="flex flex-col gap-3">
               {['auth-service', 'payment-gateway', 'user-api', 'notification-worker'].map((svc, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] sm:text-xs p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
                     <div className="text-slate-300 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> <span className="truncate max-w-[100px] sm:max-w-none">{svc}</span></div>
                     <div className="text-slate-500">v1.4.{i}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
