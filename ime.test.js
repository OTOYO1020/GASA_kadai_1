const {test}=require('node:test');
const assert=require('node:assert/strict');
const {convert,candidates}=require('./ime');
test('romaji, punctuation, and mixed input',()=>{
  for(const [input,expected] of Object.entries({nihongo:'にほんご',konnichiha:'こんにちは',gakkou:'がっこう',shashin:'しゃしん',"kan'i":'かんい',kanni:'かんに',kanya:'かにゃ',kya:'きゃ',xtsu:'っ',"ko-hi-.":'こーひー。','日本go':'日本ご',nn:'ん'}))assert.equal(convert(input,true).text,expected,input);
});
test('unfinished input is preserved until commit',()=>{
  assert.deepEqual(convert('nihon'),{text:'にほ',pending:'n'});
  assert.equal(convert('nihon',true).text,'にほん');
  assert.deepEqual(convert('ky'),{text:'',pending:'ky'});
  assert.equal(convert('xyz',true).text,'xyz');
});
test('dictionary candidates and kana fallback',()=>{
  assert.deepEqual(candidates('nihongo'),['日本語','にほんご','ニホンゴ']);
  assert.deepEqual(candidates('hashi'),['橋','箸','端','はし','ハシ']);
  assert.deepEqual(candidates('foobar'),['ふぉおばr','フォオバr']);
});
