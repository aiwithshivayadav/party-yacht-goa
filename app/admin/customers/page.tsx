"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, MessageCircle, Phone, Mail, Eye, Star, Calendar } from "lucide-react";

const CUSTOMERS = [
  {id:"1",name:"Aisha Khan",email:"aisha.k@gmail.com",phone:"+91 98765 43210",bookings:3,spent:185000,lastBooking:"2025-05-14",rating:5,avatar:"A"},
  {id:"2",name:"Rohan Dev",email:"rohan.d@gmail.com",phone:"+91 87654 32109",bookings:2,spent:95000,lastBooking:"2025-05-15",rating:5,avatar:"R"},
  {id:"3",name:"Divya Shah",email:"divya.s@gmail.com",phone:"+91 54321 09876",bookings:4,spent:210000,lastBooking:"2025-05-10",rating:5,avatar:"D"},
  {id:"4",name:"Karan Malhotra",email:"karan.m@gmail.com",phone:"+91 43210 98765",bookings:1,spent:95000,lastBooking:"2025-05-08",rating:4,avatar:"K"},
  {id:"5",name:"Sanjay Rao",email:"sanjay.r@outlook.com",phone:"+91 65432 10987",bookings:2,spent:180000,lastBooking:"2025-05-16",rating:5,avatar:"S"},
  {id:"6",name:"Pooja Nair",email:"pooja.n@yahoo.com",phone:"+91 32109 87654",bookings:1,spent:0,lastBooking:"2025-05-12",rating:3,avatar:"P"},
];
const fmt=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);

export default function CustomersPage() {
  const [search,setSearch]=useState("");
  const filtered=CUSTOMERS.filter(c=>!search||(c.name+c.email+c.phone).toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>CRM</p>
          <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Customers</h1>
          <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>{CUSTOMERS.length} total customers</p>
        </div>
      </div>
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:"rgba(255,255,255,0.25)"}}/>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)"}}/>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              {["Customer","Contact","Bookings","Total Spent","Last Visit","Rating",""].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.2em] uppercase" style={{color:"rgba(255,255,255,0.25)",fontFamily:"var(--font-inter)"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((c,i)=>(
                <tr key={c.id} className="group" style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{background:"rgba(201,169,110,0.15)",color:"#c9a96e",fontFamily:"var(--font-inter)"}}>{c.avatar}</div>
                      <div>
                        <div className="text-[13px] font-medium text-white" style={{fontFamily:"var(--font-inter)"}}>{c.name}</div>
                        <div className="text-[11px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><div className="text-[12px]" style={{color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}>{c.phone}</div></td>
                  <td className="px-5 py-4"><div className="text-[13px] font-medium" style={{color:"#c9a96e",fontFamily:"var(--font-inter)"}}>{c.bookings}</div></td>
                  <td className="px-5 py-4"><div className="text-[13px] font-medium" style={{color:"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)"}}>{fmt(c.spent)}</div></td>
                  <td className="px-5 py-4"><div className="text-[12px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{new Date(c.lastBooking).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</div></td>
                  <td className="px-5 py-4"><div className="flex gap-0.5">{Array.from({length:5},(_, j)=><Star key={j} size={11} fill={j<c.rating?"#c9a96e":"transparent"} style={{color:"#c9a96e"}}/> )}</div></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`https://wa.me/${c.phone.replace(/\D/g,"")}`} target="_blank" className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><MessageCircle size={13} style={{color:"#25d366"}}/></a>
                      <a href={`tel:${c.phone}`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Phone size={13} style={{color:"rgba(255,255,255,0.4)"}}/></a>
                      <a href={`mailto:${c.email}`} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"><Mail size={13} style={{color:"rgba(255,255,255,0.4)"}}/></a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
