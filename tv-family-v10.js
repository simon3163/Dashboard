const timetable={Monday:[["Technological Studies","Mr Reilly","Rm 5","#57c0ff"],["Mathematics","Mrs Hudson","Rm 39","#e48d57"],["French","Mr Ferguson","Rm 54","#e6bb61"],["Science","Mr Brett","Rm 41","#6fc79c"],["Social Subjects","Miss Burns","Rm 29","#54c6cb"],["English","Mr Young","Rm 33","#a081eb"],["Music","Mr Gordon","Rm 16","#d14c50"]]};
const tomEvents=[{time:"08:05",title:"Leaves for school",location:"Morning run",color:"#57c0ff"},{time:"16:30",title:"Boys TKD",location:"Dunlop Village Hall",color:"#54c6cb"},{time:"17:35",title:"Tom Swimming",location:"Vikingar Leisure Centre, Largs",color:"#54c6cb"},{time:"18:00",title:"Stewarton Annick training",location:"Cocklebie Grass pitch",color:"#6fc79c"}];
const callumEvents=[{time:"08:40",title:"Leaves for school",location:"Morning run",color:"#e6bb61"},{time:"16:30",title:"Boys TKD",location:"Dunlop Village Hall",color:"#54c6cb"},{time:"19:00",title:"Callum Cubs",location:"Dunlop Church Hall",color:"#e48d57"},{time:"18:00 Tue",title:"Callum Swimming",location:"Neilston Leisure Centre",color:"#54c6cb"},{time:"18:00 Wed",title:"SAFC 2016 training",location:"Rose Reilly Sports Centre",color:"#6fc79c"}];
const pages=[...document.querySelectorAll('.page')];let pageIndex=0;let timer=null;const pageMs=14000;
(function injectUHDTVStyle(){const s=document.createElement('style');s.id='uhd-tv-v18';s.textContent=`
html body .app{height:100vh!important;min-height:100vh!important;display:block!important;overflow:hidden!important}
html body .app .viewport{position:absolute!important;inset:0!important;overflow:hidden!important}
html body .app .viewport .page{padding:2.2vh 2.2vw!important;overflow:hidden!important}
html body .app .viewport .pageTitle{font-size:2.1vw!important;line-height:1!important;margin:0 0 .7vh!important}
html body .app .viewport .rule{margin:.55vh 0 1.1vh!important}
html body .app .viewport .countdownPage{height:100%!important;display:grid!important;grid-template-columns:29% 42% 29%!important;grid-template-rows:100%!important;gap:1.2vw!important;align-items:stretch!important;overflow:hidden!important}
html body .app .viewport .countdownStack{display:contents!important}
html body .app .viewport .clockHero{grid-column:2!important;grid-row:1!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;min-width:0!important;min-height:0!important;overflow:hidden!important}
html body .app .viewport .countCard.tom{grid-column:1!important;grid-row:1!important}
html body .app .viewport .countCard.callum{grid-column:3!important;grid-row:1!important}
html body .app .viewport .countCard{height:100%!important;min-height:0!important;display:grid!important;grid-template-columns:1fr!important;grid-template-rows:60% 40%!important;gap:0!important;padding:0!important;overflow:hidden!important;border-radius:1.05vw!important;background:linear-gradient(180deg,rgba(17,49,78,.98),rgba(10,31,48,.98))!important}
html body .app .viewport .countCard.tom{border-top:.32vw solid #57c0ff!important}
html body .app .viewport .countCard.callum{border-top:.32vw solid #e6bb61!important}
html body .app .viewport .countPhoto{grid-row:1!important;width:100%!important;height:100%!important;min-height:0!important;max-height:none!important;object-fit:contain!important;object-position:center center!important;border-radius:0!important;border:0!important;border-bottom:1px solid rgba(145,184,208,.22)!important;background:#081a29!important;display:block!important}
html body .app .viewport .countInfo{grid-row:2!important;min-height:0!important;padding:1.3vh 1.1vw 1.2vh!important;display:grid!important;grid-template-rows:auto 1fr auto!important;overflow:hidden!important}
html body .app .viewport .countName{align-items:center!important;gap:.8vw!important}
html body .app .viewport .countName strong{font-size:2.55vw!important;line-height:.9!important}
html body .app .viewport .leaveAt{font-size:.84vw!important;padding:.55vh .65vw!important}
html body .app .viewport .countValue{align-self:center!important;font-size:3.7vw!important;line-height:.88!important;margin:0!important;white-space:nowrap!important}
html body .app .viewport .countLabel{font-size:.72vw!important;letter-spacing:.14em!important;margin:0!important}
html body .app .viewport .clockDial{position:relative!important;width:min(76vh,39vw)!important;aspect-ratio:1!important;border-radius:50%!important;border:1px solid rgba(107,171,212,.30)!important;background:transparent!important;box-shadow:none!important;display:flex!important;align-items:center!important;justify-content:center!important}
html body .app .viewport .clockCenter{position:absolute!important;inset:16%!important;border-radius:50%!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;background:transparent!important;border:0!important}
html body .app .viewport .secondTick{inset:2.2%!important}
html body .app .viewport .secondTick:before{height:1.1vh!important;max-height:24px!important;width:2px!important}
html body .app .viewport .secondTick.major:before{height:1.7vh!important;max-height:34px!important;width:3px!important}
html body .app .viewport .clockHero .bigDay{font-size:4.25vw!important;line-height:.88!important;margin:0!important;letter-spacing:.02em!important;text-transform:none!important}
html body .app .viewport .clockHero .bigDate{font-size:1.35vw!important;line-height:1!important;margin:1.45vh 0 0!important;letter-spacing:.12em!important;text-transform:uppercase!important}
html body .app .viewport .clockHero .bigClock{font-size:6.65vw!important;line-height:.82!important;margin-top:2vh!important;letter-spacing:-.055em!important}
html body .app .viewport .duoGrid{height:calc(100% - 5.2vh)!important;display:grid!important;grid-template-columns:1fr 1fr!important;gap:1.2vw!important}
html body .app .viewport .bigPanel{border-radius:1vw!important;min-height:0!important;overflow:hidden!important}
html body .app .viewport .bigHead{padding:1.05vh 1vw .9vh!important}
html body .app .viewport .bigHead h3{font-size:2vw!important;line-height:1!important}
html body .app .viewport .lessonGrid{padding:.9vh .8vw .5vh!important;gap:.55vw!important;grid-template-columns:1fr 1fr!important;overflow:hidden!important}
html body .app .viewport .lesson{min-height:6.2vh!important;border-radius:.6vw!important}
html body .app .viewport .lessonNum{font-size:1.05vw!important}
html body .app .viewport .lessonSubj{font-size:1.02vw!important}
html body .app .viewport .lessonTeach,html body .app .viewport .lessonRoom{font-size:.68vw!important}
html body .app .viewport .activityGrid{padding:.65vh .8vw .8vh!important;gap:.6vh!important;overflow:hidden!important}
html body .app .viewport .activity{min-height:7vh!important;padding:.75vh .72vw!important;border-radius:.62vw!important;grid-template-columns:5.2vw .28vw 1fr!important}
html body .app .viewport .activity .timeTag{font-size:1vw!important}
html body .app .viewport .activity .txt .main{font-size:1.05vw!important}
html body .app .viewport .activity .txt .sub{font-size:.7vw!important}
`;document.head.appendChild(s)})();
function nextWeekdayDeparture(now,hour,minute){const target=new Date(now);target.setHours(hour,minute,0,0);const weekend=d=>d.getDay()===0||d.getDay()===6;if(weekend(target)||target<=now){do{target.setDate(target.getDate()+1);target.setHours(hour,minute,0,0)}while(weekend(target))}return target}
function formatCountdown(ms){const total=Math.max(0,Math.floor(ms/1000));const h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;return[h,m,s].map(v=>String(v).padStart(2,'0')).join(':')}
function renderSchoolCountdown(){const now=new Date();const tomTarget=nextWeekdayDeparture(now,8,5),callumTarget=nextWeekdayDeparture(now,8,40);const day=document.getElementById('schoolDay'),date=document.getElementById('schoolDate'),clock=document.getElementById('schoolClock'),tc=document.getElementById('tomCountdown'),cc=document.getElementById('callumCountdown');if(day)day.textContent=now.toLocaleDateString('en-GB',{weekday:'long'});if(date)date.textContent=now.toLocaleDateString('en-GB',{day:'numeric',month:'long'}).toUpperCase();if(clock)clock.textContent=now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});if(tc)tc.textContent=formatCountdown(tomTarget-now);if(cc)cc.textContent=formatCountdown(callumTarget-now)}
function renderTomCallum(){const lessonWrap=document.getElementById('tomLessons');if(lessonWrap)lessonWrap.innerHTML=timetable.Monday.map((l,i)=>`<div class="lesson"><div class="lessonNum" style="background:${l[3]}">${i+1}</div><div class="lessonCopy"><div class="lessonSubj">${l[0]}</div><div class="lessonTeach">${l[1]}</div></div><div class="lessonRoom">${l[2]}</div></div>`).join('');const mk=a=>a.map(e=>`<div class="activity"><div class="timeTag">${e.time}</div><div class="line" style="background:${e.color}"></div><div class="txt"><div class="main">${e.title}</div><div class="sub">${e.location}</div></div></div>`).join('');const t=document.getElementById('tomActivities'),c=document.getElementById('callumActivities');if(t)t.innerHTML=mk(tomEvents);if(c)c.innerHTML=mk(callumEvents)}
function showPage(i){pages.forEach((p,idx)=>p.classList.toggle('active',idx===i));pageIndex=i}
function nextPage(){showPage((pageIndex+1)%pages.length)}
function prevPage(){showPage((pageIndex-1+pages.length)%pages.length)}
function startRotation(){clearInterval(timer);timer=setInterval(nextPage,pageMs)}
function controls(){document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){nextPage();startRotation()}if(e.key==='ArrowLeft'){prevPage();startRotation()}});let sx=null;document.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});document.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].screenX-sx;if(Math.abs(dx)>40){dx<0?nextPage():prevPage();startRotation()}sx=null},{passive:true})}
renderTomCallum();renderSchoolCountdown();setInterval(renderSchoolCountdown,1000);startRotation();controls();