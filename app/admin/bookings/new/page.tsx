"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Check } from "lucide-react";
import { YACHTS } from "@/lib/data";

const OCCASIONS = ["Sunset Cruise","Birthday Party","DJ Night","Corporate","Couple Date","Proposal","Bachelor Party","Anniversary","Fireworks","Family Trip"];
const DURATIONS = [{key:"2hr",label:"2 Hours"},{key:"3hr",label:"3 Hours"},{key:"halfday",label:"Half Day (4hr)"},{key:"fullday",label:"Full Day (8hr)"}];
const ADDONS = [{key:"decoration",label:"Decoration",price:"₹3,500"},{key:"dj",label:"DJ",price:"₹8,000"},{key:"cake",label:"Cake",price:"₹1,500"},{key:"fireworks",label:"Fireworks",price:"₹12,000"},{key:"photographer",label:"Photographer",price:"₹6,000"},{key:"food-drinks",label:"Food & Drinks",price:"₹4,000"}];
const inp: React.CSSProperties = {background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)",fontSize:"13px"};
function Field({label,required,children}:{label:string;required?:boolean;children:React.ReactNode}){return(<div><label className="block text-[11px] mb-1.5" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{label}{required&&<span style={{color:"#c9a96e"}}> *</span>}</label>{children}</div>);}

export default function NewBookingPage() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [date,setDate]=useState("");
  const [time,setTime]=useState("17:00");
  const [duration,setDuration]=useState("2hr");
  const [yacht,setYacht]=useState("");
  const [occasion,setOccasion]=useState("");
  const [adults,setAdults]=useState("2");
  const [children,setChildren]=useState("0");
  const [addons,setAddons]=useState<string[]>([]);
  const [pickup,setPickup]=useState("");
  const [requests,setRequests]=useState("");
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);

  const handleSave=async()=>{ setSaving(true); await new Promise(r=>setTimeout(r,1200)); setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),3000); };
  const toggleAddon=(k:string)=>setAddons(a=>a.includes(k)?a.filter(x=>x!==k):[...a,k]);

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/bookings" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10" style={{border:"1px solid rgba(255,255,255,0.08)"}}><ArrowLeft size={16} style={{color:"rgba(255,255,255,0.5)"}}/></Link>
        <div>
          <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"24px",fontWeight:300}}>New Booking</h1>
          <p className="text-[12px]" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>Create a manual booking for a customer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Customer Info */}
        <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Customer Information</h3>
          <div className="space-y-3">
            <Field label="Full Name" required><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Guest name" className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
            <Field label="Email"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com" className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
            <Field label="Phone" required><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
          </div>
        </div>

        {/* Booking Info */}
        <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Booking Details</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" required><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
              <Field label="Time"><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Adults"><input type="number" value={adults} onChange={e=>setAdults(e.target.value)} min="1" className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
              <Field label="Children"><input type="number" value={children} onChange={e=>setChildren(e.target.value)} min="0" className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
            </div>
            <Field label="Pickup Point"><input type="text" value={pickup} onChange={e=>setPickup(e.target.value)} placeholder="e.g. Panaji Jetty" className="w-full px-3 py-2.5 rounded-xl outline-none" style={inp}/></Field>
          </div>
        </div>

        {/* Yacht Selection */}
        <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Select Yacht</h3>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {YACHTS.map(y=>(
              <button key={y.slug} onClick={()=>setYacht(y.slug)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] transition-all text-left" style={{background:yacht===y.slug?"rgba(201,169,110,0.1)":"rgba(255,255,255,0.02)",border:yacht===y.slug?"1px solid rgba(201,169,110,0.25)":"1px solid rgba(255,255,255,0.04)"}}>
                <div>
                  <span className="font-medium" style={{color:yacht===y.slug?"#c9a96e":"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)"}}>{y.name}</span>
                  <span className="text-[11px] ml-2" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>Up to {y.capacity} guests</span>
                </div>
                <span className="text-[12px]" style={{color:"#c9a96e",fontFamily:"var(--font-inter)"}}>From ₹{(y.priceFrom/1000).toFixed(0)}K</span>
              </button>
            ))}
          </div>
        </div>

        {/* Occasion + Duration */}
        <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Occasion & Duration</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] mb-2" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>Occasion</p>
              <div className="flex flex-wrap gap-1.5">
                {OCCASIONS.map(o=><button key={o} onClick={()=>setOccasion(o)} className="px-3 py-1 rounded-full text-[11px] transition-all" style={{background:occasion===o?"rgba(201,169,110,0.15)":"rgba(255,255,255,0.04)",border:occasion===o?"1px solid rgba(201,169,110,0.3)":"1px solid rgba(255,255,255,0.08)",color:occasion===o?"#c9a96e":"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{o}</button>)}
              </div>
            </div>
            <div>
              <p className="text-[11px] mb-2" style={{color:"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>Duration</p>
              <div className="grid grid-cols-2 gap-2">
                {DURATIONS.map(d=><button key={d.key} onClick={()=>setDuration(d.key)} className="px-3 py-2 rounded-xl text-[12px] transition-all" style={{background:duration===d.key?"rgba(201,169,110,0.15)":"rgba(255,255,255,0.04)",border:duration===d.key?"1px solid rgba(201,169,110,0.3)":"1px solid rgba(255,255,255,0.08)",color:duration===d.key?"#c9a96e":"rgba(255,255,255,0.4)",fontFamily:"var(--font-inter)"}}>{d.label}</button>)}
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Add-ons</h3>
          <div className="grid grid-cols-2 gap-2">
            {ADDONS.map(a=>(
              <button key={a.key} onClick={()=>toggleAddon(a.key)} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[12px] transition-all" style={{background:addons.includes(a.key)?"rgba(201,169,110,0.1)":"rgba(255,255,255,0.02)",border:addons.includes(a.key)?"1px solid rgba(201,169,110,0.25)":"1px solid rgba(255,255,255,0.05)"}}>
                <span style={{color:addons.includes(a.key)?"#c9a96e":"rgba(255,255,255,0.6)",fontFamily:"var(--font-inter)"}}>{a.label}</span>
                <span style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)",fontSize:"11px"}}>{a.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
          <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Special Requests</h3>
          <textarea value={requests} onChange={e=>setRequests(e.target.value)} placeholder="Any special requests or notes..." rows={5} className="w-full px-3 py-2.5 rounded-xl outline-none resize-none text-[13px]" style={{...inp,lineHeight:"1.6"}}/>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Link href="/admin/bookings" className="px-6 py-2.5 rounded-xl text-[13px]" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}>Cancel</Link>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-[13px] font-medium transition-all" style={{background:saved?"rgba(16,185,129,0.15)":"rgba(201,169,110,0.2)",border:saved?"1px solid rgba(16,185,129,0.3)":"1px solid rgba(201,169,110,0.3)",color:saved?"#34d399":"#c9a96e",fontFamily:"var(--font-inter)"}}>
          {saved?<Check size={14}/>:<Save size={14}/>}
          {saving?"Creating...":(saved?"Booking Created!":"Create Booking")}
        </button>
      </div>
    </div>
  );
}
