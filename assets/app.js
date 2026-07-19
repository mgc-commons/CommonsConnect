
function getPeople(){
  const saved=localStorage.getItem("cc_people");
  if(saved) return JSON.parse(saved);
  localStorage.setItem("cc_people",JSON.stringify(window.DEFAULT_PEOPLE));
  return JSON.parse(JSON.stringify(window.DEFAULT_PEOPLE));
}
function savePeople(data){localStorage.setItem("cc_people",JSON.stringify(data))}
function checkedPeople(){return getPeople().filter(p=>p.checked)}
function hobbyIcon(name){const h=window.HOBBIES.find(x=>x.name===name);return h?h.icon:"✨"}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
