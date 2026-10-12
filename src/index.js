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
      name  : 'blockDiagrams',
      level : 'block',
      renderer(token) {
        return `<p>Blank for now</p>`
      }
    }]
  };

  function transformTokens(tokens) {
    for (const token of tokens) {
      if(token.type !== 'code' || !LANGS.includes(token.lang)) continue;

      const [labelText = '', diagramText = ''] = token.text.split(/\n\s*\n/, 2);

      // Create map of text labels and contents
      const labels = {};

      for(const line of labelText.split('\n')) {
        const match = /&([^:\s]+)\s*:\s*(.*)$/.exec(line);

        if(match) {
          labels[match[1]] = match[2];
        }
      }

      Object.assign(token, {
        type: 'blockDiagram',
        labels,
        diagramText
      });
    }
  }
}
