/* 커스텀 날짜 선택 자동 적용 — 모든 <input type="date">를 .dp 달력 컴포넌트로 업그레이드 */
(function(){
  var CAL='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  function p2(n){ return (n<10?'0':'')+n; }
  function fmt(y,m,d){ return y+'. '+p2(m+1)+'. '+p2(d)+'.'; }

  function build(input){
    if(input.dataset.dp) return;
    input.dataset.dp='1';
    var hasVal = /^\d{4}-\d{2}-\d{2}$/.test(input.value);
    var y=2026, m=6, d=13;
    if(hasVal){ var pp=input.value.split('-'); y=+pp[0]; m=+pp[1]-1; d=+pp[2]; }
    var view={y:y,m:m}, sel= hasVal ? {y:y,m:m,d:d} : null, pend=null;
    var wrap=document.createElement('div'); wrap.className='dp';
    wrap.innerHTML =
      '<div class="dp-field"><span class="dp-label'+(hasVal?'':' empty')+'">'+(hasVal?fmt(y,m,d):'연도. 월. 일.')+'</span>'+CAL+'</div>'+
      '<div class="dp-pop"><div class="dp-head"><div class="dp-title"></div><div class="dp-navs"><button type="button" class="dp-nav dp-prev">‹</button><button type="button" class="dp-nav dp-next">›</button></div></div>'+
      '<div class="dp-week"><span class="sun">일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>'+
      '<div class="dp-grid"></div>'+
      '<div class="dp-foot"><button type="button" class="dp-cancel">취소</button><button type="button" class="ok dp-ok">확인</button></div></div>';
    input.style.display='none';
    input.parentNode.insertBefore(wrap, input);
    var pop=wrap.querySelector('.dp-pop'), label=wrap.querySelector('.dp-label'), title=wrap.querySelector('.dp-title'), grid=wrap.querySelector('.dp-grid');
    function render(){
      title.textContent = view.y+'년 '+(view.m+1)+'월';
      var first=new Date(view.y,view.m,1).getDay(), days=new Date(view.y,view.m+1,0).getDate(), prev=new Date(view.y,view.m,0).getDate();
      grid.innerHTML=''; var cur=pend||sel;
      function mk(t,cls,day){ var b=document.createElement('button'); b.type='button'; b.className='dp-day'+(cls?' '+cls:''); b.textContent=t; if(day) b.onclick=function(){ pend={y:view.y,m:view.m,d:day}; render(); }; return b; }
      for(var i=first-1;i>=0;i--) grid.appendChild(mk(prev-i,'other'));
      for(var dd=1;dd<=days;dd++){ var s=(cur&&cur.y===view.y&&cur.m===view.m&&cur.d===dd)?'sel':''; grid.appendChild(mk(dd,s,dd)); }
      var tr=(7-(first+days)%7)%7; for(var t=1;t<=tr;t++) grid.appendChild(mk(t,'other'));
    }
    wrap.querySelector('.dp-field').onclick=function(e){ e.stopPropagation(); document.querySelectorAll('.dp-pop.open').forEach(function(pp2){ if(pp2!==pop) pp2.classList.remove('open'); }); pop.classList.toggle('open'); if(pop.classList.contains('open')){ pend=null; view={y:sel.y,m:sel.m}; render(); } };
    wrap.querySelector('.dp-prev').onclick=function(){ view.m--; if(view.m<0){view.m=11;view.y--;} render(); };
    wrap.querySelector('.dp-next').onclick=function(){ view.m++; if(view.m>11){view.m=0;view.y++;} render(); };
    wrap.querySelector('.dp-cancel').onclick=function(){ pop.classList.remove('open'); pend=null; };
    wrap.querySelector('.dp-ok').onclick=function(){ if(pend) sel=pend; if(sel){ label.textContent=fmt(sel.y,sel.m,sel.d); label.classList.remove('empty'); input.value=sel.y+'-'+p2(sel.m+1)+'-'+p2(sel.d); input.dispatchEvent(new Event('change',{bubbles:true})); } pop.classList.remove('open'); };
    render();
  }

  function init(){
    document.querySelectorAll('input[type=date]').forEach(build);
    document.addEventListener('click', function(e){ document.querySelectorAll('.dp').forEach(function(r){ if(!r.contains(e.target)){ var pp=r.querySelector('.dp-pop'); if(pp) pp.classList.remove('open'); } }); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
