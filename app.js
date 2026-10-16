const grid=document.querySelector('#project-grid');
let filter='All',expanded=false;
function renderProjects(){
 const selected=window.PROJECTS.filter(p=>filter==='All'||p.category===filter);
 const visible=expanded?selected:selected.slice(0,6);
 grid.innerHTML=visible.map((p,i)=>'<article class="project-card '+(['jalshiri','vacation','mosque','trade'].includes(p.id)?'landscape':'')+'"><button class="project-image" data-project="'+p.id+'" aria-label="View '+p.title+'"><img src="assets/'+p.image+'.webp" alt="'+p.title+' — architectural visualisation" loading="lazy" width="900" height="900"><span class="open-arrow" aria-hidden="true">↗</span></button><div class="project-meta"><div><h3><a href="#project-'+p.id+'" data-project="'+p.id+'">'+p.title+'</a></h3><p>'+p.place+'</p></div><span>'+p.category+'</span></div></article>').join('');
 document.querySelector('#project-count').textContent='Showing '+visible.length+' of '+selected.length+' projects';
 document.querySelector('#show-more').hidden=selected.length<=6;
 document.querySelector('#show-more').innerHTML=(expanded?'Show fewer projects':'View all projects')+' <span>'+(expanded?'−':'+')+'</span>';
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;expanded=false;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderProjects()}));
document.querySelector('#show-more').addEventListener('click',()=>{expanded=!expanded;renderProjects();if(!expanded)document.querySelector('#work').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
const dialog=document.querySelector('#project-dialog');let opener;
function openProject(id,trigger){const p=window.PROJECTS.find(x=>x.id===id);if(!p)return;opener=trigger;document.querySelector('#project-detail').innerHTML='<div class="detail-header"><p class="eyebrow">'+p.category+' / '+p.type+'</p><h2 id="project-title">'+p.title+'</h2><p>'+p.place+'</p></div><img class="detail-lead" src="assets/'+(p.cover||p.gallery[0])+'.webp" alt="'+p.title+' architectural view"><div class="detail-copy"><div><h3>About the project</h3><p>'+p.description+'</p><h3>Contribution</h3><p>'+p.scope+'</p></div><dl class="detail-facts">'+[['Practice',p.practice],['Site area',p.size],['Role',p.role],['Design credit',p.credit]].map(([k,v])=>'<div><dt>'+k+'</dt><dd>'+v+'</dd></div>').join('')+'</dl></div><div class="detail-gallery">'+p.gallery.filter(x=>x!==(p.cover||p.gallery[0])).map((img,i)=>'<img src="assets/'+img+'.webp" alt="'+p.title+' — detail '+(i+1)+'" loading="lazy">').join('')+'</div><p class="detail-note">Professional project contributions and design credits are shown as documented in the supplied portfolio.</p>';document.body.classList.add('modal-open');dialog.showModal();dialog.scrollTop=0;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(b){e.preventDefault();openProject(b.dataset.project,b)}});
document.querySelector('#close-project').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus()});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.querySelector('span').textContent=open?'−':'+'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.querySelector('span').textContent='+'}));
renderProjects();

const animationButton=document.querySelector('.animation-toggle');
animationButton?.addEventListener('click',()=>{const paused=document.querySelector('.architecture-stage').classList.toggle('paused');animationButton.setAttribute('aria-pressed',String(paused));animationButton.setAttribute('aria-label',paused?'Play architecture animation':'Pause architecture animation');animationButton.firstElementChild.textContent=paused?'▷':'Ⅱ';});
