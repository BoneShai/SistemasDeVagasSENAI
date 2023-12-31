var empresaID;
var empresa;


const exibirPrompt = (mensagem) => {
    Swal.fire({
        title: "Teste",
        text: mensagem,
        icon: "success"
      });
};

  document.addEventListener('DOMContentLoaded', function () {
    const deletarEmpresaBtn = document.getElementById('deletarEmpresaBtn');

    deletarEmpresaBtn.addEventListener('click', function () {
        const empresaID = document.getElementById("idEmpresa").value
        deletaVaga(empresaID);
    });
});


const deletaVaga = async (cnpj) => {
  console.log('Iniciando deleção da empresa com ID:', cnpj);

  const url = `http://localhost:3000/login/deletarEmpresa/${cnpj}`;
  const init = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  };

  try {
      console.log('Antes da chamada fetch');

      const response = await fetch(url, init);
      const resultado = await response.json();

      if (resultado.status === 200) {
          console.log('Sucesso na deleção');
          exibirPrompt('Empresa deletada com sucesso');
      } else {
          console.log('Erro na deleção');
          exibirPrompt('Não foi possível deletar a empresa');
      }
  } catch (error) {
      console.error('Erro na solicitação:', error);
      exibirPrompt('Erro na solicitação. Por favor, tente novamente mais tarde.');
  }
};



