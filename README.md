# Sobre o Repositório
  - Código compartilhado do Projeto Integrador 5 do curso de Ciência da Computação do Unifagoc.

# Rotas
## /user
  ### Login
    post /login
      Request:
        {
          "email": "",
          "password": "
        }

      Response: 
        {
          "error": false,
          "tokens": {
              "accessToken": "",
              "refreshToken": ""
          },
          "user": {
              "cargo": "",
              "id": ""
          }
        }

  ### Register
    post /register
      Request:
        {
          "username": "",
          "email": "",
          "password": ""
        }

      Response: 
        {
          "error": false,
          "tokens": {
              "accessToken": "",
              "refreshToken": ""
          },
          "user": {
              "id": ,
              "username": "",
              "email": "",
              "cargo": ""
          }
        }


  ### Refresh_token
    put /refresh_token
      Request: cookies.refresh_token

      Response: 
        {
          "accessToken": "",
          "refreshToken": ""
        }

      delete /refresh_token
      Response: 
        {
          "message": "Refresh token deleted."
        }
      

## /quiz
  ### Quiz
    put /quiz
      Request:
        {
          "idprofessor": ""
        }

      Response: 
        {
          "error": "false",
          "message": "Todos os questionários desse professor",
          "questionarios": []
        }

    post /quiz
      Request:
        {
          "titulo": ""
        }

      Response: 
        { 
          "error": false, 
          "message": "Criado um questionário para o professor/a com o titulo {req.body.titulo}" 
        }

    delete /quiz
      Request:
        {
          "id": ""
        }

      Response: 
        { 
          "error": false, 
          "message": "Questionário deletado"
        }

  ### Questao
    put /questao
      Request: 
        {
          "idquestionario": ""
        }

      Response: 
        {
          "error": false,
          message: "Todas as questões desse questionario",
          questoes: []
        }

    post /questao
      Request: 
        {
          "idquestionario": "",
          "enunciado": ""
        }

      Response: 
        {
          "error": false,
          message: "Questão inserida com sucesso"
        }

    post /responderquestao
      Request: 
        {
          "idaluno": "",
          "idquestao": "",
          "idalternativa": ""
        }

      Response: 
        {
          "error": false,
          message: "Questão respondida com sucesso"
        }
      
      delete /questao
        Request: 
          {
            "idquestao": "",
            "idquestionario": ""
          }

        Response:
          {
            "error": false,
            "message": "Questão deletada"
          }

  ### Alternativa
    put /alternativa
      Request:
        {
          "idquestao": ""
        }

      Response:
        { 
          "error": false, 
          "message": "Alternativas dessa questão", 
          "alternativas": []
        }

    post /alternativa
      Request: 
        {
          "idquestao": 2,
          "alternativa": [
              {
                  "texto": "Arroz",
                  "correta": false
              },
              {
                  "texto": "Batata",
                  "correta": false
              },
              {
                  "texto": "Carne",
                  "correta": true
              }
          ]
        }

      Response: 
        {
          "error": false,
          "message": "Alternativas dessa questão foram adicionadas",
          "alternativas": [
            {
              "texto": "Arroz",
              "correta": false
            },
            {
              "texto": "Batata",
              "correta": false
            },
            {
              "texto": "Carne",
              "correta": true
            }
          ]
        }

## /grupo
  ### Grupo
    post /grupo
      Request: 
        {
          "nome": "",
          "turmaid": ""
          
        }

      Response: 
        {
          "error": false,
          "message": "Grupo criado com sucesso!",
          "grupoid": "ID DO GRUPO"
        }

    post /addaluno
      Request: 
        {
          "idaluno": "",
          "idgrupo": ""
          
        }

      Response: 
        {
          "error": false,
          "message": "Aluno adicionado com sucesso!"
        }

## /turma
  ### Turma
    post /turma
      Request: 
        {
          "escola": "",
          "grau": "",
          "periodo": ""
          
        }

      Response: 
        {
          "error": false,
          "message": "Turma criada com sucesso!",
          "turmaid": "ID DA TURMA"
        }

    post /addaluno
      Request: 
        {
          "idaluno": "",
          "idturma": ""
          
        }

      Response: 
        {
          "error": false,
          "message": "Aluno adicionado com sucesso!"
        }

# Tecnologias Utilizadas
  - [Node.js](https://nodejs.org/en/)

## :computer: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Gaspor">
        <img style="border-radius: 50%;" src="https://github.com/Gaspor.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Ramon Costa</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/Gaspor" title="Ramon Costa">💻</a>
    </td>
    <td align="center">
      <a href="https://github.com/Fri5Day">
        <img style="border-radius: 50%;" src="https://github.com/Fri5Day.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Victor Amaral</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/Fri5Day" title="Victor Amaral">💻</a>
    </td>
    <td align="center">
      <a href="https://github.com/LeirbagTI">
        <img style="border-radius: 50%;" src="https://github.com/LeirbagTI.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Gabriel Campos</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/LeirbagTI" title="Gabriel Campos">💻</a>
    </td>
    <td align="center">
      <a href="https://github.com/X86Max">
        <img style="border-radius: 50%;" src="https://github.com/X86Max.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Maxsuel Matilde</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/X86Max" title="Maxsuel Matilde">💻</a>
    </td>
  </tr>

  <tr>
    <td align="center">
      <a href= "">
        <img style="border-radius: 50%;" src="https://github.com/LucasFilgueiras.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Lucas Filgueiras</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/LucasFilgueiras" title="Lucas Filgueiras">💻</a>
    </td>
    <td align="center">
      <a href= "">
        <img style="border-radius: 50%;" src="https://github.com/vmodesto.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Victor Modesto</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/vmodesto" title="Victor Modesto">💻</a>
    </td>
    <td align="center">
      <a href= "">
        <img style="border-radius: 50%;" src="https://github.com/Guta101.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Gustavo Tartaglia</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/Guta101" title="Gustavo Tartaglia">💻</a>
    </td>
    <td align="center">
      <a href= "">
        <img style="border-radius: 50%;" src="https://github.com/FelipeVerneck.png" width="100px;" alt=""/>
        <br/><sub>
          <b>Felipe Verneck</b>
        </sub>
      </a>
      <br/>
      <a href="https://github.com/FelipeVerneck" title="Felipe Verneck">💻</a>
    </td>
  </tr>
</table>
