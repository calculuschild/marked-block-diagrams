import { runAllMarkedSpecTests } from '@markedjs/testutils';
import alignedParagraphs from '../src/index.js';

runAllMarkedSpecTests({ addExtension: (marked)=>{ marked.use({ extensions: [alignedParagraphs] }); }, outputCompletionTables: true });
