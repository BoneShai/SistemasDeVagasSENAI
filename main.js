const express = require("express");
const sql = require('msnodesqlv8');
const server = express();
const router = express.Router();
const cors = require("cors");
server.use(cors());
server.use(express.json({ extended: true }))

const conexao = "server=.;Database=sistemaDivulgacaoDeVagas;Trusted_connection=yes;Driver={SQL Server Native Client 11.0}";

const getItemIndex = (propriedade, valor, data) =>{
    return data.findIndex((item) => item[propriedade] == valor);
}

router.post('/sendLoginLeanerData', (req, res) => { //record operation
    const dadosLogin = req.body;

    sql.query(conexao, "SELECT * FROM aluno", (error, resultado) => {

        console.log(resultado);
        let index = getItemIndex('n_matricula', req.body.matricula, resultado);
        let indexS = getItemIndex('cpf', req.body.cpf, resultado);
        console.log(resultado[index]);
        console.log(resultado[indexS]);

        if(resultado[index] != undefined && resultado[indexS] != undefined && resultado[indexS] == resultado[index]){
            console.log('logou');
        }else{
            console.log('Não logou');
        }

    })

});

router.post('/registroEmpresas', (req, res) => {

    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO empresa(nome_empresa, cnpj, senha, categoria) VALUES('" + dadosCadastro.nome + "', '" + dadosCadastro.cnpj + "', '" + dadosCadastro.senha + "', '" + dadosCadastro.categoriaEmpresa + "')";

    let get = "SELECT * FROM empresa where cnpj = '" + dadosCadastro.cnpj + "'";


    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

        if (resultado.length >= 1) {
            console.log('isto já existe');
        } else {
            sql.query(conexao, insert, (error, resultado) => {

            })
        }

    })

});

server.use(router);

server.listen(3000, () => {
    console.log('server rodando!');
})




//Cadastro das vagas no banco de dados

router.post('/cadastrarVaga', (req, res) => {

    const dadosCadastro = req.body;
    console.log(dadosCadastro);

    let insert = "INSERT INTO vaga(area, descricao, responsabilidade, jornada, requisitos, localidade, salario, beneficios) VALUES('" + dadosCadastro.area + "', '" + dadosCadastro.descricao + "', '" + dadosCadastro.responsabilidade + "', '" + dadosCadastro.jornada + "' , '" + dadosCadastro.requisitos + "' , '" + dadosCadastro.localidade + "' , '" + dadosCadastro.salario + "' , '" + dadosCadastro.beneficios + "')";

    let get = "SELECT * FROM vaga where descricao = '" + dadosCadastro.descricao + "'";

    sql.query(conexao, get, (error, resultado) => {
        console.log(resultado);

        if (resultado.length >= 1) {
            console.log('isto já existe');
        } else {
            sql.query(conexao, insert, (error, resultado) => {

            })
        }

    })

   

});





//deletar empresa 

// router.delete('/deletarEmpresa', (req, res) => {

//     const dadosCadastro = req.body;
//     const cnpj = dadosCadastro.cnpj; 

//     const deletar = "DELETE FROM empresa WHERE cnpj = '" + cnpj;

//     sql.query(conexao, deletar, (error, resultado) => {

//       if (error) {
//         console.error("Erro ao excluir empresa:", error);
//         res.status(500).json({ error: "Erro interno do servidor" });
//       } else{
//         sql.query(conexao, deletar, (error, resultado) => {

//         })
//       }
//     });
//   });
  
// DELETE FROM empresa WHERE cnpj