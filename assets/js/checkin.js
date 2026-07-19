
import { peopleRef, addDoc, serverTimestamp } from "./firebase.js";
import { HOBBIES } from "./config.js";
import { showStatus } from "./utils.js";

const steps=[...document.querySelectorAll(".step")];
let step=0,selected=[];
const $=id=>document.getElementById(id);
$("choices").innerHTML=HOBBIES.map(h=>`<button type="button" class="choice" data-name="${h.name}"><span>${h.icon}</span>${h.name}</button>`).join("");
document.querySelectorAll(".choice").forEach(el=>el.onclick=()=>{
  const name=el.dataset.name;
  if(el.classList.contains("selected")){el.classList.remove("selected");selected=selected.filter(x=>x!==name)}
  else if(selected.length<3){el.classList.add("selected");selected.push(name)}
  $("choiceGuide").textContent=`${selected.length} / 3 選択中`;
});
function update(){steps.forEach((s,i)=>s.classList.toggle("active",i===step));$("progressBar").style.width=`${(step+1)/steps.length*100}%`}
function next(){
  if(step===1&&(!$("name").value.trim()||!$("dept").value.trim())){alert("お名前と所属を入力してください。");return}
  if(step===2&&selected.length!==3){alert("好きなものを3つ選んでください。");return}
  step=Math.min(step+1,steps.length-1);update();
}
document.querySelectorAll(".next").forEach(b=>b.onclick=next);
document.querySelectorAll(".prev").forEach(b=>b.onclick=()=>{step=Math.max(step-1,0);update()});
$("registerButton").onclick=async()=>{
  const btn=$("registerButton");btn.disabled=true;btn.textContent="登録しています…";
  try{
    await addDoc(peopleRef,{
      name:$("name").value.trim(),dept:$("dept").value.trim(),type:$("type").value,
      avatar:"🙂",hobbies:selected,message:$("message").value.trim()||"今日Commonsに来ています",
      checked:true,createdAt:serverTimestamp()
    });
    showStatus("登録しました","ok");next();
  }catch(e){
    console.error(e);showStatus("登録に失敗しました","error");
    alert("登録できませんでした。Firestoreのルールがテストモードになっているか確認してください。");
    btn.disabled=false;btn.textContent="登録する";
  }
};
update();
