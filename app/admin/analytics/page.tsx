"use client";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";

const TRAFFIC = [{d:"Mon",visits:142},{d:"Tue",visits:98},{d:"Wed",visits:187},{d:"Thu",visits:156},{d:"Fri",visits:243},{d:"Sat",visits:312},{d:"Sun",visits:289}];
const SOURCES = [{name:"Google",value:42,color:"#6366f1"},{name:"Instagram",value:28,color:"#ec4899"},{name:"WhatsApp",value:15,color:"#25d366"},{name:"Referral",value:10,color:"#f59e0b"},{name:"Direct",value:5,color:"#64748b"}];
const CONV = [{stage:"Website Visits",count:3240},{stage:"Inquiries",count:287},{stage:"Quoted",count:156},{stage:"Booked",count:89},{stage:"Repeat",count:34}];

export default function AnalyticsPage(){return(
  <div className="space-y-5 pb-8">
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Team</p>
      <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Analytics</h1>
      <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>Traffic, conversions and lead sources</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[{l:"Website Visits",v:"3,240",c:"#6366f1"},{l:"Total Leads",v:"287",c:"#22d3ee"},{l:"Conversion Rate",v:"31%",c:"#c9a96e"},{l:"Avg Response",v:"2.4h",c:"#34d399"}].map(s=>(
        <div key={s.l} className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <p className="text-[11px] uppercase tracking-wide mb-2" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>{s.l}</p>
          <p className="text-2xl font-light" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",color:s.c}}>{s.v}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2 rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Website Traffic — This Week</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={TRAFFIC}>
            <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="d" tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:"rgba(255,255,255,0.25)",fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"#0f1020",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",fontFamily:"var(--font-inter)",fontSize:"12px"}}/>
            <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={2} fill="url(#tg)" dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Lead Sources</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart><Pie data={SOURCES} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
            {SOURCES.map((e,i)=><Cell key={i} fill={e.color}/>)}
          </Pie><Tooltip contentStyle={{background:"#0f1020",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",fontFamily:"var(--font-inter)",fontSize:"12px"}}/></PieChart>
        </ResponsiveContainer>
        <div className="space-y-1.5 mt-2">
          {SOURCES.map(s=><div key={s.name} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{background:s.color}}/><span className="text-[12px]" style={{color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}>{s.name}</span></div><span className="text-[12px] font-medium" style={{color:"rgba(255,255,255,0.7)",fontFamily:"var(--font-inter)"}}>{s.value}%</span></div>)}
        </div>
      </div>
    </div>
    <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
      <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Conversion Funnel</h3>
      <div className="space-y-2">
        {CONV.map((s,i)=>{const pct=Math.round(s.count/3240*100);return(
          <div key={s.stage} className="flex items-center gap-4">
            <div className="w-32 text-[12px] text-right" style={{color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}>{s.stage}</div>
            <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{background:"rgba(255,255,255,0.04)"}}>
              <div className="h-full rounded-lg flex items-center px-2" style={{width:`${Math.max(pct,3)}%`,background:`rgba(201,169,110,${0.15+i*0.05})`}}>
                <span className="text-[11px] font-medium text-white" style={{fontFamily:"var(--font-inter)"}}>{s.count}</span>
              </div>
            </div>
            <div className="w-10 text-[11px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{pct}%</div>
          </div>
        );})}
      </div>
    </div>
  </div>
);}
