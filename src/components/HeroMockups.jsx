import React from 'react'

export const SoftwareMockup = () => (
  <div className="w-full h-full bg-[#1e1e1e] rounded-3xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl border border-slate-700">
    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black/50 text-[#cccccc] text-xs">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
      </div>
      <div>KrGoTech - App.tsx</div>
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
        <div className="px-2 py-1 pl-10 flex items-center gap-2 bg-[#37373d] text-white">⚛ App.tsx</div>
        <div className="px-2 py-1 pl-10 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer">⚛ Header.tsx</div>
        <div className="px-2 py-1 pl-10 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer">⚛ Dashboard.tsx</div>
        <div className="px-2 py-1 pl-6 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer"><span className="text-blue-400">▶</span> utils</div>
        <div className="px-2 py-1 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer">package.json</div>
      </div>
      {/* Editor */}
      <div className="flex-1 flex bg-[#1e1e1e]">
        <div className="w-10 bg-[#1e1e1e] flex flex-col items-center py-2 text-[#858585] text-xs select-none border-r border-[#2d2d2d]">
           {[...Array(15)].map((_, i) => <div key={i} className="py-0.5">{i+1}</div>)}
        </div>
        <div className="p-4 overflow-hidden text-xs sm:text-sm leading-relaxed whitespace-pre font-mono">
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
        </div>
      </div>
    </div>
  </div>
)

export const AnalyticsMockup = () => (
  <div className="w-full h-full bg-[#f8fafc] dark:bg-[#0f172a] rounded-3xl overflow-hidden flex shadow-2xl border border-gray-200 dark:border-slate-800">
    {/* Sidebar */}
    <div className="w-16 sm:w-48 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-slate-800 flex flex-col py-6">
       <div className="px-4 mb-8 font-black text-xl text-blue-600 hidden sm:block">Analytics</div>
       <div className="px-4 mb-8 font-black text-xl text-blue-600 sm:hidden text-center">A</div>
       
       <div className="flex-1 flex flex-col gap-2">
         {['Overview', 'Performance', 'Audiences', 'Campaigns', 'Settings'].map((item, i) => (
            <div key={i} className={`px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-3 cursor-pointer ${i === 0 ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <div className="w-5 h-5 rounded bg-current opacity-75 hidden sm:block"></div>
              <div className="w-5 h-5 rounded bg-current opacity-75 sm:hidden mx-auto"></div>
              <span className="font-semibold text-sm hidden sm:block">{item}</span>
            </div>
         ))}
       </div>
    </div>
    {/* Main Content */}
    <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 bg-slate-50 dark:bg-[#0f172a]">
      <div className="flex justify-between items-center">
        <div className="font-bold text-lg sm:text-2xl dark:text-white">Performance Overview</div>
        <div className="px-3 py-1 sm:px-4 sm:py-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">Last 30 Days ▾</div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Total Revenue', value: '$124,500', trend: '+14.5%', color: 'text-emerald-500' },
          { label: 'Active Users', value: '45.2K', trend: '+8.2%', color: 'text-emerald-500' },
          { label: 'Bounce Rate', value: '24.1%', trend: '-2.4%', color: 'text-rose-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1e293b] p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">{stat.label}</div>
            <div className="text-sm sm:text-2xl font-black dark:text-white mb-1">{stat.value}</div>
            <div className={`text-[10px] sm:text-xs font-bold ${stat.color}`}>{stat.trend}</div>
          </div>
        ))}
      </div>
      
      <div className="flex-1 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-800 p-4 sm:p-6 shadow-sm relative overflow-hidden flex flex-col">
         <div className="text-sm font-bold text-slate-800 dark:text-white mb-4">Revenue Growth</div>
         <svg className="w-full h-full absolute inset-0 pt-16 sm:pt-20 px-4" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,80 Q10,40 25,60 T50,30 T75,50 T100,10 L100,100 L0,100 Z" fill="rgba(59,130,246,0.15)" />
            <path d="M0,80 Q10,40 25,60 T50,30 T75,50 T100,10" fill="none" stroke="#3b82f6" strokeWidth="3" />
         </svg>
      </div>
    </div>
  </div>
)

export const AIMockup = () => (
  <div className="w-full h-full bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-slate-800 relative">
    <div className="bg-slate-50 dark:bg-[#111] p-3 sm:p-4 border-b border-gray-200 dark:border-slate-800 font-bold text-slate-800 dark:text-white flex items-center justify-between">
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
    
    <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 text-xs sm:text-sm overflow-hidden bg-white dark:bg-[#0a0a0a]">
      {/* User Message */}
      <div className="bg-blue-50 dark:bg-blue-900/30 text-slate-800 dark:text-blue-100 p-3 sm:p-4 rounded-2xl rounded-tr-sm self-end max-w-[85%] border border-blue-100 dark:border-blue-800">
        Write a React component that fetches user data from an API and displays it in a responsive grid.
      </div>
      
      {/* AI Message */}
      <div className="bg-white dark:bg-[#111] text-slate-800 dark:text-slate-300 p-3 sm:p-4 rounded-2xl rounded-tl-sm self-start max-w-[90%] border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <p>Certainly! Here is a functional React component that uses <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600 dark:text-blue-400">useEffect</code> to fetch data and Tailwind CSS for the responsive grid layout.</p>
        
        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
           <div className="bg-slate-800 px-3 py-1 text-[10px] text-slate-400 font-mono">UserGrid.jsx</div>
           <div className="p-3 font-mono text-[10px] sm:text-xs text-slate-300 overflow-hidden leading-relaxed">
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
      </div>
    </div>
    
    <div className="p-3 sm:p-4 bg-white dark:bg-[#111] border-t border-gray-200 dark:border-slate-800">
       <div className="bg-slate-50 dark:bg-[#0a0a0a] rounded-full px-4 py-2 sm:py-3 text-slate-400 text-xs sm:text-sm border border-gray-200 dark:border-slate-800 flex justify-between items-center">
         <span>Reply to Nexus...</span>
         <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">↑</div>
       </div>
    </div>
  </div>
)

export const CloudMockup = () => (
  <div className="w-full h-full bg-[#0a0f1c] rounded-3xl overflow-hidden flex flex-col p-4 sm:p-6 shadow-2xl border border-[#1e293b] font-sans">
    <div className="flex justify-between items-center mb-6 border-b border-[#1e293b] pb-4">
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">AWS</div>
         <div>
            <div className="text-white font-bold text-sm">us-east-1 (N. Virginia)</div>
            <div className="text-slate-400 text-xs">Production Cluster • EKS</div>
         </div>
      </div>
      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-bold flex items-center gap-2">
         <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Healthy
      </div>
    </div>
    
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
       {[
         { label: 'Nodes', val: '24/24', color: 'bg-emerald-500' },
         { label: 'Pods', val: '142', color: 'bg-blue-500' },
         { label: 'CPU Load', val: '42%', color: 'bg-indigo-500' },
         { label: 'Mem', val: '68%', color: 'bg-amber-500' }
       ].map((stat, i) => (
         <div key={i} className="bg-[#111827] p-3 rounded-xl border border-[#1e293b]">
            <div className="text-slate-400 text-[10px] mb-1">{stat.label}</div>
            <div className="text-lg font-black text-white">{stat.val}</div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
               <div className={`h-full ${stat.color}`} style={{ width: stat.val.includes('%') ? stat.val : '100%' }}></div>
            </div>
         </div>
       ))}
    </div>
    
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
       <div className="bg-[#111827] rounded-xl border border-[#1e293b] p-4 flex flex-col">
          <div className="text-slate-300 text-xs font-bold mb-4">API Latency (ms)</div>
          <div className="flex-1 flex items-end gap-1">
             {[20, 25, 40, 30, 22, 60, 25, 20, 22, 28, 45, 30, 25].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-500/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
             ))}
          </div>
       </div>
       
       <div className="bg-[#111827] rounded-xl border border-[#1e293b] p-4 flex flex-col">
          <div className="text-slate-300 text-xs font-bold mb-4">Active Deployments</div>
          <div className="flex flex-col gap-2">
             {['auth-service', 'payment-gateway', 'user-api'].map((svc, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] sm:text-xs">
                   <div className="text-slate-300 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> {svc}</div>
                   <div className="text-slate-500">v1.4.{i}</div>
                </div>
             ))}
          </div>
       </div>
    </div>
  </div>
)
