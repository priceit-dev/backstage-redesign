/* 커스텀 드롭다운 자동 적용 — 모든 네이티브 <select>를 .select-wrap 컴포넌트로 업그레이드 */
(function(){
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var CHECK = '<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function closeAll(except){
    document.querySelectorAll('.select.open').forEach(function(s){
      if(s!==except){ s.classList.remove('open'); var m=s.parentNode.querySelector('.select-menu'); if(m) m.style.display='none'; }
    });
  }

  function buildFromNative(sel){
    if(sel.dataset.up) return;
    if(sel.multiple) return;
    sel.dataset.up='1';
    var inTime = !!sel.closest('.time-row');
    var wrap=document.createElement('div'); wrap.className='select-wrap'; wrap.dataset.built='1';
    if(inTime){ wrap.style.width='74px'; wrap.style.flexShrink='0'; }
    var trigger=document.createElement('div'); trigger.className='select';
    var label=document.createElement('span');
    label.textContent = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].text : '';
    trigger.appendChild(label);
    trigger.insertAdjacentHTML('beforeend', CHEV);
    var menu=document.createElement('div'); menu.className='select-menu'; menu.style.display='none';
    menu.style.maxHeight='240px'; menu.style.overflowY='auto';   // 긴 목록(24시간 등) 스크롤
    Array.prototype.forEach.call(sel.options, function(o,i){
      var op=document.createElement('div'); op.className='select-option'+(i===sel.selectedIndex?' selected':'');
      op.innerHTML='<span>'+o.text+'</span>'+CHECK;
      op.addEventListener('click', function(e){ e.stopPropagation();
        sel.selectedIndex=i; label.textContent=o.text;
        menu.querySelectorAll('.select-option').forEach(function(x){x.classList.remove('selected');});
        op.classList.add('selected');
        trigger.classList.remove('open'); menu.style.display='none';
        sel.dispatchEvent(new Event('change',{bubbles:true}));
      });
      menu.appendChild(op);
    });
    trigger.addEventListener('click', function(e){ e.stopPropagation();
      var willOpen=!trigger.classList.contains('open'); closeAll(trigger);
      trigger.classList.toggle('open', willOpen); menu.style.display= willOpen?'block':'none';
    });
    wrap.appendChild(trigger); wrap.appendChild(menu);
    sel.parentNode.insertBefore(wrap, sel);
    sel.style.display='none';
  }

  function activateStatic(wrap){
    if(wrap.dataset.built) return;
    var trigger=wrap.querySelector('.select'), menu=wrap.querySelector('.select-menu');
    if(!trigger||!menu) return;                // 메뉴 없는 정적 필터는 건너뜀
    wrap.dataset.built='1';
    menu.style.display = trigger.classList.contains('open') ? 'block' : 'none';
    trigger.addEventListener('click', function(e){ e.stopPropagation();
      var willOpen=!trigger.classList.contains('open'); closeAll(trigger);
      trigger.classList.toggle('open', willOpen); menu.style.display= willOpen?'block':'none';
    });
    menu.querySelectorAll('.select-option').forEach(function(op){
      op.addEventListener('click', function(e){ e.stopPropagation();
        menu.querySelectorAll('.select-option').forEach(function(x){x.classList.remove('selected');}); op.classList.add('selected');
        var t=op.querySelector('span'), lbl=trigger.querySelector('span'); if(t&&lbl) lbl.textContent=t.textContent;
        trigger.classList.remove('open'); menu.style.display='none';
      });
    });
  }

  // 메뉴 없는 정적 필터(.select-wrap)에 옵션 메뉴 생성 (트리거 텍스트 기반 추정)
  function generateMenu(wrap){
    if(wrap.dataset.built || wrap.querySelector('.select-menu')) return;
    var trigger=wrap.querySelector('.select'); if(!trigger) return;
    var span=trigger.querySelector('span'); var cur = span ? span.textContent.trim() : '';
    var opts;
    if(/상태/.test(cur)) opts=['전체 상태','모집중','강의중','종료','준비','보류'];
    else if(/기수/.test(cur)) opts=['전체 기수','2기','1기','0기'];
    else if(/코치|강사/.test(cur)) opts=['전체 코치','슈가보이','정쌤','일당백','길잡','최튼튼'];
    else if(/기간|월/.test(cur)) opts=[cur,'이번 달','지난 달','전체 기간'];
    else opts=[cur];
    var menu=document.createElement('div'); menu.className='select-menu'; menu.style.display='none';
    opts.forEach(function(t){ var op=document.createElement('div'); op.className='select-option'+(t===cur?' selected':''); op.innerHTML='<span>'+t+'</span>'+CHECK; menu.appendChild(op); });
    wrap.appendChild(menu);
  }

  function init(){
    document.querySelectorAll('.select-wrap').forEach(generateMenu);     // 정적 필터에 메뉴 생성
    document.querySelectorAll('.select-wrap').forEach(activateStatic);   // 메뉴형 전부 작동 연결
    document.querySelectorAll('select').forEach(buildFromNative);        // 네이티브 → 커스텀
    document.addEventListener('click', function(){ closeAll(null); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
