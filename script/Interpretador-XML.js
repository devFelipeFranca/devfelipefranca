//Interpredador de Arquivos XML.
//Para ultilizar o script, link o script em uma pagina html,
//na mesma pagina crie uma div com id xml-content.

const url = "./content.xml"; //Informo onde está meu arquivo a ser usado.
const dadosSolicitados = ["date", "title", "content"];//O conteúdo que irei buscar dentro do arquivo deve ser informado em sequencia.
const adicionarElemento = (tag, item) => {//Após o elemento ser capturado, será atribuido para ao html de acordo com o elemento capturado.
  switch (tag) {
    case 'date':
      $("#xml-content").append(`
      <h3>${item}</h3>
      `);
    break;
    case 'title':
      $("#xml-content").append(`
      <h1>${item}</h1>
      `);
    break;
    case 'content':
      $("#xml-content").append(`
      <p>${item}</p>
      <hr>
      `);
    break;
    default:
    break;
  }
};
const sePreciso = (item) => {//Verifica se o item passado como parametro é o item que esta sendo solicitado.
  const simOuNao = dadosSolicitados.find((element) => element === item);
  return simOuNao;
};
$.ajax(url)//Usei o Ajax para ler o arquivo atravez do url passado.
  .done((arquivoXML) => {//Caso a leitura tenha sucesso, verifica em dadosSolicitados e realizar o processo de adicionar o elemento.
    const tags = Object.values($(arquivoXML)[0].all);//Maneira que encontrei de capturar todas as tags em um array.
    tags.forEach((item) => {
      if (sePreciso(item.tagName)) adicionarElemento(item.tagName, item.innerHTML);
    });
  })
  .fail(() => console.log("Ocorreu um erro ao ler o arquivo xml"));//Caso a leitura do documento der algum erro por algum motivo.
