import { marked } from 'marked';
import alignedParagraphs from '../src/index.js';

function trimLines(s) {
	return s.split('\n').map((l)=>l.trim()).join('\n');
}

describe('Aligned Text', ()=>{
	beforeEach(()=>{
		marked.setOptions(marked.getDefaults());
	});

	test('Left Aligned', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:- Hello`))).toMatchSnapshot();
	});

	test('Right Aligned', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`-: Hello`))).toMatchSnapshot();
	});

	test('Center Aligned', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:-: Hello`))).toMatchSnapshot();
	});

	test('Ignored inside a code block', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines('```\n\n:- Hello\n\n```\n'))).toMatchSnapshot();
	});

	test('Center Alignment does not trigger mid-line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`Start of line :-: Hello`))).toMatchSnapshot();
	});

	test('Left Alignment does not trigger mid-line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`Start of line :- Hello`))).toMatchSnapshot();
	});

	test('Right Alignment does not trigger mid-line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`Start of line -: Hello`))).toMatchSnapshot();
	});

	test('Center Alignment supports multiple hyphens', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:-------: Hello`))).toMatchSnapshot();
	});

	test('Left Alignment supports multiple hyphens', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:------- Hello`))).toMatchSnapshot();
	});

	test('Right Alignment supports multiple hyphens', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`-------: Hello`))).toMatchSnapshot();
	});

	test('Center Alignment can be used in the preceding line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:-------:\nHello`))).toMatchSnapshot();
	});

	test('Left Alignment can be used in the preceding line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:-------\nHello`))).toMatchSnapshot();
	});

	test('Right Alignment can be used in the preceding line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`-------:\nHello`))).toMatchSnapshot();
	});

	test('Does not override simple 1-column 1-row tables', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`Header\n:-------:\nCell`))).toMatchSnapshot();
	});

	test('Is not valid if missing at least one space or newline after the marker', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:-:Hello`))).toMatchSnapshot();
	});

	test('Ends after a blank line', ()=>{
		marked.use(alignedParagraphs());
		expect(marked(trimLines(`:-: Line 1\nLine 2\nLine3\n\nNot centered`))).toMatchSnapshot();
	});
});
