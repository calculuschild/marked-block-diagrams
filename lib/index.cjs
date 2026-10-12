'use strict';

function index() {
  return {
    extensions: [
      {
        name  : 'alignedParagraphs',
        level : 'block',
        start(src) {
          return src.match(/^(?:-:|:-|-:) {1}/m)?.index;
        }, // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
          const alignedParagraphClasses = [];
          alignedParagraphClasses[2] = 'Left';
          alignedParagraphClasses[4] = 'Right';
          alignedParagraphClasses[6] = 'Center';
          const regex = /^(((:-))|((-:))|((:-:))) .+(\n(([^\n].*\n)*(\n|$))|$)/ygm;
          const match = regex.exec(src);
          if (match?.length) {
            let whichAlign;
            if (match[2]?.length) whichAlign = 2;
            if (match[4]?.length) whichAlign = 4;
            if (match[6]?.length) whichAlign = 6;
            return {
              type      : 'alignedParagraphs', // Should match "name" above
              raw       : match[0], // Text to consume from the source
              length    : match[whichAlign].length,
              text      : match[0].slice(match[whichAlign].length),
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

module.exports = index;
