"use client";
import Link from "next/link";
import { Clock, Users, Ship, MapPin, Phone } from "lucide-react";

const TODAY = [
  {time:"10:00",end:"18:00",yacht:"MV Krishna",customer:"Sanjay Rao",phone:"+91 65432 10987",guests:45,occasion:"Corporate",pickup:"Miramar Beach",status:"CONFIRMED",color:"#34d399"},
  {time:"17:00",end:"19:00",yacht:"Prestige 36",customer:"Neha Singh",phone:"+91 65432 10987",guests:10,occasion:"Anniversary",pickup:"Panaji Jetty",status:"CONFIRMED",color:"#34d399"},
  {time:"17:30",end:"19:30",yacht:"Sunset 42",customer:"Aisha Khan",phone:"+91 98765 43210",guests:18,occasion:"Birthday",pickup:"Panaji Jetty",status:"CONFIRMED",color:"#34d399"},
];
const TOMORROW = [
  {time:"16:00",end:"18:00",yacht:"Orca",customer:"Rohan Dev",phone:"+91 87654 32109",guests:12,occasion:"Sunset Cruise",pickup:"Calangute Beach",status:"CONFIRMED",color:"#34d399"},
  {time:"18:00",end:"20:00",yacht:"Polaris",customer:"Meena Gupta",phone:"+91 76543 21098",guests:2,occasion:"Proposal",pickup:"Candolim",status:"PENDING",color:"#fbbf24"},
];

function BookingCard({b}:{b:any}){return(
  <div className="rounded-xl p-4 flex gap-4" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="text-[13px] font-semibold" style={{color:"#c9a96e",fontFamily:"var(--font-inter)"}}>{b.time}</div>
      <div className="w-px flex-1 rounded" style={{background:"rgba(255,255,255,0.1)",minHeight:"24px"}}/>
      <div className="text-[11px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{b.end}</div>
    </div>
    <div className="flex-1">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="text-[13px] font-medium text-white" style={{fontFamily:"var(--font-inter)"}}>{b.customer}</div>
          <div className="text-[11px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{b.occasion}</div>
        </div>
        <span className="px-2 py-0.5 rounded-lg text-[10px] shrink-0" style={{background:`${b.color}20`,color:b.color,border:`1px solid ${b.color}30`,fontFamily:"var(--font-inter)"}}>{b.status}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 text-[11px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}><Ship size={10} style={{color:"#c9a96e"}}/>{b.yacht}</div>
        <div className="flex items-center gap-1.5 text-[11px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}><Users size={10}/>{b.guests} guests</div>
        <div className="flex items-center gap-1.5 text-[11px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}><MapPin size={10}/>{b.pickup}</div>
        <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 text-[11px] hover:underline" style={{color:"#c9a96e",fontFamily:"var(--font-inter)"}}><Phone size={10}/>{b.phone}</a>
      </div>
    </div>
  </div>
);}

export default function SchedulePage(){return(
  <div className="space-y-6 pb-8">
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Operations</p>
      <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Daily Schedule</h1>
      <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>All trips planned for today and tomorrow</p>
    </div>
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-400"/>
          <h2 className="text-white font-medium" style={{fontFamily:"var(--font-inter)"}}>Today — {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</h2>
          <span className="px-2 py-0.5 rounded-full text-[11px]" style={{background:"rgba(201,169,110,0.15)",color:"#c9a96e",fontFamily:"var(--font-inter)"}}>{TODAY.length} trips</span>
        </div>
        <div className="space-y-3">{TODAY.map((b,i)=><BookingCard key={i} b={b}/>)}</div>
      </div>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-400"/>
          <h2 className="text-white font-medium" style={{fontFamily:"var(--font-inter)"}}>Tomorrow</h2>
          <span className="px-2 py-0.5 rounded-full text-[11px]" style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{TOMORROW.length} trips</span>
        </div>
        <div className="space-y-3">{TOMORROW.map((b,i)=><BookingCard key={i} b={b}/>)}</div>
      </div>
    </div>
  </div>
);}
