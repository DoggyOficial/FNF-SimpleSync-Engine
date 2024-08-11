class URLReader {
  getInfo() {
    return {
      id: 'urlreader',
      name: 'URL Reader',
      blocks: [
        {
          opcode: 'getParagraphContent',
          blockType: Scratch.BlockType.REPORTER,
          text: 'content of first <p> tag from URL [URL]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://doggyoficial.github.io/FNF-SimpleSync-Engine/'
            }
          }
        }
      ]
    };
  }

  async getParagraphContent(args) {
    const url = args.URL;
    try {
      // Adiciona um parâmetro de cache para evitar problemas de cache
      const cacheBusterUrl = `${url}?cache_buster=${new Date().getTime()}`;
      const response = await fetch(cacheBusterUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const text = await response.text();
      
      // Cria um elemento temporário para parsear o HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      // Seleciona o conteúdo do primeiro <p> tag
      const firstParagraph = doc.querySelector('p');
      
      // Retorna o conteúdo do primeiro <p> ou uma mensagem padrão se não houver
      return firstParagraph ? firstParagraph.textContent : 'No <p> tag found';
    } catch (error) {
      console.error('Failed to fetch or parse data:', error);
      return 'Error';
    }
  }
}

Scratch.extensions.register(new URLReader());
