"use client";
import { useState } from "react";
import Image from "next/image";
import { Upload, Trash2, Eye } from "lucide-react";
import { YACHTS } from "@/lib/data";

export default function AdminGalleryPage(){
  const [sel,setSel]=useState("all");
  const yachts=YACHTS.map(y=>({...y,images:Array.from({length:Math.min(4,10)},(_, i)=>({url:`/yachts/${y.slug}/${y.slug}-${i+1}.jpeg`,name:`${y.slug}-${i+1}.jpeg`}))}));
  const shown=sel==="all"?yachts:yachts.filter(y=>y.slug===sel);
  return(
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{color:"rgba(201,169,110,0.6)",fontFamily:"var(--font-inter)"}}>Content</p>
          <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"26px",fontWeight:300}}>Gallery Manager</h1>
          <p className="text-[13px] mt-1" style={{color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-inter)"}}>Manage yacht photos and gallery images</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium" style={{background:"rgba(201,169,110,0.15)",border:"1px solid rgba(201,169,110,0.3)",color:"#c9a96e",fontFamily:"var(--font-inter)"}}><Upload size={14}/> Upload Images</button>
      </div>
      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[{slug:"all",name:"All Yachts"},...YACHTS.map(y=>({slug:y.slug,name:y.name}))].map(y=>(
          <button key={y.slug} onClick={()=>setSel(y.slug)} className="px-3 py-1.5 rounded-xl text-[12px] whitespace-nowrap transition-all" style={{background:sel===y.slug?"rgba(201,169,110,0.12)":"rgba(255,255,255,0.03)",border:sel===y.slug?"1px solid rgba(201,169,110,0.25)":"1px solid rgba(255,255,255,0.06)",color:sel===y.slug?"#c9a96e":"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{y.name}</button>
        ))}
      </div>
      {/* Grid per yacht */}
      {shown.map(y=>(
        <div key={y.slug} className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium" style={{fontFamily:"var(--font-cormorant)",fontSize:"18px"}}>{y.name}</h3>
            <span className="text-[11px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{y.images.length} photos</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {y.images.map((img,i)=>(
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-square">
                <Image src={img.url} alt={img.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="200px" onError={()=>{}}/>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a href={img.url} target="_blank" className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30"><Eye size={14} style={{color:"#fff"}}/></a>
                  <button className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/30"><Trash2 size={14} style={{color:"#f87171"}}/></button>
                </div>
                {i===0&&<div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold" style={{background:"#c9a96e",color:"#08080f",fontFamily:"var(--font-inter)"}}>COVER</div>}
              </div>
            ))}
            {/* Upload slot */}
            <button className="aspect-square rounded-xl flex flex-col items-center justify-center border-2 border-dashed transition-all hover:border-gold/30" style={{borderColor:"rgba(255,255,255,0.1)"}}>
              <Upload size={20} style={{color:"rgba(255,255,255,0.25)"}}/><span className="text-[11px] mt-1" style={{color:"rgba(255,255,255,0.2)",fontFamily:"var(--font-inter)"}}>Add Photo</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
