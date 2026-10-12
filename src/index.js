export default function() {
	return {
		extensions : [
			{
				name  : 'alignedParagraphs',
				level : 'block',
				start(src) {
					return src.match(/^(?:-+:|:-+|-+:) {1}/m)?.index;
				}, // Hint to Marked.js to stop and check for a match
				tokenizer(src, tokens) {
					const alignedParagraphClasses = [];
					alignedParagraphClasses[1] = 'Center';
					alignedParagraphClasses[2] = 'Left';
					alignedParagraphClasses[3] = 'Right';
					const regex = /^(?:(:-+:)|(:-+)|(-+:))(?: +| *\n)(([^\n]+(\n|$))+)/ygm;
					const match = regex.exec(src);
					if(match?.length) {
						let whichAlign;
						if(match[1]?.length) whichAlign = 1;
						if(match[2]?.length) whichAlign = 2;
						if(match[3]?.length) whichAlign = 3;
						return {
							type      : 'alignedParagraphs', // Should match "name" above
							raw       : match[0], // Text to consume from the source
							length    : match[whichAlign].length,
							text      : match[0].slice(-1 * match[4].length),
							alignment : alignedParagraphClasses[whichAlign],
							tokens    : this.lexer.inlineTokens(match[0].slice(match[whichAlign].length + 1))
						};
					}
				},
				renderer(token) {
					return `<p align="${token.alignment}">${this.parser.parseInline(token.tokens)}</p>`;
				}
			}
		]
	};
}
