(function (root) {
  const rows = {
    a:'あ',i:'い',u:'う',e:'え',o:'お',
    ka:'か',ki:'き',ku:'く',ke:'け',ko:'こ',ga:'が',gi:'ぎ',gu:'ぐ',ge:'げ',go:'ご',
    sa:'さ',shi:'し',si:'し',su:'す',se:'せ',so:'そ',za:'ざ',ji:'じ',zi:'じ',zu:'ず',ze:'ぜ',zo:'ぞ',
    ta:'た',chi:'ち',ti:'ち',tsu:'つ',tu:'つ',te:'て',to:'と',da:'だ',di:'ぢ',du:'づ',de:'で',do:'ど',
    na:'な',ni:'に',nu:'ぬ',ne:'ね',no:'の',ha:'は',hi:'ひ',fu:'ふ',hu:'ふ',he:'へ',ho:'ほ',
    ba:'ば',bi:'び',bu:'ぶ',be:'べ',bo:'ぼ',pa:'ぱ',pi:'ぴ',pu:'ぷ',pe:'ぺ',po:'ぽ',
    ma:'ま',mi:'み',mu:'む',me:'め',mo:'も',ya:'や',yu:'ゆ',yo:'よ',ra:'ら',ri:'り',ru:'る',re:'れ',ro:'ろ',wa:'わ',wo:'を',wi:'うぃ',we:'うぇ',vu:'ゔ',
    sha:'しゃ',shu:'しゅ',sho:'しょ',cha:'ちゃ',chu:'ちゅ',cho:'ちょ',ja:'じゃ',ju:'じゅ',jo:'じょ',
    fa:'ふぁ',fi:'ふぃ',fe:'ふぇ',fo:'ふぉ',she:'しぇ',che:'ちぇ',je:'じぇ',tsa:'つぁ',tsi:'つぃ',tse:'つぇ',tso:'つぉ',
    '-':'ー',',':'、','.':'。','[':'「',']':'」','/':'・'
  };
  for (const [prefix,kana] of Object.entries({ky:'き',gy:'ぎ',sy:'し',zy:'じ',jy:'じ',ty:'ち',cy:'ち',dy:'ぢ',ny:'に',hy:'ひ',by:'び',py:'ぴ',my:'み',ry:'り'})) {
    for (const [v,k] of Object.entries({a:'ゃ',u:'ゅ',o:'ょ'})) rows[prefix+v]=kana+k;
  }
  for(const p of ['x','l']) for(const [v,k] of Object.entries({a:'ぁ',i:'ぃ',u:'ぅ',e:'ぇ',o:'ぉ',ya:'ゃ',yu:'ゅ',yo:'ょ',tu:'っ',tsu:'っ',wa:'ゎ'})) rows[p+v]=k;
  const keys=Object.keys(rows).sort((a,b)=>b.length-a.length);
  function convert(input, final=false) {
    let source=input.toLowerCase(), text='',i=0;
    while(i<source.length) {
      const rest=source.slice(i),c=source[i],next=source[i+1];
      if(c==='n') {
        if(next==="'") {text+='ん';i+=2;continue;}
        if(next==='n') {text+='ん';i+=(source[i+2]&&/[aiueoy]/.test(source[i+2]))?1:2;continue;}
        if((next&&!/[aiueoy]/.test(next))||(!next&&final)){text+='ん';i++;continue;}
      }
      if(next===c&&/[bcdfghjkmprstvwxyz]/.test(c)){text+='っ';i++;continue;}
      const key=keys.find(k=>rest.startsWith(k));
      if(key){text+=rows[key];i+=key.length;continue;}
      if(!final&&keys.some(k=>k.startsWith(rest))) return {text,pending:rest};
      text+=c;i++;
    }
    return {text,pending:''};
  }
  const dictionary={
    'にほん':['日本','二本'],'にほんご':['日本語'],'こんにちは':['こんにちは'],'ありがとう':['ありがとう','有難う'],
    'きょう':['今日','京'],'あした':['明日'],'きのう':['昨日'],'わたし':['私'],'ぼく':['僕'],
    'とうきょう':['東京'],'おおさか':['大阪'],'きょうと':['京都'],'がっこう':['学校'],'がくせい':['学生'],
    'せんせい':['先生'],'べんきょう':['勉強'],'しごと':['仕事'],'かいしゃ':['会社'],'かいぎ':['会議'],
    'へんかん':['変換','返還'],'にゅうりょく':['入力'],'かんじ':['漢字','感じ'],'ひらがな':['平仮名'],
    'てんき':['天気','転機'],'はれ':['晴れ'],'あめ':['雨','飴'],'ねこ':['猫'],'いぬ':['犬'],
    'やま':['山'],'かわ':['川','河'],'うみ':['海'],'はな':['花','鼻'],'みず':['水'],'おちゃ':['お茶'],
    'おはよう':['おはよう'],'たのしい':['楽しい'],'うれしい':['嬉しい'],'おいしい':['美味しい'],
    'じかん':['時間'],'でんわ':['電話'],'ともだち':['友達'],'なまえ':['名前'],'おんがく':['音楽'],
    'せかい':['世界'],'みらい':['未来'],'かんせい':['完成','感性'],'さくら':['桜'],'はし':['橋','箸','端']
  };
  function katakana(s){return s.replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+0x60));}
  function candidates(raw){const r=convert(raw,true).text;return [...new Set([...(dictionary[r]||[]),r,katakana(r)])];}
  const api={convert,candidates,katakana,dictionary};
  if(typeof module!=='undefined')module.exports=api;else root.JapaneseIME=api;
})(typeof window!=='undefined'?window:globalThis);
