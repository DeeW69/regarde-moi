const memories=[
{title:'31 OCTOBRE',image:'photos/03-09-26.jpg',text:`Ce 31 octobre, c'était Halloween.\n\nEt pour l'occasion, deux créatures particulièrement terrifiantes étaient de sortie.\n\nEnfin… surtout une.\n\nJe te laisse deviner laquelle. 🐰`},
{title:'LES COPAINS',image:'photos/04-09-26.jpg',text:`Parce que les meilleurs moments,\nc'est quand même mieux avec les bonnes personnes autour de soi.\n\nEt de ce côté-là, je crois que tu es plutôt bien entourée.`},
{title:'LES GENS',image:'photos/05-09-26.jpg',text:`Et puis il y a ce pote…\n\nCelui qui, mine de rien,\na fini par te suivre un peu partout cette année. 🙂`},
{title:'LA CULTURE',image:'photos/06-09-26.jpg',text:`On a même essayé d'être des gens cultivés.\n\nDes spectacles, des lumières, de belles choses…\n\n…et surtout beaucoup trop de temps passé à se geler dehors.`},
{title:'LE REFUGE',image:'photos/07-09-26.jpg',text:`Heureusement, on avait notre refuge.\n\nToujours le même.\n\nQuelques bières, un peu de chaleur…\n\net généralement aucune envie de rentrer tout de suite.`},
{title:'LES ARCHIVES',image:'photos/08-09-26.jpg',text:`On a d'ailleurs pris pas mal de photos là-bas.\n\nCertaines très jolies.\n\nD'autres…\n\ndisons simplement qu'elles resteront classées archives confidentielles. 🍺`},
{title:'BRICOLAGE',image:'photos/09-09-26.jpg',text:`On a aussi bricolé.\n\nEnfin…\n\nOn avait des outils, du bois et un objectif.\n\nDonc techniquement, ça compte comme du bricolage.`},
{title:"L'INITIATION",image:'photos/10-09-26.jpg',text:`Et puis un jour, tu m'as initié à la randonnée.\n\nTu m'as appris à marcher pendant des heures,\nà chercher mon chemin…\n\nBon.\n\nPour le deuxième point, cette photo ne joue pas vraiment en ta faveur.`},
{title:'TOUJOURS VIVANTS',image:'photos/11-09-26.jpg',text:`Après 8 heures de marche, il restait une étape indispensable :\n\nenvoyer une photo aux parents.\n\nPreuve officielle que :\n\noui, nous étions toujours vivants.`},
{title:'LA MONTAGNE',image:'photos/12-09-26.jpg',text:`Et j'ai découvert quelque chose.\n\nLa montagne, c'est magnifique.\n\nLes paysages sont incroyables.\n\nEt parfois…\n\ntoi aussi, tu en chies. 😂`},
{title:"L'AUTONOMIE",image:'photos/13-09-26.jpg',text:`Mais tu m'avais donné les clés.\n\nAlors j'ai commencé à partir tout seul.\n\nÀ chercher mes propres chemins.\n\nEt un jour, au détour de l'un d'eux…\n\nj'ai rencontré ce monsieur. 🐐`},
{title:'LE PHOTOGRAPHE',image:'photos/14-09-26.jpg',text:`Avec le temps, j'ai également développé une compétence indispensable :\n\nphotographe officiel de tes aventures en montagne.\n\nEt franchement…\n\nje pense mériter une petite augmentation.`},
{title:'PRESQUE TOUJOURS',image:'photos/15-09-26.jpg',text:`Bon.\n\nPhotographe officiel, peut-être.\n\nBon photographe, ça dépend des jours.\n\nParce que parfois je dégaine trop vite…\n\net le cadrage devient une notion assez abstraite.`},
{title:"L'EXCELLENTE IDÉE",image:'photos/01-09-26.jpg',text:`Et puis on est partis à trois.\n\nSur le papier :\n\nexcellente idée.\n\nQuelques heures plus tard, au vu de nos trois têtes…\n\nle conseil d'administration semblait légèrement moins convaincu.`},
{title:'CET ÉTÉ',image:'photos/02-09-26.jpg',text:`Et finalement, quand je repense à cet été…\n\nje vois beaucoup de kilomètres,\n\nquelques plans discutables,\n\ndes galères,\n\ndes paysages incroyables,\n\nbeaucoup trop de crème solaire,\n\net surtout beaucoup de bons souvenirs.\n\nAlors merci pour tout ça.\n\nJ'ai passé un super été avec une amie en or. ☀️\n\nEt puis…\n\n15 photos pour raconter tout ça, c'était peut-être un peu ambitieux.\n\nHeureusement, j'avais prévu autre chose.\n\nÀ suivre.`}
];

const STORY_START='2026-10-31';
let current=0;
const $=id=>document.getElementById(id);
const previewParam=new URLSearchParams(location.search).get('preview');

function parisDateString(date=new Date()){
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
}
function dayNumber(dateString){return Math.floor(Date.parse(dateString+'T00:00:00Z')/86400000);}
function unlockedCount(){
  if(previewParam){const n=Number(previewParam);if(Number.isFinite(n))return Math.max(0,Math.min(memories.length,n));}
  return Math.max(0,Math.min(memories.length,dayNumber(parisDateString())-dayNumber(STORY_START)+1));
}
function showMemory(i){
  const unlocked=unlockedCount();if(i<0||i>=unlocked)return;
  current=i;const m=memories[i];
  $('intro').classList.add('hidden');$('historyView').classList.add('hidden');$('memoryView').classList.remove('hidden');
  $('counter').textContent=`${String(i+1).padStart(2,'0')} / ${String(memories.length).padStart(2,'0')}`;
  $('chapter').textContent=m.title;$('memoryImage').src=m.image;$('memoryImage').alt=`Souvenir ${String(i+1).padStart(2,'0')}`;
  $('memoryText').textContent=m.text;$('discovered').textContent=`${unlocked} souvenir${unlocked>1?'s':''} découvert${unlocked>1?'s':''}`;
  $('prevBtn').disabled=i===0;$('nextBtn').disabled=i>=unlocked-1;
  localStorage.setItem('regardeMoiLastSeen',String(unlocked));window.scrollTo({top:0,behavior:'smooth'});
}
function showHistory(){
  const unlocked=unlockedCount();$('memoryView').classList.add('hidden');$('historyView').classList.remove('hidden');
  $('historyList').innerHTML=memories.map((m,i)=>i<unlocked?`<article class="history-card" data-i="${i}"><img src="${m.image}" alt="Souvenir ${i+1}"><div><small>${String(i+1).padStart(2,'0')} / 15</small><h3>${m.title}</h3></div></article>`:`<article class="history-card locked"><div class="lock-photo">🔒</div><div><small>${String(i+1).padStart(2,'0')} / 15</small><h3>À découvrir</h3></div></article>`).join('');
  document.querySelectorAll('.history-card[data-i]').forEach(el=>el.onclick=()=>showMemory(Number(el.dataset.i)));window.scrollTo(0,0);
}
function prepareIntro(){
  const unlocked=unlockedCount(),startBtn=$('startBtn');
  if(unlocked===0){$('intro').querySelector('p').innerHTML=`Le premier souvenir arrive demain.<br>Pas avant. 👀`;startBtn.textContent='Reviens demain';startBtn.disabled=true;return;}
  const lastSeen=Number(localStorage.getItem('regardeMoiLastSeen')||0);
  if(lastSeen>0&&unlocked>lastSeen)startBtn.textContent='Un nouveau souvenir →';else if(lastSeen>=unlocked)startBtn.textContent="Revoir l'histoire";
}
$('startBtn').onclick=()=>showMemory(Math.max(0,unlockedCount()-1));$('prevBtn').onclick=()=>showMemory(current-1);$('nextBtn').onclick=()=>showMemory(current+1);$('historyBtn').onclick=showHistory;$('closeHistory').onclick=()=>showMemory(current);prepareIntro();
