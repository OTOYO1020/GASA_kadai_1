(() => {
  const courses={
    basic:[['あさ','morning','asa'],['いぬ','dog','inu'],['ねこ','cat','neko'],['はな','flower','hana'],['みず','water','mizu']],
    special:[['がっこう','school','gakkou'],['きって','postage stamp','kitte'],['しゃしん','photograph','shashin'],['にほん','Japan','nihonn'],['こんにちは','hello','konnichiha']],
    katakana:[['ネコ','cat','neko'],['カメラ','camera','kamera'],['テレビ','television','terebi'],['コーヒー','coffee','ko-hi-'],['タクシー','taxi','takushi-']]
  };
  const $=id=>document.getElementById(id), input=$('practice-input');
  let course='basic',index=0, solved=new Set();
  function answer(){const text=JapaneseIME.convert(input.value.trim(),true).text;return course==='katakana'?JapaneseIME.katakana(text):text;}
  function progress(){$('progress').textContent=`${index+1} / ${courses[course].length} 問 · 正解 ${solved.size} 問`;}
  function show(){
    const [target,meaning]=courses[course][index];
    $('target').textContent=target;$('meaning').textContent=meaning;
    input.value='';$('practice-preview').textContent='—';$('practice-hint').hidden=true;
    $('feedback').textContent='お手本と同じかなを 入れてみましょう。';progress();
  }
  input.addEventListener('input',()=>{$('practice-preview').textContent=answer()||'—';$('feedback').textContent='「たしかめる」で答えを確認しましょう。';});
  $('practice-form').addEventListener('submit',e=>{
    e.preventDefault();
    if(!input.value.trim()){$('feedback').textContent='まず、ローマ字を 入れてみましょう。';return;}
    if(answer()===courses[course][index][0]){solved.add(index);$('feedback').textContent='せいかい！ お手本と同じかなになりました。';}
    else $('feedback').textContent=`もう一度！ お手本「${courses[course][index][0]}」と、あなたの答え「${answer()}」を見比べましょう。ヒントも使えます。`;
    progress();
  });
  $('show-hint').addEventListener('click',()=>{$('practice-hint').textContent=`入力の例：${courses[course][index][2]}`;$('practice-hint').hidden=false;});
  $('next-question').addEventListener('click',()=>{index=(index+1)%courses[course].length;show();input.focus();});
  $('course').addEventListener('change',e=>{course=e.target.value;index=0;solved=new Set();show();});
  const chart=[['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],['や','ya'],['ゆ','yu'],['よ','yo'],['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],['わ','wa'],['を','wo'],['ん','nn']];
  for(const [kana,romaji] of chart){const cell=document.createElement('div'),letter=document.createElement('b'),key=document.createElement('span');letter.textContent=kana;key.textContent=romaji;cell.append(letter,key);$('kana-chart').append(cell);}
  show();
})();
