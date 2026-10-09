# JL Doce & Arte — site com catálogo responsivo

Site estático em **HTML, CSS e JavaScript**, preparado para publicar no GitHub Pages, Netlify, Vercel ou em outra hospedagem de arquivos estáticos.

## Publicação

1. Descompacte o ZIP.
2. Publique **todo o conteúdo da pasta `JL-DoceeArte`**, preservando os caminhos `assets/`, `index.html`, `styles.css` e `script.js`.
3. Abra `index.html` para conferir no navegador.

O telefone de WhatsApp para pedidos fica na constante `WHATSAPP_NUMBER` em `script.js`. Os links de contato estão também no rodapé do `index.html`.

## Catálogo e valores

- **Doces tradicionais**: R$ 160,00 o cento (100 unidades). Beijinho, brigadeiro tradicional, bicho de pé, cajuzinho, dois amores e olho de sogra.
- **Doces gourmet**: R$ 190,00 o cento (100 unidades). Bicho de pé com Nutella, brigadeiro de amendoim, churros com doce de leite, surpresa de uva, brigadeiro de Oreo, Ninho com Nutella e brigadeiro belga.
- As **imagens são ilustrativas** e não representam necessariamente todos os sabores oferecidos. O catálogo fotográfico **não contém preços sobrepostos**; os valores estão nos cards separados.
- O carrinho calcula quantidades em **centos** e envia a solicitação por WhatsApp com observações e sabores desejados.

## Adaptação para celulares e tablets

- Até 600 px de largura, a imagem original é exibida em 10 cartões de fotos individuais para facilitar a leitura. Os arquivos `assets/doce-*.jpg` são recortes da mesma imagem original.
- A partir de 601 px, a foto panorâmica é exibida integralmente. O botão **Ampliar imagem** abre a imagem original; no celular, o usuário pode deslizar para explorar os detalhes.
- As seções de preços, opções, formulário e rodapé se reorganizam automaticamente conforme a largura.
- O carrinho tem área rolável para preservar o botão de finalização mesmo em celulares com pouca altura de tela.
- Cabeçalhos e botões permitem textos em múltiplas linhas; não há necessidade de rolagem horizontal da página.

## Manutenção

- `index.html`: informações, categorias, texto e cardápio.
- `styles.css`: estilos e media queries.
- `script.js`: menu, visualização ampliada, carrinho e WhatsApp.
- `assets/catalogo-doces.jpg`: imagem original fornecida.
- `assets/doce-*.jpg`: fotos individuais para a versão mobile.

**Importante:** ao trocar a imagem panorâmica do catálogo, atualize também os recortes individuais de `assets/doce-*.jpg` para preservar a consistência visual.
