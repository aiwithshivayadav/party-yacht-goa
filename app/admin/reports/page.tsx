"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { formatCurrency } from "@/lib/utils";

const MONTHLY = [{m:"Jan",rev:421000,bk:33},{m:"Feb",rev:356000,bk:27},{m:"Mar",rev:298000,bk:23},{m:"Apr",rev:445000,bk:34},{m:"May",rev:512000,bk:39}];
const YACHTS_REV = [{name:"Sunset 42",rev:1824000},{name:"Orca",rev:1488000},{name:"Polaris",rev:1296000},{name:"Prestige 36",rev:1056000},{name:"Malini",rev:864000},{name:"MV Krishna",rev:576000}];

export default function ReportsPage(){
  return(
    <div className="space-y-5 pb-8">
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Finance</p>
        <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Reports</h1>
        <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>Financial summary and performance metrics</p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{l:"Total Revenue",v:"₹38.4L",c:"#c9a96e"},{l:"This Month",v:"₹5.12L",c:"#34d399"},{l:"Total Bookings",v:"287",c:"#6366f1"},{l:"Avg per Trip",v:"₹45,200",c:"#22d3ee"}].map(s=>(
          <div key={s.l} className="rounded-xl p-4" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <p className="text-[11px] uppercase tracking-wide mb-2" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>{s.l}</p>
            <p className="text-2xl font-light text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",color:s.c}}>{s.v}</p>
          </div>
        ))}
      </div>
      {/* Revenue Chart */}
      <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY}>
            <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c9a96e" stopOpacity={0.25}/><stop offset="95%" stopColor="#c9a96e" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="m" tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:"rgba(255,255,255,0.25)",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/100000).toFixed(1)}L`}/>
            <Tooltip contentStyle={{background:"#0f1020",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",fontFamily:"var(--font-inter)",fontSize:"12px"}} formatter={(v:any)=>[formatCurrency(v),"Revenue"]}/>
            <Area type="monotone" dataKey="rev" stroke="#c9a96e" strokeWidth={2} fill="url(#rg)" dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Yacht Revenue */}
      <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Revenue by Yacht</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={YACHTS_REV} layout="vertical" margin={{left:20}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false}/>
            <XAxis type="number" tick={{fill:"rgba(255,255,255,0.25)",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/100000).toFixed(1)}L`}/>
            <YAxis type="category" dataKey="name" tick={{fill:"rgba(255,255,255,0.4)",fontSize:11}} axisLine={false} tickLine={false} width={80}/>
            <Tooltip contentStyle={{background:"#0f1020",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",fontFamily:"var(--font-inter)",fontSize:"12px"}} formatter={(v:any)=>[formatCurrency(v),"Revenue"]}/>
            <Bar dataKey="rev" fill="#c9a96e" fillOpacity={0.7} radius={[0,4,4,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
