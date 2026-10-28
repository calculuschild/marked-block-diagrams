export default function() {
  const LANGS = ['blockDiagram'];
	return {
    hooks: {
      processAllTokens(tokens) {
        transformTokens(tokens); //Instead of tokenizer, modify existing `code` tokens detected by Marked.
        return tokens;
      }
    },
		extensions : [{
      name  : 'blockDiagram',
      level : 'block',
      renderer(token) {
        return `<p>Blank for now</p>`
      }
    }]
  };

  const blockRegex = /(\[(\s*[^\]]+)\]/y;
  const connectorRegex = /((?:-+|   {3,})\|?)/y;

  function parseRow(row, line) {
    let position = 0;

    row    = row;
    column = 0;

    while(position < line.length) {
      blockRegex.lastIndex = position;
      const block = blockRegex.exec(line);

      if(block) {
        blocks.push({
            raw: block[0],
            id : block[1].trim(),
            row : row,
            column : column,
        });
      }

      column += 1;

      position = blockRegex.lastIndex;
      connectorRegex.lastIndex = position;
      const connector = connectorRegex.exec(line);

      if(connector) {
        connectors.push({
            raw: block[0],
            id : block[1].trim(),
            row : row,
            column : column,
        });
      };
    }

  blocks = [];
  connectors = [];
  
  function transformTokens(tokens) {
    for (const token of tokens) {
      if(token.type !== 'code' || !LANGS.includes(token.lang)) continue;

      const [labelText = '', diagramText = ''] = token.text.split(/\n\s*\n/, 2);

      // Create map of text labels and contents
      const labels = {};

      for(const [row, line] of labelText.split('\n').entries()) {
        // Fetch all definitions
        const blockMatch = /^([^:\s]+)\s*:\s*(.*)$/.exec(line);

        if(blockMatch) {
          labels[match[1]] = match[2];
        }
      }

      for(const line of diagramText.split('\n')) {
        parseRow(row, line);
      }

      Object.assign(token, {
        type: 'blockDiagram',
        labels,
        diagramText
      });
    }
  }
}
