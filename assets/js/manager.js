
import { peopleRef, onSnapshot, query, orderBy, updateDoc, deleteDoc, doc, db } from "./firebase.js";
import { HOBBIES } from "./config.js";
import { esc, showStatus, normalizedPerson } from "./utils.js";

let people=[];
const $=id=>document.getElementById(id);
function render(){
 const today=people.filter(p=>p.checked),guests=today.filter(p=>p.type==="guest");
 $("metrics").innerHTML=[["本日の来館",today.length+"人"],["レギュラー",(today.length-guests.length)+"人"],["ゲスト",guests.length+"人"],["登録者",people.length+"人"]]
 .map(x=>`<div class="card metric"><span class="subtle">${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
 $("peopleRows").innerHTML=people.length?people.map(p=>`<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.dept)}</td>
 <td><span class="badge ${p.type==="guest"?"guest":""}">${p.type==="guest"?"ゲスト":"レギュラー"}</span></td>
 <td>${p.checked?"表示中":"非表示"}</td><td><button class="switch ${p.checked?"":"off"}" data-toggle="${p.id}">${p.checked?"非表示":"表示"}</button>
 <button class="switch off" data-delete="${p.id}">削除</button></td></tr>`).join(""):`<tr><td colspan="5">まだ登録がありません。</td></tr>`;
 document.querySelectorAll("[data-toggle]").forEach(b=>b.onclick=async()=>{const p=people.find(x=>x.id===b.dataset.toggle);await updateDoc(doc(db,"people",p.id),{checked:!p.checked})});
 document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=async()=>{if(confirm("この登録を削除しますか？"))await deleteDoc(doc(db,"people",b.dataset.delete))});
 const stats=HOBBIES.map(h=>({name:h.name,icon:h.icon,n:today.filter(p=>p.hobbies.includes(h.name)).length})).sort((a,b)=>b.n-a.n).slice(0,7);
 $("hobbyStats").innerHTML=stats.map(s=>`<div class="setting-row"><span>${s.icon} ${s.name}</span><strong>${s.n}人</strong></div>`).join("");
}
onSnapshot(query(peopleRef,orderBy("createdAt","desc")),snap=>{people=snap.docs.map(normalizedPerson);render();showStatus("Firebase 接続中","ok")},e=>{console.error(e);showStatus("Firebase 接続エラー","error")});
