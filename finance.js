(()=>{'use strict';
const D=window.ORBIT_DATA;if(!D)return;
const rename=v=>typeof v==='string'?v.replace(/\bMa\b/g,'Annie'):v;
const deepRename=v=>Array.isArray(v)?v.map(deepRename):(v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,deepRename(x)])):rename(v));
for(const key of ['orbitManual','orbitManualRecords']){try{const raw=localStorage.getItem(key);if(raw)localStorage.setItem(key,JSON.stringify(deepRename(JSON.parse(raw))))}catch(e){}}
D.version='2.2.0';
D.updated='2026-09-02T20:55:00+01:00';
D.people=(D.people||[]).map(rename);
(D.records||[]).forEach(r=>{for(const k of ['owner','title','note','provider','source','change'])if(k in r)r[k]=rename(r[k]);});
(D.intel||[]).forEach(i=>{for(const k of ['owner','title','text','source'])if(k in i)i[k]=rename(i[k]);});
D.rules=(D.rules||[]).map(rename);
D.events=(D.events||[]).map(e=>e.map(rename));

const addSource=(icon,name,detail)=>{if(!(D.sources||[]).some(s=>s[1]===name))D.sources.push([icon,name,detail]);};
addSource('📊','Accounting archive','Unlocked GlazertCosting archive. Although the outer files are named Feb/Mar 2026, the newest internal costing sheet is May 2025. Use as a historical budget baseline, not current 2026 truth.');
addSource('🏦','Banking 2026','Bank statements are the strongest evidence of what was actually paid or received. Statements are available January-August 2026.');
addSource('🗄️','Banking History','Historical bank evidence for recurring-payment comparisons and older accounting checks.');
addSource('📄','Team Lee Finance Doc','April 2025 finance notes. Historical context only; newer statements, policies and invoices override it.');

const dropTitles=new Set(['Accounting archive added']);
D.intel=(D.intel||[]).filter(i=>!dropTitles.has(i.title));
const already=t=>D.intel.some(i=>i.title===t);
const prepend=[];
if(!already('Accounting workbook unlocked'))prepend.push({owner:'Family',kind:'action',title:'Accounting workbook unlocked',date:'2 Sep',text:'The 2026-named GlazertCosting files are now readable. Their newest internal sheet is May 2025, so Orbit treats them as a verified historical baseline rather than current 2026 data.',source:'Google Drive · GlazertCosting'});
if(!already('Annie pay reconciliation'))prepend.push({owner:'Annie',kind:'action',title:'Annie pay reconciliation',date:'May-Aug 2026',text:'May 2025 accounting baseline: £3,850/month. Health Board credits seen in the bank: £4,582.60 (27 May), £4,002.59 (24 Jun), £4,049.82 (29 Jul), £4,002.59 (26 Aug). Latest is £152.59 above the old baseline; latest three average £4,018.33.',source:'GlazertCosting May 2025 + Bank of Scotland 2026 statements'});
if(!already('Budget-to-bank matches'))prepend.push({owner:'Family',kind:'action',title:'Budget-to-bank matches',date:'2026',text:'Several older budget lines still match actual payments closely: white-car finance budget £295 vs Alphera £295.30; Annie standing transfer £150 vs £150; Tom football budget £25 vs Stewarton Annick £25.',source:'GlazertCosting May 2025 + Bank of Scotland statements'});
D.intel=[...prepend,...D.intel];

const el=document.getElementById('financeEvidence');
if(el)el.innerHTML=`
<div class="card action"><div class="title">💷 Annie pay · bank-checked</div><div class="meta"><b>Old accounting baseline:</b> £3,850/month (May 2025).<br><b>Actual Health Board credits:</b> May £4,582.60 · Jun £4,002.59 · Jul £4,049.82 · Aug £4,002.59.<br><b>Latest:</b> £4,002.59 — £152.59 above the old baseline. Latest 3-month average: £4,018.33.</div><span class="pill ok">BANK VERIFIED</span></div>
<div class="card"><div class="title">📊 Last internal accounting snapshot · May 2025</div><div class="meta">Income £6,208 (Annie £3,850 + Simon £2,358). Fixed costs £3,403.50 · variable £902.70 · total out £4,306.20 · free £1,901.80. Key historical lines include Santander mortgage £1,077, council tax £445, childcare £200, white-car finance £295. These are baseline figures, not assumed current amounts.</div><span class="pill info">HISTORICAL BASELINE</span></div>
<div class="card"><div class="title">✓ Budget lines confirmed by bank</div><div class="meta">White-car finance: £295 budget vs £295.30 actual. Annie transfer: £150 budget vs £150 actual. Tom football: £25 budget vs £25 actual. Orbit can use these matches to identify recurring payments while still preferring the latest bank transaction.</div><span class="pill ok">CROSS-CHECKED</span></div>
<div class="card"><div class="title">🏦 Evidence order</div><div class="meta">1. Actual bank transaction for what was paid/received. 2. Newest applicable invoice/policy/current record. 3. Accounting workbook as historical baseline. 4. Older finance notes for context. Upload date never makes an old figure current.</div><span class="pill info">SOURCE RULE</span></div>`;
})();