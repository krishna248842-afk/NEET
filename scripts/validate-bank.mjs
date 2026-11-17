import { questionBank, chapters as actualChapters } from '../src/questions.js';

const chapters = [
  'The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom',
  'Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Structural Organisation in Animals',
  'Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division',
  'Photosynthesis in Higher Plants', 'Respiration in Plants', 'Plant Growth and Development',
  'Digestion and Absorption', 'Breathing and Exchange of Gases', 'Body Fluids and Circulation',
  'Excretory Products and their Elimination', 'Sexual Reproduction in Flowering Plants',
  'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance and Variation',
  'Molecular Basis of Inheritance', 'Evolution', 'Human Health and Disease',
  'Microbes in Human Welfare', 'Biotechnology: Principles and Processes',
  'Biotechnology and its Applications', 'Organisms and Populations', 'Ecosystem',
  'Biodiversity and Conservation', 'Environmental Issues', 'Neural Control and Coordination',
];
const TARGET = 400;
const errors = [];
const warnings = [];
const ids = new Map();
const chapterQuestions = new Map(chapters.map(chapter => [chapter, []]));

function normalizedStem(value) {
  return value.toLocaleLowerCase('en')
    .replace(/^choose the correct answer:\s*/,'')
    .replace(/^a student revises .+?\. which statement is correct\?\s*/,'')
    .replace(/^for neet biology, identify the correct match:\s*/,'')
    .replace(/^which option best completes the ncert-aligned statement\?\s*/,'')
    .replace(/^concept check\s*[—-].+?:\s*/,'')
    .replace(/^select the most accurate answer\.\s*/,'')
    .replace(/^which of the following is correct regarding .+?\?\s*/,'')
    .replace(/^in a single-best-answer question on .+?, the answer is:\s*/,'')
    .replace(/^recall the key fact from .+?:\s*/,'')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
}

const missingChapters = chapters.filter(chapter => !actualChapters.includes(chapter));
const unexpectedChapters = actualChapters.filter(chapter => !chapters.includes(chapter));
if (missingChapters.length) errors.push(`Missing chapter data: ${missingChapters.join(', ')}`);
if (unexpectedChapters.length) errors.push(`Unexpected chapter labels: ${unexpectedChapters.join(', ')}`);

for (const question of questionBank) {
  if (!question.id || !question.chapter || !question.question) {
    errors.push(`Record missing id, chapter, or stem: ${JSON.stringify(question).slice(0,140)}`);
    continue;
  }
  if (ids.has(question.id)) errors.push(`Duplicate ID ${question.id}`);
  ids.set(question.id, question.chapter);
  if (!chapterQuestions.has(question.chapter)) continue;
  chapterQuestions.get(question.chapter).push(question);
  if (!Array.isArray(question.options) || question.options.length !== 4 || question.options.some(x=>typeof x!=='string'||!x.trim())) {
    errors.push(`${question.id}: expected exactly four non-empty options`);
  } else if (new Set(question.options.map(x=>x.normalize('NFKC').trim().replace(/\s+/g,' '))).size !== 4) {
    errors.push(`${question.id}: duplicate options`);
  }
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) errors.push(`${question.id}: invalid answer index`);
  if (typeof question.explanation !== 'string' || question.explanation.trim().length < 30) errors.push(`${question.id}: explanation is missing or too short`);
}

let total = 0;
console.log(`Question bank: ${questionBank.length} records; required: ${chapters.length * TARGET}`);
console.log('Per-chapter completion:');
for (const chapter of chapters) {
  const items = chapterQuestions.get(chapter);
  total += items.length;
  const normalized = new Map();
  for (const item of items) {
    const key=normalizedStem(item.question);
    const prior=normalized.get(key);
    if (prior) errors.push(`${chapter}: duplicate/templated stem after wrapper removal (${prior} and ${item.id})`);
    else normalized.set(key,item.id);
  }
  const state=items.length===TARGET?'COMPLETE':'INCOMPLETE';
  console.log(`- ${chapter}: ${items.length}/${TARGET} ${state}`);
  if(items.length!==TARGET) errors.push(`${chapter}: expected exactly ${TARGET}, found ${items.length}`);
}
if(total!==chapters.length*TARGET) errors.push(`Expected ${chapters.length*TARGET} total chapter questions, found ${total}`);
if(warnings.length) console.warn(warnings.join('\n'));
if(errors.length){
  console.error(`\nVALIDATION FAILED (${errors.length} issues). This bank must not be labelled complete.`);
  console.error(errors.slice(0,80).map(e=>`- ${e}`).join('\n'));
  if(errors.length>80) console.error(`… plus ${errors.length-80} more issues`);
  process.exitCode=1;
}else{
  console.log('\nVALIDATION PASSED: every chapter has exactly 400 validated questions.');
}
