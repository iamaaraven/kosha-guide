(function(){
"use strict";
const D=window.__KOSHA_DATA;
const {STORAGE,LETTER,VOWELS,WEST,CN_ANIMALS,CN_ELEMENTS,CN_TRAITS,CN_COMPAT,LIFE,DAYS,LUCKY_DAY,COLORS,EL_COLOR,STYLE,AUTO,TECH,GEM_NOTE,NUDGES}=D;
function reduce(n){n=Math.abs(n|0);while(n>9&&n!==11&&n!==22&&n!==33){n=String(n).split("").reduce((a,d)=>a+(+d),0);}return n;}
function reduceSingle(n){n=Math.abs(n|0);while(n>9)n=String(n).split("").reduce((a,d)=>a+(+d),0);return n;}
function sunSign(m,d){const t=[[1,20,"Capricorn","Aquarius"],[2,19,"Aquarius","Pisces"],[3,21,"Pisces","Aries"],[4,20,"Aries","Taurus"],[5,21,"Taurus","Gemini"],[6,21,"Gemini","Cancer"],[7,23,"Cancer","Leo"],[8,23,"Leo","Virgo"],[9,23,"Virgo","Libra"],[10,23,"Libra","Scorpio"],[11,22,"Scorpio","Sagittarius"],[12,22,"Sagittarius","Capricorn"]];const row=t[m-1];return d<row[1]?row[2]:row[3];}
function chineseZodiac(year){return{animal:CN_ANIMALS[(year-4)%12],element:CN_ELEMENTS[Math.floor(((year-4)%10)/2)]};}
function chineseYear(y,m,d){let cy=y;if(m<2||(m===2&&d<4))cy=y-1;return cy;}
function letterSum(name,filter){let s=0;for(const ch of name.toUpperCase()){if(!LETTER[ch])continue;if(filter==="vowel"&&!VOWELS.has(ch))continue;if(filter==="consonant"&&VOWELS.has(ch))continue;s+=LETTER[ch];}return s;}
function ordinalSum(name){let s=0;for(const ch of name.toUpperCase()){const c=ch.charCodeAt(0);if(c>=65&&c<=90)s+=(c-64);}return s;}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function compute(input){
  const name=input.name.trim().replace(/\s+/g," ");
  const [ys,ms,ds]=input.dob.split("-").map(Number);
  const sign=sunSign(ms,ds);const w=WEST[sign];
  const cy=chineseYear(ys,ms,ds);const cn=chineseZodiac(cy);
  const digSum=String(ys)+String(ms).padStart(2,"0")+String(ds).padStart(2,"0");
  const lifePath2=reduce(digSum.split("").reduce((a,d)=>a+(+d),0));
  const destiny=reduce(letterSum(name,null));
  const soul=reduce(letterSum(name,"vowel"));
  const personality=reduce(letterSum(name,"consonant"));
  const gem=ordinalSum(name);const gemR=reduceSingle(gem);
  const styleKey=w.vibe;
  const luckyNums=[lifePath2,destiny,soul,personality,ms,ds].filter((v,i,a)=>a.indexOf(v)===i).slice(0,5);
  const cols=[...(COLORS[lifePath2]||COLORS[reduceSingle(lifePath2)]||COLORS[1]),...(EL_COLOR[w.el]||[])].slice(0,4);
  const seen=new Set();const luckyColors=[];for(const c of cols){if(!seen.has(c.n)){seen.add(c.n);luckyColors.push(c);}}
  const weekday=new Date().getDay();
  const nudgeMap=NUDGES[weekday]||NUDGES[0];
  const nudge=nudgeMap[lifePath2]||nudgeMap[reduceSingle(lifePath2)]||"Move gently and notice what feels true.";
  return{name,dob:input.dob,tob:input.tob||"",gender:input.gender||"",
    western:{sign,el:w.el,planet:w.planet,blurb:w.blurb,vibe:styleKey},
    chinese:{year:cy,animal:cn.animal,element:cn.element,traits:CN_TRAITS[cn.animal],compat:CN_COMPAT[cn.animal]},
    numbers:{lifePath:lifePath2,destiny,soul,personality,lifeMeaning:LIFE[lifePath2]||LIFE[reduceSingle(lifePath2)],destMeaning:LIFE[destiny]||LIFE[reduceSingle(destiny)],soulMeaning:LIFE[soul]||LIFE[reduceSingle(soul)],persMeaning:LIFE[personality]||LIFE[reduceSingle(personality)]},
    gematria:{sum:gem,reduced:gemR,note:GEM_NOTE[gemR]},
    lucky:{numbers:luckyNums,colors:luckyColors,day:LUCKY_DAY[lifePath2]||LUCKY_DAY[reduceSingle(lifePath2)]||"Friday"},
    vibes:{style:STYLE[styleKey],auto:AUTO[styleKey],tech:TECH[styleKey]},
    nudge:{weekday:DAYS[weekday],text:nudge},savedAt:new Date().toISOString()};
}
function render(r){
  document.getElementById("nudge").innerHTML=`<div class="l">Today's nudge · ${esc(r.nudge.weekday)}</div><p>${esc(r.nudge.text)}</p>`;
  document.getElementById("western").innerHTML=`<h2><span class="ico">☉</span> Western astrology</h2><p class="sub">Sun sign from birth date · entertainment framing</p><span class="pill">${esc(r.western.sign)}</span><span class="pill cyan">${esc(r.western.el)}</span><span class="pill gold">Ruled by ${esc(r.western.planet)}</span><p class="blurb">${esc(r.western.blurb)}${r.tob?` Birth time noted (${esc(r.tob)}) for reflection — chart houses not calculated.`:``}</p>`;
  document.getElementById("chinese").innerHTML=`<h2><span class="ico">龍</span> Chinese astrology</h2><p class="sub">Animal + element from lunar year (~Feb 4 pivot)</p><span class="pill">${esc(r.chinese.animal)}</span><span class="pill cyan">${esc(r.chinese.element)} ${esc(r.chinese.animal)}</span><span class="pill gold">Year ${r.chinese.year}</span><p class="blurb"><strong>Traits:</strong> ${esc(r.chinese.traits)}</p><p class="blurb"><strong>Compatibility hint:</strong> often flows with ${esc(r.chinese.compat)} energy (playful, not destiny).</p>`;
  const n=r.numbers;
  document.getElementById("numerology").innerHTML=`<h2><span class="ico">❸</span> Numerology</h2><p class="sub">Pythagorean-style reductions · entertainment</p><div class="grid2"><div class="mini"><div class="t">Life Path</div><div class="v">${n.lifePath}</div><div class="d">${esc(n.lifeMeaning)}</div></div><div class="mini"><div class="t">Destiny / Expression</div><div class="v">${n.destiny}</div><div class="d">${esc(n.destMeaning)}</div></div><div class="mini"><div class="t">Soul Urge (vowels)</div><div class="v">${n.soul}</div><div class="d">${esc(n.soulMeaning)}</div></div><div class="mini"><div class="t">Personality (consonants)</div><div class="v">${n.personality}</div><div class="d">${esc(n.persMeaning)}</div></div></div>`;
  document.getElementById("gematria").innerHTML=`<h2><span class="ico">ℵ</span> Gematria</h2><p class="sub">English ordinal (A=1…Z=26) · playful note</p><div class="kv"><div><span>Name ordinal sum</span><strong>${r.gematria.sum}</strong></div><div><span>Reduced digit</span><strong>${r.gematria.reduced}</strong></div></div><p class="blurb">${esc(r.gematria.note)}</p>`;
  const colorHtml=r.lucky.colors.map(c=>`<span class="pill"><span class="swatch" style="background:${c.c}"></span>${esc(c.n)}</span>`).join("");
  document.getElementById("lucky").innerHTML=`<h2><span class="ico">☘</span> Lucky profile</h2><p class="sub">Mapped from numbers &amp; sign elements</p><div class="kv"><div><span>Lucky numbers</span><strong>${r.lucky.numbers.join(" · ")}</strong></div><div><span>Lucky day</span><strong>${esc(r.lucky.day)}</strong></div></div><div style="margin-top:8px">${colorHtml}</div>`;
  const v=r.vibes;
  document.getElementById("vibes").innerHTML=`<h2><span class="ico">◎</span> Brand &amp; style vibes</h2><p class="sub">Energy matches only — not ads or endorsements</p><div class="mini" style="margin-bottom:8px"><div class="t">Clothing</div><div class="v">${esc(v.style.label)}</div><div class="d">Examples: ${v.style.brands.map(esc).join(" · ")}</div></div><div class="mini" style="margin-bottom:8px"><div class="t">Auto vibe</div><div class="v">${esc(v.auto.label)}</div><div class="d">Marque vibes: ${v.auto.ex.map(esc).join(" · ")}</div></div><div class="mini"><div class="t">Tech vibe</div><div class="v">${esc(v.tech.label)}</div><div class="d">Categories: ${v.tech.ex.map(esc).join(" · ")}</div></div>`;
  document.getElementById("results").classList.add("show");
  document.getElementById("clearBtn").style.display="block";
  document.getElementById("results").scrollIntoView({behavior:"smooth",block:"start"});
}
function save(r){try{localStorage.setItem(STORAGE,JSON.stringify(r));}catch(e){}}
function load(){try{const raw=localStorage.getItem(STORAGE);if(!raw)return null;return JSON.parse(raw);}catch(e){return null;}}
const form=document.getElementById("form");
const err=document.getElementById("err");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const dob=document.getElementById("dob").value;
  if(!name||!dob||!/^\d{4}-\d{2}-\d{2}$/.test(dob)){err.style.display="block";return;}
  err.style.display="none";
  const input={name,dob,tob:document.getElementById("tob").value,gender:document.getElementById("gender").value};
  const r=compute(input);save(r);render(r);
});
document.getElementById("clearBtn").addEventListener("click",()=>{
  localStorage.removeItem(STORAGE);
  document.getElementById("results").classList.remove("show");
  document.getElementById("clearBtn").style.display="none";
  form.reset();
});
const prev=load();
if(prev&&prev.name&&prev.dob){
  document.getElementById("name").value=prev.name;
  document.getElementById("dob").value=prev.dob;
  if(prev.tob)document.getElementById("tob").value=prev.tob;
  if(prev.gender)document.getElementById("gender").value=prev.gender;
  const r=compute({name:prev.name,dob:prev.dob,tob:prev.tob,gender:prev.gender});
  save(r);render(r);
}
})();
