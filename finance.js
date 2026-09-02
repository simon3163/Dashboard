(()=>{'use strict';
const D=window.ORBIT_DATA;if(!D)return;
const rename=v=>typeof v==='string'?v.replace(/\bMa\b/g,'Annie'):v;
const deepRename=v=>Array.isArray(v)?v.map(deepRename):(v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,deepRename(x)])):rename(v));
for(const key of ['orbitManual','orbitManualRecords']){try{const raw=localStorage.getItem(key);if(raw)localStorage.setItem(key,JSON.stringify(deepRename(JSON.parse(raw))))}catch(e){}}
D.version='2.1.0';
D.updated='2026-09-02T20:36:00+01:00';
D.people=(D.people||[]).map(rename);
(D.records||[]).forEach(r=>{for(const k of ['owner','title','note','provider','source','change'])if(k in r)r[k]=rename(r[k]);});
(D.intel||[]).forEach(i=>{for(const k of ['owner','title','text','source'])if(k in i)i[k]=rename(i[k]);});
D.rules=(D.rules||[]).map(rename);
D.events=(D.events||[]).map(e=>e.map(rename));

const addSource=(icon,name,detail)=>{if(!(D.sources||[]).some(s=>s[1]===name))D.sources.push([icon,name,detail]);};
addSource('📊','Accounting archive','GlazertCosting history. Newest identified accounting period: March 2026. Historical/planning source; figures must be cross-checked against newer evidence.');
addSource('🏦','Banking 2026','Bank statements are the strongest evidence of what was actually paid or received. Statements are present through August 2026.');
addSource('🗄️','Banking History','Historical bank evidence for comparing recurring payments and older accounting records.');
addSource('📄','Team Lee Finance Doc','April 2025 finance notes. Historical context only; never overrides newer policy, invoice, calendar or bank evidence.');

const already=t=>(D.intel||[]).some(i=>i.title===t);
const prepend=[];
if(!already('Finance evidence rule'))prepend.push({owner:'Family',kind:'action',title:'Finance evidence rule',date:'2 Sep',text:'Orbit now ranks actual bank transactions first for paid/received amounts, then the newest applicable accounting record, then older spreadsheets as historical context. Conflicts are surfaced instead of silently choosing.',source:'Orbit finance layer'});
if(!already('Accounting archive added'))prepend.push({owner:'Family',kind:'action',title:'Accounting archive added',date:'2 Sep',text:'The GlazertCosting archive is now part of Orbit’s evidence model. March 2026 is the newest identified accounting period. The newest February/March 2026 workbooks are password-encrypted, so Orbit will not claim their cell values are verified until they can be read.',source:'Google Drive · accounting archive'});
if(!already('Historical finance notes available'))prepend.push({owner:'Family',kind:'action',title:'Historical finance notes available',date:'Apr 2025',text:'Older notes include football cost changes, house-insurance timing, EE phone/watch deductions, mortgage options, Annie’s tax return, investment transfer, travel insurance and London hotel planning. These stay historical until newer evidence confirms them.',source:'Team Lee Finance Doc'});
D.intel=[...prepend,...(D.intel||[])];

const el=document.getElementById('financeEvidence');
if(el)el.innerHTML=`
<div class="card action"><div class="title">🏦 Actual payment evidence</div><div class="meta">Bank statements win when the question is what was actually paid or received. Banking 2026 currently includes statements through August 2026.</div><span class="pill ok">STRONGEST</span></div>
<div class="card"><div class="title">📊 Accounting baseline</div><div class="meta">Use the newest applicable accounting period first. Newest identified: March 2026. The February/March workbooks are encrypted, so their individual figures are not yet treated as verified.</div><span class="pill info">HISTORICAL / PLANNING</span></div>
<div class="card"><div class="title">🕰 Older finance files</div><div class="meta">Useful for trends, previous amounts and cross-checking. Upload date is ignored when deciding freshness; the period inside the source is what matters.</div><span class="pill info">CONTEXT</span></div>`;
})();