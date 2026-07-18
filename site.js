
const menuButton=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('.nav-menu');
menuButton?.addEventListener('click',()=>{
  const open=navMenu?.classList.toggle('open');
  menuButton.classList.toggle('open',Boolean(open));
  menuButton.setAttribute('aria-expanded',String(Boolean(open)));
});
navMenu?.addEventListener('click',e=>{if(e.target.closest('a')){navMenu.classList.remove('open');menuButton?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}});

document.querySelectorAll('[data-tabs]').forEach(group=>{
  const buttons=[...group.querySelectorAll('[data-tab]')];
  const panels=[...document.querySelectorAll(group.dataset.tabs)];
  function activate(id,updateHash=true){
    buttons.forEach(b=>{const active=b.dataset.tab===id;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});
    panels.forEach(p=>p.classList.toggle('active',p.id===id));
    if(updateHash)history.replaceState(null,'',`#${id}`);
  }
  buttons.forEach(b=>b.addEventListener('click',()=>activate(b.dataset.tab)));
  const requested=location.hash.slice(1);
  const initial=panels.some(p=>p.id===requested)?requested:buttons[0]?.dataset.tab;
  if(initial)activate(initial,false);
});

if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(node=>observer.observe(node));
}else{document.querySelectorAll('.reveal').forEach(node=>node.classList.add('visible'))}
