
import { HOBBIES } from "./config.js";
export function hobbyIcon(name){
  return HOBBIES.find(h=>h.name===name)?.icon || "✨";
}
export function esc(value=""){
  return String(value).replace(/[&<>"']/g, m=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}
export function showStatus(text, type="ok"){
  let el=document.getElementById("connectionStatus");
  if(!el){el=document.createElement("div");el.id="connectionStatus";el.className="status";document.body.appendChild(el);}
  el.textContent=text;el.className=`status ${type}`;
}
export function normalizedPerson(docSnap){
  const p=docSnap.data();
  return {
    id:docSnap.id,
    name:p.name||"",
    dept:p.dept||"",
    avatar:p.avatar||"🙂",
    hobbies:Array.isArray(p.hobbies)?p.hobbies:[],
    message:p.message||"",
    type:p.type==="guest"?"guest":"regular",
    checked:p.checked!==false,
    createdAt:p.createdAt||null
  };
}
