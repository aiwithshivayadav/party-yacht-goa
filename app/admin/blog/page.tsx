"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Search } from "lucide-react";

const POSTS = [
  {id:"1",title:"Top 5 Reasons to Charter a Yacht in Goa",status:"PUBLISHED",views:1842,date:"2025-04-10",category:"Travel"},
  {id:"2",title:"How to Plan the Perfect Sunset Cruise in Goa",status:"PUBLISHED",views:1204,date:"2025-04-22",category:"Tips"},
  {id:"3",title:"Bachelor & Bachelorette Parties on Goa's Waters",status:"PUBLISHED",views:987,date:"2025-05-01",category:"Events"},
  {id:"4",title:"Corporate Team Events: Why a Yacht Works",status:"DRAFT",views:0,date:"2025-05-12",category:"Corporate"},
  {id:"5",title:"The Ultimate Yacht Proposal Guide — Goa Edition",status:"DRAFT",views:0,date:"2025-05-13",category:"Romance"},
];
const SC: Record<string,{bg:string,text:string}> = {PUBLISHED:{bg:"rgba(16,185,129,0.15)",text:"#34d399"},DRAFT:{bg:"rgba(100,116,139,0.15)",text:"#94a3b8"}};

export default function BlogPage(){
  const [search,setSearch]=useState("");
  const filtered=POSTS.filter(p=>!search||p.title.toLowerCase().includes(search.toLowerCase()));
  return(
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Content</p>
          <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Blog Manager</h1>
          <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>{POSTS.filter(p=>p.status==="PUBLISHED").length} published · {POSTS.filter(p=>p.status==="DRAFT").length} drafts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium" style={{background:"rgba(201,169,110,0.15)",border:"1px solid rgba(201,169,110,0.3)",color:"#c9a96e",fontFamily:"var(--font-inter)"}}><Plus size={14}/> New Post</button>
      </div>
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"rgba(255,255,255,0.25)"}}/>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)"}}/>
      </div>
      <div className="space-y-3">
        {filtered.map(p=>(
          <div key={p.id} className="group flex items-center gap-4 p-4 rounded-2xl transition-all" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{background:SC[p.status].bg,color:SC[p.status].text,fontFamily:"var(--font-inter)"}}>{p.status}</span>
                <span className="text-[11px]" style={{color:"rgba(255,255,255,0.25)",fontFamily:"var(--font-inter)"}}>{p.category}</span>
              </div>
              <h3 className="text-white font-medium truncate" style={{fontFamily:"var(--font-inter)",fontSize:"14px"}}>{p.title}</h3>
              <p className="text-[11px] mt-1" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{p.date} · {p.views.toLocaleString()} views</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"><Eye size={13} style={{color:"#c9a96e"}}/></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"><Edit2 size={13} style={{color:"rgba(255,255,255,0.4)"}}/></button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10"><Trash2 size={13} style={{color:"#f87171"}}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
