var userId=null,balance=0,tab='market',coins=[],holdings={},positions=[],control=null,activeCoinId=null,historyMap={},pendingBuyAmt=0;
var DEFAULT_COINS=[
{id:'PEPE',name:'Pepe',symbol:'PEPE',emoji:'🐸',price:0.000012,base:0.000012},
{id:'DOGE',name:'Dogecoin',symbol:'DOGE',emoji:'🐶',price:0.16,base:0.16},
{id:'SHIB',name:'Shiba Inu',symbol:'SHIB',emoji:'🐕',price:0.000024,base:0.000024},
{id:'BONK',name:'Bonk',symbol:'BONK',emoji:'🦴',price:0.000028,base:0.000028},
{id:'WIF',name:'dogwifhat',symbol:'WIF',emoji:'🎩',price:2.4,base:2.4},
{id:'FLOKI',name:'Floki',symbol:'FLOKI',emoji:'⚔️',price:0.00018,base:0.00018},
{id:'BRETT',name:'Brett',symbol:'BRETT',emoji:'🟦',price:0.12,base:0.12},
{id:'POPCAT',name:'Popcat',symbol:'POPCAT',emoji:'😺',price:0.85,base:0.85},
{id:'NEIRO',name:'Neiro',symbol:'NEIRO',emoji:'🐕‍🦺',price:0.0015,base:0.0015},
{id:'MEME',name:'Memecoin',symbol:'MEME',emoji:'😂',price:0.014,base:0.014}
];
function fmt(n,d){d=d==null?6:d;var x=Number(n)||0;if(x>=1)return x.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:4});return x.toFixed(d).replace(/\.?0+$/,'')||'0';}
function fmtUsd(n){return '$'+Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function coinsKey(){return 'pump_fun_coins_v1';}
function holdKey(){return 'pump_holdings_'+userId;}
function posKey(){return 'pump_positions_'+userId;}
function histKey(){return 'pump_history_v1';}
function loadCoinsLocal(){
try{var raw=localStorage.getItem(coinsKey());if(raw){coins=JSON.parse(raw);if(Array.isArray(coins)&&coins.length)return;}}catch(e){}
coins=DEFAULT_COINS.map(function(c){return Object.assign({},c,{change:0,createdBy:null,t0:Date.now(),phaseStart:Date.now()});});
saveCoins();
}
function saveCoins(){try{localStorage.setItem(coinsKey(),JSON.stringify(coins));}catch(e){}}
async function mergeRemoteCoins(){
try{
var res=await client.from('pump_coins').select('*').order('created_at',{ascending:false}).limit(200);
if(res.error||!res.data)return;
res.data.forEach(function(row){
if(!row||!row.id)return;
if(coins.some(function(c){return c.id===row.id;}))return;
coins.unshift({id:row.id,name:row.name||row.symbol||row.id,symbol:row.symbol||row.id,emoji:row.emoji||'🪙',price:Number(row.price)||0.001,base:Number(row.base)||Number(row.price)||0.001,change:0,createdBy:row.created_by||'remote',t0:Date.now(),phaseStart:Date.now()});
});
saveCoins();
}catch(e){}
}
async function publishCoin(coin){
try{await client.from('pump_coins').upsert({id:coin.id,name:coin.name,symbol:coin.symbol,emoji:coin.emoji,price:coin.price,base:coin.base,created_by:userId},{onConflict:'id'});}catch(e){console.warn('pump_coins upsert',e);}
}
function loadHoldings(){try{holdings=JSON.parse(localStorage.getItem(holdKey())||'{}');}catch(e){holdings={};}}
function saveHoldings(){try{localStorage.setItem(holdKey(),JSON.stringify(holdings));}catch(e){}}
function loadPositions(){try{positions=JSON.parse(localStorage.getItem(posKey())||'[]');}catch(e){positions=[];}if(!Array.isArray(positions))positions=[];}
function savePositions(){try{localStorage.setItem(posKey(),JSON.stringify(positions));}catch(e){}}
function loadHistory(){try{historyMap=JSON.parse(localStorage.getItem(histKey())||'{}');}catch(e){historyMap={};}}
function saveHistory(){try{localStorage.setItem(histKey(),JSON.stringify(historyMap));}catch(e){}}
function lockedUnits(coinId){
return positions.filter(function(p){return p.coinId===coinId;}).reduce(function(s,p){return s+(Number(p.units)||0);},0);
}
function freeUnits(coinId){
var have=(holdings[coinId]&&holdings[coinId].units)||0;
return Math.max(0,have-lockedUnits(coinId));
}
async function loadControl(){
control=null;
try{var res=await client.from('profiles').select('pump_control').eq('id',userId).maybeSingle();
if(res.data&&res.data.pump_control)control=typeof res.data.pump_control==='string'?JSON.parse(res.data.pump_control):res.data.pump_control;
}catch(e){}
try{if(!control){var raw=localStorage.getItem('pump_control_'+userId);if(raw)control=JSON.parse(raw);}}catch(e){}
}
function getRule(coin){
if(!control||!control.enabled)return null;
var r=control.coins&&control.coins[coin.id];
if(r&&r.enabled===false)return null;
if(r&&r.enabled)return r;
if(control.default)return Object.assign({enabled:true},control.default);
return null;
}
function applyControlTick(coin){
if(!coin.phaseStart)coin.phaseStart=Date.now();
var rule=getRule(coin);
if(!rule){coin.price=Math.max(coin.price*(1+(Math.random()-0.48)*0.006),1e-12);coin.change=((coin.price-coin.base)/coin.base)*100;pushHist(coin);return;}
var targetX=rule.targetX!=null?Number(rule.targetX):(1+(Number(rule.targetPct)||5)/100);if(targetX<=0)targetX=1;
var durationMs=(Number(rule.durationMin)||5)*60*1000;
var startAfterMs=(Number(rule.startAfterMin)||0)*60*1000;
var dir=rule.direction||'up',after=rule.afterBehavior||'static';
var elapsed=Date.now()-(coin.phaseStart||Date.now());
if(elapsed<startAfterMs){coin.price=Math.max(coin.price*(1+(Math.random()-0.5)*0.001),1e-12);}
else{
var t=Math.min(1,(elapsed-startAfterMs)/Math.max(durationMs,1));
var targetPrice=dir==='down'?coin.base/targetX:(dir==='random'?coin.base*(Math.random()>0.5?targetX:1/targetX):coin.base*targetX);
var desired=coin.base+(targetPrice-coin.base)*t;
coin.price=coin.price*0.7+desired*0.3;
if(t>=1){
if(after==='static')coin.price=desired;
else if(after==='drop')coin.price=Math.max(coin.price*(1-0.004*Math.random()),1e-12);
else if(after==='dump')coin.price=Math.max(coin.price*(1-0.006*Math.random()),1e-12);
else coin.price=coin.price*(1+0.004*Math.random());
}
}
coin.change=((coin.price-coin.base)/coin.base)*100;pushHist(coin);
}
function pushHist(coin){if(!historyMap[coin.id])historyMap[coin.id]=[];historyMap[coin.id].push(coin.price);if(historyMap[coin.id].length>60)historyMap[coin.id].shift();}
function drawChart(coinId){
var canvas=document.getElementById('chart');if(!canvas)return;
var ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
var data=historyMap[coinId]||[];
if(data.length<2){ctx.fillStyle='#64748b';ctx.font='12px sans-serif';ctx.fillText('Waiting for price data…',12,h/2);return;}
var min=Math.min.apply(null,data),max=Math.max.apply(null,data);if(max===min){max=min*1.01;min=min*0.99;}
var up=data[data.length-1]>=data[0];ctx.strokeStyle=up?'#10b981':'#ef4444';ctx.lineWidth=2;ctx.beginPath();
data.forEach(function(p,i){var x=(i/(data.length-1))*(w-8)+4;var y=h-8-((p-min)/(max-min))*(h-16);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});
ctx.stroke();ctx.lineTo(w-4,h);ctx.lineTo(4,h);ctx.closePath();ctx.fillStyle=up?'rgba(16,185,129,0.12)':'rgba(239,68,68,0.12)';ctx.fill();
}
function processAutoClose(){var now=Date.now();positions.slice().forEach(function(pos){if(pos.autoCloseAt&&now>=pos.autoCloseAt)closePosition(pos.id);});}
function closePosition(posId){
var idx=positions.findIndex(function(p){return p.id===posId;});if(idx<0)return;
var pos=positions[idx],coin=coins.find(function(c){return c.id===pos.coinId;});if(!coin)return;
var value=pos.units*coin.price;
if(holdings[pos.coinId])holdings[pos.coinId].units=Math.max(0,(holdings[pos.coinId].units||0)-pos.units);
saveHoldings();positions.splice(idx,1);savePositions();setBalance(balance+value);
if(activeCoinId===pos.coinId){updateDetailHeader();renderDetailPositions();}
updateMemeVal();if(tab==='holdings')renderList();
}
function tick(){
coins.forEach(applyControlTick);saveCoins();saveHistory();processAutoClose();
if(document.getElementById('detail').classList.contains('show')&&activeCoinId){updateDetailHeader();drawChart(activeCoinId);renderDetailPositions();}
else renderList();
updateMemeVal();
}
function updateMemeVal(){
var total=0;Object.keys(holdings).forEach(function(id){var h=holdings[id],c=coins.find(function(x){return x.id===id;});if(c&&h&&h.units)total+=h.units*c.price;});
document.getElementById('meme-val').textContent=fmtUsd(total);
}
function setTab(t){tab=t;document.querySelectorAll('.tab').forEach(function(el){el.classList.toggle('on',el.getAttribute('data-t')===t);});renderList();}
function bindCardClicks(el){el.querySelectorAll('[data-cid]').forEach(function(node){node.onclick=function(){openDetail(node.getAttribute('data-cid'));};});}
function renderList(){
var el=document.getElementById('list');
if(tab==='holdings'){
var ids=Object.keys(holdings).filter(function(id){return holdings[id]&&holdings[id].units>0;});
if(!ids.length){el.innerHTML='<div class="empty">No meme holdings yet. Tap a coin to trade.</div>';return;}
el.innerHTML=ids.map(function(id){
var c=coins.find(function(x){return x.id===id;})||{name:id,symbol:id,emoji:'🪙',price:0,change:0};
var units=holdings[id].units,val=units*c.price,cls=(c.change||0)>=0?'up':'down';
return '<div class="card" data-cid="'+id+'"><div class="coin-row"><div class="coin-left"><div class="emoji">'+(c.emoji||'🪙')+'</div><div><div class="cname">'+c.name+'</div><div class="csym">'+c.symbol+' · '+fmt(units,4)+' units</div></div></div><div><div class="cprice">'+fmtUsd(val)+'</div><div class="chg '+cls+'">'+((c.change||0)>=0?'+':'')+(c.change||0).toFixed(2)+'%</div></div></div></div>';
}).join('');
bindCardClicks(el);return;
}
var list=coins.slice().sort(function(a,b){return Math.abs(b.change||0)-Math.abs(a.change||0);});
el.innerHTML=list.map(function(c){
var cls=(c.change||0)>=0?'up':'down';
var held=holdings[c.id]&&holdings[c.id].units?'<div class="hold">You hold '+fmt(holdings[c.id].units,4)+' · tap to trade</div>':'<div class="hold">Tap for chart & trade</div>';
return '<div class="card" data-cid="'+c.id+'"><div class="coin-row"><div class="coin-left"><div class="emoji">'+(c.emoji||'🪙')+'</div><div><div class="cname">'+c.name+'</div><div class="csym">'+c.symbol+(c.createdBy?' · yours':'')+'</div></div></div><div><div class="cprice">$'+fmt(c.price)+'</div><div class="chg '+cls+'">'+((c.change||0)>=0?'+':'')+(c.change||0).toFixed(2)+'%</div></div></div>'+held+'</div>';
}).join('');
bindCardClicks(el);
}
function openDetail(id){activeCoinId=id;document.getElementById('market-view').classList.add('hide');document.getElementById('detail').classList.add('show');updateDetailHeader();drawChart(id);renderDetailPositions();document.getElementById('d-amt').value='';}
function closeDetail(){activeCoinId=null;document.getElementById('detail').classList.remove('show');document.getElementById('market-view').classList.remove('hide');renderList();}
function updateDetailHeader(){
var c=coins.find(function(x){return x.id===activeCoinId;});if(!c)return;
document.getElementById('d-title').textContent=c.symbol;
document.getElementById('d-emoji').textContent=c.emoji||'🪙';
document.getElementById('d-name').textContent=c.name;
document.getElementById('d-sym').textContent=c.symbol+(c.createdBy?' · created by you':'');
document.getElementById('d-price').textContent='$'+fmt(c.price);
var cls=(c.change||0)>=0?'up':'down';
var chgEl=document.getElementById('d-chg');chgEl.className='chg '+cls;chgEl.textContent=((c.change||0)>=0?'+':'')+(c.change||0).toFixed(2)+'%';
var units=(holdings[c.id]&&holdings[c.id].units)||0;
var free=freeUnits(c.id);
var locked=lockedUnits(c.id);
document.getElementById('d-hold-hint').textContent='Balance '+fmtUsd(balance)+' · Hold '+fmt(units,4)+' (free '+fmt(free,4)+', in positions '+fmt(locked,4)+') · ~'+fmtUsd(units*c.price);
}
function formatLeft(ms){
if(ms<=0)return '0s';
var s=Math.ceil(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60,parts=[];
if(h)parts.push(h+'h');if(m||h)parts.push(m+'m');parts.push(sec+'s');return parts.join(' ');
}
function renderDetailPositions(){
var el=document.getElementById('d-positions');
var list=positions.filter(function(p){return p.coinId===activeCoinId;});
if(!list.length){el.innerHTML='<div class="empty" style="padding:16px">No open positions on this coin. Positions only close with Close now or auto-close.</div>';return;}
var coin=coins.find(function(c){return c.id===activeCoinId;}),now=Date.now();
el.innerHTML=list.map(function(p){
var cur=(coin?coin.price:p.entry)*p.units,pnl=cur-p.amount,pnlCls=pnl>=0?'up':'down';
var timer=p.autoCloseAt?formatLeft(p.autoCloseAt-now):'Manual';
return '<div class="pos-card"><div class="row"><span>Original</span><b>'+fmtUsd(p.amount)+'</b></div><div class="row"><span>Current</span><b>'+fmtUsd(cur)+'</b></div><div class="row"><span>P/L</span><b class="'+pnlCls+'">'+(pnl>=0?'+':'')+fmtUsd(pnl)+'</b></div><div class="row"><span>Auto-close</span><span class="timer">'+timer+'</span></div><button class="btn sell" style="margin-top:8px" data-pid="'+p.id+'">Close now</button></div>';
}).join('');
el.querySelectorAll('[data-pid]').forEach(function(btn){btn.onclick=function(e){e.stopPropagation();closePosition(btn.getAttribute('data-pid'));};});
}
async function refreshBalance(){try{var res=await client.from('profiles').select('balance').eq('id',userId).maybeSingle();if(res.data)balance=Number(res.data.balance)||0;}catch(e){}document.getElementById('bal').textContent=fmtUsd(balance);}
async function setBalance(newBal){balance=newBal;document.getElementById('bal').textContent=fmtUsd(balance);try{await client.from('profiles').update({balance:newBal}).eq('id',userId);}catch(e){}}
function startBuy(){
var amt=parseFloat(document.getElementById('d-amt').value);
if(!amt||amt<=0){alert('Enter amount');return;}
if(amt>balance){alert('Not enough balance');return;}
pendingBuyAmt=amt;
document.getElementById('close-hint').textContent='Buying $'+amt.toFixed(2)+' of '+activeCoinId;
document.getElementById('auto-fields').style.display='none';
document.getElementById('close-cancel-row').style.display='flex';
document.getElementById('t-h').value='0';document.getElementById('t-m').value='0';document.getElementById('t-s').value='30';
document.getElementById('close-modal').classList.add('show');
}
function hideCloseModal(){document.getElementById('close-modal').classList.remove('show');pendingBuyAmt=0;}
function showAutoFields(){document.getElementById('auto-fields').style.display='block';document.getElementById('close-cancel-row').style.display='none';}
function confirmBuyFromFields(){
var h=parseInt(document.getElementById('t-h').value,10)||0;
var m=parseInt(document.getElementById('t-m').value,10)||0;
var s=parseInt(document.getElementById('t-s').value,10)||0;
var total=h*3600+m*60+s;
if(total<=0){alert('Set at least 1 second, or choose Close manually');return;}
confirmBuy(total);
}
async function confirmBuy(autoSec){
var c=coins.find(function(x){return x.id===activeCoinId;});if(!c||!pendingBuyAmt)return;
var amt=pendingBuyAmt;if(amt>balance){alert('Not enough balance');hideCloseModal();return;}
var units=amt/c.price;
if(!holdings[c.id])holdings[c.id]={units:0,spent:0};
holdings[c.id].units+=units;holdings[c.id].spent=(holdings[c.id].spent||0)+amt;saveHoldings();
positions.push({id:'p_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),coinId:c.id,units:units,entry:c.price,amount:amt,openedAt:Date.now(),autoCloseAt:autoSec&&autoSec>0?Date.now()+autoSec*1000:null});
savePositions();c.phaseStart=Date.now();c.base=c.price;saveCoins();
await setBalance(balance-amt);hideCloseModal();updateDetailHeader();renderDetailPositions();updateMemeVal();
}
async function detailSell(){
var c=coins.find(function(x){return x.id===activeCoinId;});if(!c)return;
var amt=parseFloat(document.getElementById('d-amt').value);
if(!amt||amt<=0){alert('Enter how much ($) you want to sell');return;}
var free=freeUnits(c.id);
if(free<=0){
alert('All of this coin is locked in open positions.\n\nSell only works on free coins.\nTo exit a trade, use Close now on that position, or wait for auto-close.');
return;
}
var maxValue=free*c.price;
var value=Math.min(amt,maxValue);
var sellUnits=value/c.price;
if(sellUnits<=0){alert('Nothing to sell');return;}
var have=(holdings[c.id]&&holdings[c.id].units)||0;
holdings[c.id].units=Math.max(0,have-sellUnits);
saveHoldings();
// Do NOT touch positions — they only close via Close now or auto-close
await setBalance(balance+value);
updateDetailHeader();
renderDetailPositions();
updateMemeVal();
}
function openCreate(){document.getElementById('create-modal').classList.add('show');}
function closeCreate(){document.getElementById('create-modal').classList.remove('show');}
async function createCoin(){
var name=(document.getElementById('c-name').value||'').trim();
var sym=(document.getElementById('c-sym').value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
var emoji=(document.getElementById('c-emoji').value||'🪙').trim()||'🪙';
var price=parseFloat(document.getElementById('c-price').value)||0.001;
if(!name||!sym){alert('Name and symbol required');return;}
if(coins.some(function(c){return c.id===sym||c.symbol===sym;})){alert('Symbol already exists');return;}
if(balance<5){alert('Need $5 to launch');return;}
await setBalance(balance-5);
var coin={id:sym,name:name,symbol:sym,emoji:emoji,price:price,base:price,change:0,createdBy:userId,t0:Date.now(),phaseStart:Date.now()};
coins.unshift(coin);saveCoins();await publishCoin(coin);closeCreate();setTab('market');openDetail(sym);
}
async function init(){
var params=new URLSearchParams(location.search),qid=params.get('id');
if(qid){userId=qid;document.getElementById('back-link').href='dashboard.html?id='+encodeURIComponent(qid);}
else{
var session=await client.auth.getSession();
var user=session.data&&session.data.session&&session.data.session.user;
if(!user){var r=await client.auth.getUser();user=r.data&&r.data.user;}
if(!user){location.href='index.html';return;}
userId=user.id;
}
loadCoinsLocal();await mergeRemoteCoins();loadHoldings();loadPositions();loadHistory();await loadControl();await refreshBalance();
renderList();updateMemeVal();
setInterval(tick,1500);setInterval(loadControl,10000);setInterval(mergeRemoteCoins,20000);
}
init();
