import React from 'react'

export const SoftwareMockup = () => (
  <div className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl border border-slate-700">
    <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
      <div className="ml-4 text-slate-400 text-xs">app.tsx - KrGo Tech</div>
    </div>
    <div className="flex-1 flex overflow-hidden">
      <div className="w-12 bg-slate-800/50 flex flex-col items-center py-4 gap-2 text-slate-500 border-r border-slate-700 select-none">
         {[...Array(15)].map((_, i) => <div key={i}>{i+1}</div>)}
      </div>
      <div className="p-4 text-slate-300 overflow-hidden leading-relaxed text-xs sm:text-sm">
        <div><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</div>
        <br/>
        <div><span className="text-blue-400">const</span> <span className="text-yellow-200">KrGoApp</span> = () =&gt; {'{'}</div>
        <div className="ml-4"><span className="text-blue-400">const</span> analytics = <span className="text-yellow-200">useAnalytics</span>();</div>
        <div className="ml-4"><span className="text-purple-400">return</span> (</div>
        <div className="ml-8 text-cyan-400">&lt;div className="app-container"&gt;</div>
        <div className="ml-12 text-slate-300">Building scalable software solutions...</div>
        <div className="ml-8 text-cyan-400">&lt;/div&gt;</div>
        <div className="ml-4">);</div>
        <div>{'}'};</div>
        <br/>
        <div><span className="text-purple-400">export default</span> KrGoApp;</div>
      </div>
    </div>
  </div>
)

export const AnalyticsMockup = () => (
  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col p-4 sm:p-6 shadow-2xl border border-gray-200 dark:border-slate-700">
    <div className="flex justify-between items-center mb-6">
      <div className="font-bold text-lg dark:text-white">Revenue Dashboard</div>
      <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">+24.5%</div>
    </div>
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
      {[124500, 8420, 98.2].map((val, i) => (
        <div key={i} className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-slate-700 flex flex-col justify-center items-center text-center">
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1">Metric {i+1}</div>
          <div className="text-sm sm:text-xl font-black dark:text-white">{val}</div>
        </div>
      ))}
    </div>
    <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 flex items-end gap-1 sm:gap-2">
       {[40, 70, 45, 90, 65, 100, 80, 55, 75, 60].map((h, i) => (
         <div key={i} className="flex-1 bg-blue-500 rounded-t-sm transition-all duration-1000 shadow-sm" style={{ height: `${h}%` }}></div>
       ))}
    </div>
  </div>
)

export const AIMockup = () => (
  <div className="w-full h-full bg-slate-950 rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-slate-800 relative">
    <div className="bg-slate-900 p-4 border-b border-slate-800 font-bold text-white flex items-center gap-2">
       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> AI Chat Assistant
    </div>
    <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 text-xs sm:text-sm overflow-hidden">
      <div className="bg-slate-800 text-white p-3 sm:p-4 rounded-2xl rounded-tl-sm self-start max-w-[80%] border border-slate-700 shadow-lg">
        Hello! I'm your AI assistant. How can I automate your workflow today?
      </div>
      <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-2xl rounded-tr-sm self-end max-w-[80%] shadow-lg">
        Can you analyze our recent deployment data and suggest improvements?
      </div>
      <div className="bg-slate-800 text-white p-3 sm:p-4 rounded-2xl rounded-tl-sm self-start max-w-[80%] border border-slate-700 shadow-lg">
        <div className="flex gap-2 items-center text-blue-400 mb-2 font-medium">
           <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Analyzing data...
        </div>
        <div className="h-1.5 w-32 bg-slate-700 rounded-full overflow-hidden">
           <div className="h-full bg-blue-500 w-2/3"></div>
        </div>
      </div>
    </div>
    <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
       <div className="bg-slate-800 rounded-full px-4 py-2 sm:py-3 text-slate-400 text-xs sm:text-sm border border-slate-700">Type your prompt here...</div>
    </div>
  </div>
)

export const CloudMockup = () => (
  <div className="w-full h-full bg-[#0a0f1c] rounded-3xl overflow-hidden flex flex-col p-4 sm:p-6 shadow-2xl border border-[#1e293b]">
    <div className="flex justify-between items-center mb-6 text-white font-bold">
      <div>Cluster Status</div>
      <div className="text-emerald-400 text-xs sm:text-sm flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> All Systems Operational</div>
    </div>
    <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6">
       <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-[#374151]">
          <div className="text-slate-400 text-[10px] sm:text-xs mb-2">CPU Usage</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[45%]"></div></div>
          <div className="text-right text-[10px] sm:text-xs mt-1 text-white">45%</div>
       </div>
       <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-[#374151]">
          <div className="text-slate-400 text-[10px] sm:text-xs mb-2">Memory Usage</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[72%]"></div></div>
          <div className="text-right text-[10px] sm:text-xs mt-1 text-white">72%</div>
       </div>
    </div>
    <div className="flex-1 bg-[#111827] rounded-xl border border-[#374151] p-4 relative overflow-hidden flex flex-col">
       <div className="text-slate-400 text-xs mb-4 z-10">Network Traffic</div>
       <svg className="w-full h-full absolute inset-0 pt-8" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,100 L0,50 Q25,20 50,60 T100,30 L100,100 Z" fill="rgba(59,130,246,0.15)" />
          <path d="M0,50 Q25,20 50,60 T100,30" fill="none" stroke="#3b82f6" strokeWidth="3" />
       </svg>
    </div>
  </div>
)
