const memories=[
{title:'31 OCTOBRE',image:'photos/01.jpg',text:`Ce 31 octobre, c'était Halloween.\n\nEt pour l'occasion, deux créatures particulièrement terrifiantes étaient de sortie.\n\nEnfin… surtout une.\n\nJe te laisse deviner laquelle. 🐰`},
{title:'LES COPAINS',image:'photos/02.jpg',text:`Parce que les meilleurs moments,\nc'est quand même mieux avec les bonnes personnes autour de soi.\n\nEt de ce côté-là, je crois que tu es plutôt bien entourée.`},
{title:'LES GENS',image:'photos/03.jpg',text:`Et puis il y a ce pote…\n\nCelui qui, mine de rien,\na fini par te suivre un peu partout cette année.`},
{title:'SOIRÉES CULTURELLES',image:'photos/04.jpg',text:`On a même fait des soirées culturelles dans le froid.\n\nDes lumières, du son, et cette très bonne idée de sortir quand les températures commencent à nous rappeler qu'on aurait pu rester au chaud.`},
{title:'LE REFUGE',image:'photos/05.jpg',text:`Mais on a toujours fini par trouver refuge dans ce bar pour se réchauffer.\n\nÀ force, je crois qu'il mérite presque sa place officielle dans l'histoire.`},
{title:'LES ARCHIVES',image:'photos/06.jpg',text:`On en a pris beaucoup, des photos là-bas.\n\nCertaines sont de très bons souvenirs.\n\nD'autres… je ne suis pas totalement sûr qu'elles devraient sortir un jour. :)`},
{title:'BRICOLAGE',image:'photos/07.jpg',text:`On a aussi fait quelques sessions bricolage.\n\nAvec parfois de vraies réussites.\n\nLa table de cuisine peut témoigner.`},
{title:'LA RANDO',image:'photos/08.jpg',text:`Et puis tu as pris le temps de m'initier à la randonnée.\n\nEnfin… après avoir retrouvé le chemin.`},
{title:'PREUVE DE VIE',image:'photos/09.jpg',text:`Après huit heures de marche, il fallait quand même envoyer une photo.\n\nPas pour nous.\n\nJuste pour rassurer les parents sur le fait qu'on était toujours en vie.`},
{title:'LE BON MOMENT',image:'photos/10.jpg',text:`J'ai aussi appris qu'il existe un moment très précis pour prendre une photo de toi.\n\nEt parfois, ce moment arrive exactement quand tu as l'air d'en chier. :)`},
{title:'LES CLÉS',image:'photos/11.jpg',text:`Tu m'as donné les clés pour que je puisse me débrouiller tout seul.\n\nAlors je suis parti.\n\nEt j'ai fini par croiser des chamois.`},
{title:'PHOTOGRAPHE',image:'photos/12.jpg',text:`Je pense pouvoir dire, sans trop exagérer, que je suis devenu ton meilleur photographe de montagne.\n\nIl faut reconnaître que le modèle aide un peu.`},
{title:'PRESQUE',image:'photos/13.jpg',text:`Bon… sauf quand je te prends par surprise.\n\nOu que je cadre n'importe comment.\n\nMême les grands photographes ont leurs jours sans.`},
{title:'LE PLAN',image:'photos/14.jpg',text:`On est aussi partis avec une amie à moi.\n\nÀ voir nos trois têtes sur cette photo, c'était peut-être pas notre meilleure idée.\n\nMais ça fait une très bonne archive.`},
{title:'UN ÉTÉ EN OR',image:'photos/15.jpg',text:`Dans tous les cas, j'ai passé un super été sous le signe de la crème solaire, des kilomètres et des plans plus ou moins maîtrisés.\n\nMais surtout avec une amie en or. ☀️`}
];

// Mets ici la date du premier souvenir à débloquer. Format : AAAA-MM-JJ.
// Pour tester les 15 pages immédiatement : const STORY_START = null;
const STORY_START=null;
let current=0;
const $=id=>document.getElementById(id);
function unlockedCount(){if(!STORY_START)return memories.length;const start=new Date(STORY_START+'T00:00:00');const now=new Date();start.setHours(0,0,0,0);now.setHours(0,0,0,0);return Math.max(0,Math.min(memories.length,Math.floor((now-start)/86400000)+1))}
function showMemory(i){const unlocked=unlockedCount();if(i<0||i>=unlocked)return;current=i;const m=memories[i];$('intro').classList.add('hidden');$('historyView').classList.add('hidden');$('memoryView').classList.remove('hidden');$('counter').textContent=`${String(i+1).padStart(2,'0')} / ${String(memories.length).padStart(2,'0')}`;$('chapter').textContent=m.title;$('memoryImage').src=m.image;$('memoryImage').onerror=()=>{$('memoryImage').removeAttribute('src');$('memoryImage').alt=`Ajoute ${m.image} dans le dépôt`};$('memoryText').textContent=m.text;$('discovered').textContent=`${unlocked} souvenir${unlocked>1?'s':''} découvert${unlocked>1?'s':''}`;$('prevBtn').disabled=i===0;$('nextBtn').disabled=i>=unlocked-1;window.scrollTo({top:0,behavior:'smooth'})}
function showHistory(){const unlocked=unlockedCount();$('memoryView').classList.add('hidden');$('historyView').classList.remove('hidden');$('historyList').innerHTML=memories.map((m,i)=>i<unlocked?`<article class="history-card" data-i="${i}"><img src="${m.image}" alt=""><div><small>${String(i+1).padStart(2,'0')} / 15</small><h3>${m.title}</h3></div></article>`:`<article class="history-card locked"><div class="lock-photo">🔒</div><div><small>${String(i+1).padStart(2,'0')} / 15</small><h3>À découvrir</h3></div></article>`).join('');document.querySelectorAll('.history-card[data-i]').forEach(el=>el.onclick=()=>showMemory(Number(el.dataset.i)));window.scrollTo(0,0)}
$('startBtn').onclick=()=>showMemory(Math.max(0,unlockedCount()-1));$('prevBtn').onclick=()=>showMemory(current-1);$('nextBtn').onclick=()=>showMemory(current+1);$('historyBtn').onclick=showHistory;$('closeHistory').onclick=()=>showMemory(current);
