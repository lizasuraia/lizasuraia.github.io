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

const topButton=document.querySelector('.back-to-top');
const updateTopButton=()=>{const visible=window.scrollY>300;topButton.classList.toggle('visible',visible);topButton.tabIndex=visible?0:-1;topButton.setAttribute('aria-hidden',String(!visible));};
window.addEventListener('scroll',updateTopButton,{passive:true});updateTopButton();
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));

const studyAnimationButton=document.querySelector('.study-animation-toggle');
studyAnimationButton.addEventListener('click',()=>{const paused=document.querySelector('.education-illustration').classList.toggle('paused');studyAnimationButton.setAttribute('aria-pressed',String(paused));studyAnimationButton.setAttribute('aria-label',paused?'Play education animation':'Pause education animation');studyAnimationButton.textContent=paused?'▷':'Ⅱ';});

const envelopeContainer=document.querySelector('#contact-envelope-animation');
if(envelopeContainer&&window.lottie&&window.CONTACT_ANIMATION){
 const envelopeReduced=matchMedia('(prefers-reduced-motion: reduce)');
 const envelopePlayer=lottie.loadAnimation({container:envelopeContainer,renderer:'svg',loop:true,autoplay:!envelopeReduced.matches,animationData:JSON.parse(JSON.stringify(window.CONTACT_ANIMATION)),rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});
 envelopePlayer.addEventListener('DOMLoaded',()=>{if(envelopeReduced.matches)envelopePlayer.goToAndStop(0,true);});
 envelopeReduced.addEventListener('change',()=>envelopeReduced.matches?envelopePlayer.pause():envelopePlayer.play());
 const envelopeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!envelopeReduced.matches)envelopePlayer.play();else envelopePlayer.pause();}));
 envelopeObserver.observe(envelopeContainer);
}

// Resume available by request, with native dialog keyboard/focus behavior.
const resumeRequestDialog=document.querySelector('#resume-request-dialog');
document.querySelector('#get-resume').addEventListener('click',()=>resumeRequestDialog.showModal());
document.querySelector('.resume-request-close').addEventListener('click',()=>resumeRequestDialog.close());
resumeRequestDialog.addEventListener('click',event=>{if(event.target===resumeRequestDialog){const box=resumeRequestDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)resumeRequestDialog.close();}});

// Route resume requests to the on-page Contact section.
document.querySelector('#resume-contact-link').addEventListener('click',()=>{resumeRequestDialog.close();});

// A border highlight follows the pointer around each professional/study card.
document.querySelectorAll('.experience-card,.education-card').forEach(card=>{
 card.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const rect=card.getBoundingClientRect();const angle=Math.atan2(event.clientY-rect.top-rect.height/2,event.clientX-rect.left-rect.width/2)*180/Math.PI+35;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)card.style.setProperty('--card-glow-angle',angle+'deg');card.style.setProperty('--card-glow-opacity','1');});
 card.addEventListener('pointerleave',()=>card.style.removeProperty('--card-glow-opacity'));
});
