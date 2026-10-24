const reading=document.querySelector('#reading'), output=document.querySelector('#document');
const preview=document.querySelector('#preview'), choices=document.querySelector('#candidates');
let selected=-1, list=[];
function count(){document.querySelector('#count').textContent=`${Array.from(output.value).length} 文字`;}
function render(reset=true){
  if(reset)selected=-1;
  const value=JapaneseIME.convert(reading.value);
  preview.replaceChildren();
  if(!reading.value){const hint=document.createElement('span');hint.className='muted';hint.textContent='変換中の文字がここに表示されます';preview.append(hint);}
  else {preview.append(document.createTextNode(selected>=0?list[selected]:value.text));if(selected<0&&value.pending){const pending=document.createElement('span');pending.className='pending';pending.textContent=value.pending;preview.append(pending);}}
  list=reading.value?JapaneseIME.candidates(reading.value):[];
  choices.replaceChildren();
  list.forEach((candidate,i)=>{const b=document.createElement('button');b.textContent=candidate;b.classList.toggle('selected',selected===i);b.setAttribute('aria-pressed',String(selected===i));b.addEventListener('click',()=>commit(candidate));choices.append(b);});
}
function commit(text){
  if(!reading.value)return;
  const value=typeof text==='string'?text:(selected>=0?list[selected]:JapaneseIME.convert(reading.value,true).text);
  output.setRangeText(value,output.selectionStart,output.selectionEnd,'end');
  reading.value='';render();count();reading.focus();
}
reading.addEventListener('input',()=>render());
reading.addEventListener('keydown',e=>{
  if(e.isComposing||e.keyCode===229)return;
  if(e.key==='Enter'){e.preventDefault();commit();}
  else if(e.key===' '&&reading.value){e.preventDefault();selected=(selected+(e.shiftKey?-1:1)+list.length)%list.length;render(false);}
  else if(e.key==='Escape'){e.preventDefault();if(selected>=0){selected=-1;render(false);}else{reading.value='';render();}}
});
document.querySelector('#commit').addEventListener('click',()=>commit());
output.addEventListener('input',count);
document.querySelector('#copy').addEventListener('click',async()=>{
  const status=document.querySelector('#status');
  try{await navigator.clipboard.writeText(output.value);status.textContent='コピーしました';}
  catch{output.focus();output.select();status.textContent='テキストを選択しました。Ctrl+C / ⌘C でコピーしてください';}
});
render();count();
