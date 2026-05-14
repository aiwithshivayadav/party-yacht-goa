"use client";
import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone, Mail, Tag, UserPlus, FileText, Calendar, Trash2, Send } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDateTime, timeAgo } from "@/lib/utils";

const MOCK: Record<string,any> = {
  "1":{ id:"1",leadCode:"PYG-L-1842",name:"Rahul Sharma",email:"rahul.s@gmail.com",phone:"+91 98765 43210",whatsapp:"+91 98765 43210",yachtName:"Sunset 42",occasion:"Birthday",date:"2025-06-20",adults:22,children:0,budget:"₹60-80K",source:"Website",status:"NEW",priority:"HIGH",assignedTo:null,pickupPoint:"Panaji Jetty",specialRequests:"Need DJ and decoration for birthday. Prefer evening slot.",createdAt:new Date(Date.now()-8*60000),notes:[{id:"n1",message:"Guest called — very interested. Wants Sunset 42 specifically.",author:"Sneha",time:new Date(Date.now()-5*60000)}]},
  "2":{ id:"2",leadCode:"PYG-L-1841",name:"Priya Mehta",email:"priya.m@yahoo.com",phone:"+91 87654 32109",whatsapp:"+91 87654 32109",yachtName:"Orca",occasion:"Couple Date",date:"2025-06-14",adults:2,children:0,budget:"₹30-40K",source:"Instagram",status:"CONTACTED",priority:"MEDIUM",assignedTo:"Anil",pickupPoint:"Calangute Beach",specialRequests:"Anniversary trip. Candles, flowers and champagne on board.",createdAt:new Date(Date.now()-45*60000),notes:[{id:"n2",message:"Sent quote via WhatsApp. Awaiting confirmation.",author:"Anil",time:new Date(Date.now()-30*60000)}]},
  "3":{ id:"3",leadCode:"PYG-L-1840",name:"Amit Patel",email:"amit.p@outlook.com",phone:"+91 76543 21098",whatsapp:"+91 76543 21098",yachtName:"Polaris",occasion:"Corporate",date:"2025-06-25",adults:30,children:0,budget:"₹1.5L+",source:"Referral",status:"FOLLOW_UP",priority:"URGENT",assignedTo:"Sneha",pickupPoint:"Miramar Beach",specialRequests:"Corporate event for 30 people. Need catering and AV.",createdAt:new Date(Date.now()-2*3600000),notes:[]},
  "4":{ id:"4",leadCode:"PYG-L-1839",name:"Neha Singh",email:"neha.s@gmail.com",phone:"+91 65432 10987",whatsapp:"+91 65432 10987",yachtName:"Prestige 36",occasion:"Anniversary",date:"2025-06-18",adults:8,children:2,budget:"₹45-60K",source:"Website",status:"QUOTED",priority:"HIGH",assignedTo:"Anil",pickupPoint:"Panaji Jetty",specialRequests:"10th anniversary sunset cruise with dinner.",createdAt:new Date(Date.now()-4*3600000),notes:[{id:"n4",message:"Quote of ₹52,000 sent via email. Guest reviewing.",author:"Anil",time:new Date(Date.now()-2*3600000)}]},
  "5":{ id:"5",leadCode:"PYG-L-1838",name:"Vikram Nair",email:"vikram.n@gmail.com",phone:"+91 54321 09876",whatsapp:"+91 54321 09876",yachtName:"Malini",occasion:"Bachelor Party",date:"2025-06-12",adults:15,children:0,budget:"₹50-70K",source:"Google",status:"CONFIRMED",priority:"HIGH",assignedTo:"Sneha",pickupPoint:"Baga Beach",specialRequests:"Full DJ setup, drinks package, LED lights.",createdAt:new Date(Date.now()-6*3600000),notes:[{id:"n5",message:"Advance of ₹35,000 received. Booking confirmed!",author:"Sneha",time:new Date(Date.now()-3*3600000)}]},
};
const PC: Record<string,string> = { LOW:"rgba(100,116,139,0.6)",MEDIUM:"#fbbf24",HIGH:"#f97316",URGENT:"#ef4444" };
const STATUSES = ["NEW","CONTACTED","FOLLOW_UP","QUOTED","CONFIRMED","CANCELLED","LOST"];

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lead = MOCK[id];
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<any[]>(lead?.notes || []);
  const [status, setStatus] = useState(lead?.status || "NEW");
  if (!lead) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><div className="text-5xl">🔍</div><p className="text-white text-lg" style={{fontFamily:"var(--font-cormorant)"}}>Lead not found</p><Link href="/admin/leads" className="text-[13px]" style={{color:"#c9a96e"}}>← Back to Leads</Link></div>;
  const addNote = () => { if (!note.trim()) return; setNotes([{id:`n${Date.now()}`,message:note,author:"Admin",time:new Date()},...notes]); setNote(""); };
  const inp: React.CSSProperties = {background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.7)",fontFamily:"var(--font-inter)",fontSize:"13px"};
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link href="/admin/leads" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10" style={{border:"1px solid rgba(255,255,255,0.08)"}}><ArrowLeft size={16} style={{color:"rgba(255,255,255,0.5)"}}/></Link>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-white" style={{fontFamily:"var(--font-cormorant)",fontSize:"22px",fontWeight:300}}>{lead.leadCode}</h1>
              <StatusBadge status={status} type="lead"/>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
                <div className="w-1.5 h-1.5 rounded-full" style={{background:PC[lead.priority]}}/>
                <span className="text-[11px]" style={{color:PC[lead.priority],fontFamily:"var(--font-inter)"}}>{lead.priority}</span>
              </div>
            </div>
            <p className="text-[12px] mt-0.5" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>Received {timeAgo(lead.createdAt)} · via {lead.source}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}`} target="_blank" className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]" style={{background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.2)",color:"#25d366",fontFamily:"var(--font-inter)"}}><MessageCircle size={13}/> WhatsApp</a>
          <Link href={`/admin/bookings/new`} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium" style={{background:"rgba(201,169,110,0.15)",border:"1px solid rgba(201,169,110,0.3)",color:"#c9a96e",fontFamily:"var(--font-inter)"}}><Tag size={13}/> Convert to Booking</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          {/* Customer */}
          <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Customer Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {([{l:"Name",v:lead.name},{l:"Source",v:lead.source},{l:"Budget",v:lead.budget},{l:"Assigned To",v:lead.assignedTo||"Unassigned"}] as any[]).map(({l,v})=>(
                <div key={l}><p className="text-[11px] mb-1" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{l}</p><p className="text-[13px] text-white" style={{fontFamily:"var(--font-inter)"}}>{v}</p></div>
              ))}
            </div>
            <div className="flex gap-2 pt-4 border-t border-white/[0.05]">
              <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g,"")}`} target="_blank" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]" style={{background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.2)",color:"#25d366",fontFamily:"var(--font-inter)"}}><MessageCircle size={12}/> WhatsApp</a>
              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}><Phone size={12}/> Call</a>
              <a href={`mailto:${lead.email}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",fontFamily:"var(--font-inter)"}}><Mail size={12}/> Email</a>
            </div>
          </div>
          {/* Inquiry */}
          <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Inquiry Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {([{l:"Yacht",v:lead.yachtName,g:true},{l:"Date",v:new Date(lead.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})},{l:"Adults",v:`${lead.adults}`},{l:"Children",v:lead.children>0?`${lead.children}`:"None"},{l:"Occasion",v:lead.occasion},{l:"Pickup",v:lead.pickupPoint}] as any[]).map(({l,v,g})=>(
                <div key={l}><p className="text-[11px] mb-1" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>{l}</p><p className="text-[13px]" style={{color:g?"#c9a96e":"rgba(255,255,255,0.8)",fontFamily:"var(--font-inter)",fontWeight:g?600:400}}>{v}</p></div>
              ))}
            </div>
            {lead.specialRequests && <div className="mt-4 pt-4 border-t border-white/[0.05]"><p className="text-[11px] mb-2" style={{color:"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}>Special Requests</p><p className="text-[13px] leading-relaxed" style={{color:"rgba(255,255,255,0.6)",fontFamily:"var(--font-inter)"}}>{lead.specialRequests}</p></div>}
          </div>
          {/* Notes */}
          <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Internal Notes</h3>
            <div className="flex gap-2 mb-4">
              <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Add a note, follow-up, or update..." rows={2} className="flex-1 px-3 py-2.5 rounded-xl text-[13px] outline-none resize-none" style={inp}/>
              <button onClick={addNote} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] self-start transition-all" style={{background:note?"rgba(201,169,110,0.15)":"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:note?"#c9a96e":"rgba(255,255,255,0.3)",fontFamily:"var(--font-inter)"}}><Send size={12}/> Add</button>
            </div>
            <div className="space-y-3">
              {notes.map((n:any)=>(
                <div key={n.id} className="flex gap-3 p-3 rounded-xl" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0" style={{background:"rgba(201,169,110,0.2)",color:"#c9a96e"}}>{n.author[0]}</div>
                  <div><p className="text-[12px]" style={{color:"rgba(255,255,255,0.6)",fontFamily:"var(--font-inter)"}}>{n.message}</p><p className="text-[10px] mt-1" style={{color:"rgba(255,255,255,0.2)",fontFamily:"var(--font-inter)"}}>{n.author} · {formatDateTime(n.time)}</p></div>
                </div>
              ))}
              {notes.length===0&&<p className="text-[12px] text-center py-4" style={{color:"rgba(255,255,255,0.2)",fontFamily:"var(--font-inter)"}}>No notes yet</p>}
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Update Status</h3>
            <div className="space-y-1.5">
              {STATUSES.map((o)=><button key={o} onClick={()=>setStatus(o)} className="w-full text-left px-3 py-2.5 rounded-lg text-[12px] transition-all" style={{background:status===o?"rgba(201,169,110,0.1)":"rgba(255,255,255,0.02)",border:status===o?"1px solid rgba(201,169,110,0.25)":"1px solid rgba(255,255,255,0.04)",color:status===o?"#c9a96e":"rgba(255,255,255,0.45)",fontFamily:"var(--font-inter)"}}>{status===o?"✓ ":""}{o.replace("_"," ")}</button>)}
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
            <h3 className="text-white text-sm font-medium mb-4" style={{fontFamily:"var(--font-inter)"}}>Quick Actions</h3>
            <div className="space-y-2">
              {([{icon:Tag,label:"Convert to Booking",color:"#c9a96e",bg:"rgba(201,169,110,0.1)",href:"/admin/bookings/new"},{icon:UserPlus,label:"Assign to Staff",color:"#22d3ee",bg:"rgba(6,182,212,0.1)"},{icon:FileText,label:"Send Quote",color:"#6366f1",bg:"rgba(99,102,241,0.1)"},{icon:Calendar,label:"Set Follow-up",color:"#fbbf24",bg:"rgba(245,158,11,0.1)"},{icon:Trash2,label:"Delete Lead",color:"#f87171",bg:"rgba(239,68,68,0.1)"}] as any[]).map(({icon:Icon,label,color,bg,href})=>
                href?<Link key={label} href={href} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all hover:opacity-80" style={{background:bg,border:`1px solid ${color}22`,color,fontFamily:"var(--font-inter)"}}><Icon size={14}/> {label}</Link>
                :<button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all hover:opacity-80" style={{background:bg,border:`1px solid ${color}22`,color,fontFamily:"var(--font-inter)"}}><Icon size={14}/> {label}</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
