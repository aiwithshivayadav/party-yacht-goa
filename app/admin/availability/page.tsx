"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YACHTS } from "@/lib/data";

const BOOKINGS: Record<string,{day:number,yacht:string}[]> = {
  "2025-05": [{day:14,yacht:"Sunset 42"},{day:14,yacht:"MV Krishna"},{day:15,yacht:"Orca"},{day:15,yacht:"Polaris"},{day:16,yacht:"MV Krishna"},{day:18,yacht:"Prestige 36"},{day:20,yacht:"Malini"},{day:22,yacht:"Sunset 42"},{day:25,yacht:"Polaris"},{day:28,yacht:"Orca"}],
};
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function AvailabilityPage(){
  const [year,setYear]=useState(2025);
  const [month,setMonth]=useState(4); // May = index 4
  const key=`${year}-${String(month+1).padStart(2,"0")}`;
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const cells=Array.from({length:firstDay+daysInMonth},(_, i)=>i<firstDay?null:i-firstDay+1);
  const booked=BOOKINGS[key]||[];
  const prev=()=>{ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);};
  const next=()=>{ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);};
  return(
    <div className="space-y-5 pb-8">
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Fleet</p>
        <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Availability Calendar</h1>
        <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>See which yachts are booked on each day</p>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-white font-medium" style={{fontFamily:"var(--font-cormorant)",fontSize:"20px"}}>{MONTHS[month]} {year}</h2>
          <div className="flex gap-1">
            <button onClick={prev} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"><ChevronLeft size={14} style={{color:"rgba(255,255,255,0.4)"}}/></button>
            <button onClick={next} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10"><ChevronRight size={14} style={{color:"rgba(255,255,255,0.4)"}}/></button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-white/[0.04]">
          {DAYS.map(d=><div key={d} className="py-2 text-center text-[11px] tracking-widest uppercase" style={{color:"rgba(255,255,255,0.25)",fontFamily:"var(--font-inter)"}}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day,i)=>{
            const dayBooked=day?booked.filter(b=>b.day===day):[];
            const isToday=day===new Date().getDate()&&month===new Date().getMonth()&&year===new Date().getFullYear();
            return(
              <div key={i} className="min-h-[90px] p-2 border-b border-r border-white/[0.03]" style={{background:isToday?"rgba(201,169,110,0.04)":"transparent"}}>
                {day&&(
                  <>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] mb-1" style={{background:isToday?"#c9a96e":"transparent",color:isToday?"#08080f":"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)",fontWeight:isToday?700:400}}>{day}</div>
                    {dayBooked.slice(0,2).map((b,j)=><div key={j} className="text-[10px] px-1.5 py-0.5 rounded mb-0.5 truncate" style={{background:"rgba(239,68,68,0.15)",color:"#f87171",fontFamily:"var(--font-inter)"}}>{b.yacht}</div>)}
                    {dayBooked.length===0&&<div className="text-[10px] px-1.5 py-0.5 rounded" style={{background:"rgba(16,185,129,0.1)",color:"#34d399",fontFamily:"var(--font-inter)"}}>Open</div>}
                    {dayBooked.length>2&&<div className="text-[10px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>+{dayBooked.length-2}</div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)"}}/><span className="text-[12px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>Booked</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)"}}/><span className="text-[12px]" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>Available</span></div>
      </div>
    </div>
  );
}
