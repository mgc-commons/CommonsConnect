
import { peopleRef, onSnapshot, query, orderBy } from "./firebase.js";
import { HOBBIES } from "./config.js";
import { hobbyIcon, esc, showStatus, normalizedPerson } from "./utils.js";

let people=[], currentFilter=null;
const $=id=>document.getElementById(id);

$("goHobbies").onclick=()=>$("hobbies").scrollIntoView({behavior:"smooth"});
$("closeModal").onclick=()=>$("profileModal").classList.remove("show");
$("profileModal").onclick=e=>{if(e.target.id==="profileModal")$("profileModal").classList.remove("show")};

function render(){
  const today=people.filter(p=>p.checked);
  $("todayCount").textContent=today.length;
  $("hobbyGrid").innerHTML=HOBBIES.slice(0,6).map(h=>{
    const count=today.filter(p=>p.hobbies.includes(h.name)).length;
    return `<button class="card hobby-card" data-hobby="${h.name}">
      <span class="count">${count}人</span><div class="icon">${h.icon}</div>
      <h3>${h.name}</h3><div class="subtle">${h.desc}</div></button>`;
  }).join("");
  document.querySelectorAll("[data-hobby]").forEach(el=>el.onclick=()=>{
    currentFilter=currentFilter===el.dataset.hobby?null:el.dataset.hobby;
    render();$("peopleGrid").scrollIntoView({behavior:"smooth"});
  });
  const list=currentFilter?today.filter(p=>p.hobbies.includes(currentFilter)):today;
  $("filterLabel").textContent=currentFilter?`${currentFilter}が好きな人`:"すべて";
  $("peopleGrid").innerHTML=list.length?list.map(p=>`<button class="card person-card" data-person="${p.id}">
    <div class="avatar">${p.avatar}</div><h3>${esc(p.name)}</h3><div class="subtle">${esc(p.dept)}</div>
    <div style="margin-top:12px"><span class="badge ${p.type==="guest"?"guest":""}">${p.type==="guest"?"ゲスト":"今日います"}</span></div>
    <div class="chips">${p.hobbies.map(h=>`<span class="chip">${hobbyIcon(h)} ${esc(h)}</span>`).join("")}</div></button>`).join("")
    :`<div class="card empty">今日はまだ該当する人がいません。</div>`;
  document.querySelectorAll("[data-person]").forEach(el=>el.onclick=()=>openProfile(el.dataset.person));
}
function openProfile(id){
  const p=people.find(x=>x.id===id); if(!p)return;
  $("profileBody").innerHTML=`<div class="profile-head"><div class="avatar">${p.avatar}</div>
    <div><h2 style="margin:0">${esc(p.name)}</h2><div class="subtle">${esc(p.dept)}</div></div></div>
    <div class="chips" style="margin:26px 0">${p.hobbies.map(h=>`<span class="chip">${hobbyIcon(h)} ${esc(h)}</span>`).join("")}</div>
    <h3>最近ハマっていること</h3><p class="lead" style="font-size:18px">${esc(p.message||"今日Commonsに来ています")}</p>
    <div class="notice">共通点があったら、気軽に話しかけてみよう。</div>`;
  $("profileModal").classList.add("show");
}
const q=query(peopleRef,orderBy("createdAt","desc"));
onSnapshot(q,snapshot=>{
  people=snapshot.docs.map(normalizedPerson);
  render();showStatus("Firebase 接続中・自動更新","ok");
},error=>{
  console.error(error);
  $("peopleGrid").innerHTML=`<div class="card empty">Firebaseへ接続できません。Firestoreの作成とルールを確認してください。</div>`;
  showStatus("Firebase 接続エラー","error");
});
