"use client";
import { useState } from "react";
import { Download, Search, FileText, Eye } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

const INVOICES = [
  {id:"1",code:"PYG-INV-2025-0041",booking:"PYG-B-2025-0041",customer:"Aisha Khan",yacht:"Sunset 42",date:"2025-05-14",amount:65000,status:"PAID",due:"2025-05-14"},
  {id:"2",code:"PYG-INV-2025-0042",booking:"PYG-B-2025-0042",customer:"Rohan Dev",yacht:"Orca",date:"2025-05-15",amount:45000,status:"PARTIAL",due:"2025-05-15"},
  {id:"3",code:"PYG-INV-2025-0043",booking:"PYG-B-2025-0043",customer:"Meena Gupta",yacht:"Polaris",date:"2025-05-15",amount:38000,status:"PENDING",due:"2025-05-15"},
  {id:"4",code:"PYG-INV-2025-0044",booking:"PYG-B-2025-0044",customer:"Sanjay Rao",yacht:"MV Krishna",date:"2025-05-16",amount:120000,status:"PARTIAL",due:"2025-05-16"},
  {id:"5",code:"PYG-INV-2025-0040",booking:"PYG-B-2025-0040",customer:"Divya Shah",yacht:"Prestige 36",date:"2025-05-10",amount:52000,status:"PAID",due:"2025-05-10"},
];

export default function InvoicesPage(){
  const [search,setSearch]=useState("");
  const filtered=INVOICES.filter(inv=>!search||(inv.customer+inv.code+inv.booking).toLowerCase().includes(search.toLowerCase()));
  return(
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Finance</p>
          <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Invoices</h1>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}><Download size={13}/> Export All</button>
      </div>
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"rgba(255,255,255,0.25)"}}/>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)"}}/>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              {["Invoice","Booking","Customer / Yacht","Date","Due","Amount","Status",""].map(h=><th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.2em] uppercase" style={{color:"rgba(255,255,255,0.25)",fontFamily:"var(--font-inter)"}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map((inv)=>(
                <tr key={inv.id} className="group" style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><FileText size={13} style={{color:"#c9a96e"}}/><span className="text-[13px] font-semibold" style={{color:"#c9a96e",fontFamily:"var(--font-inter)"}}>{inv.code}</span></div></td>
                  <td className="px-5 py-4"><span className="text-[12px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{inv.booking}</span></td>
                  <td className="px-5 py-4"><div className="text-[13px] text-white" style={{fontFamily:"var(--font-inter)"}}>{inv.customer}</div><div className="text-[11px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{inv.yacht}</div></td>
                  <td className="px-5 py-4"><span className="text-[12px]" style={{color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}>{formatDate(inv.date)}</span></td>
                  <td className="px-5 py-4"><span className="text-[12px]" style={{color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}>{formatDate(inv.due)}</span></td>
                  <td className="px-5 py-4"><span className="text-[14px] font-semibold" style={{color:"rgba(255,255,255,0.9)",fontFamily:"var(--font-inter)"}}>{formatCurrency(inv.amount)}</span></td>
                  <td className="px-5 py-4"><StatusBadge status={inv.status} type="payment"/></td>
                  <td className="px-5 py-4"><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Eye size={13} style={{color:"#c9a96e"}}/></button><button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Download size={13} style={{color:"rgba(255,255,255,0.4)"}}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/[0.05]"><span className="text-[12px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{filtered.length} invoices · Total: {formatCurrency(filtered.reduce((s,i)=>s+i.amount,0))}</span></div>
      </div>
    </div>
  );
}
