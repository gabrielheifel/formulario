import React from 'react';
import Axios from 'axios';
import MaskedInput from 'react-text-mask';

import './styles.css';

function limpa_form_cep() {
  document.getElementById('logradouro').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('estado').value = ("");
}

const getAddress = async cep => {
  try {
    const address = (await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data;
    // console.log(address);
    if (!("erro" in address)) {

      document.getElementById('logradouro').value = (address.logradouro);
      document.getElementById('bairro').value = (address.bairro);
      document.getElementById('cidade').value = (address.localidade);
      document.getElementById('estado').value = (address.uf);

    } else {
      limpa_form_cep();
      alert("CEP não encontrado.");
    }
  } catch (err) {
    console.error(err);
    alert('No response.');
  }
}

function eventCep(event) {
  const valor = (event.target.value);
  const cep = valor.replace(/\D/g, '');

  if (cep !== "") {
    var validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
      document.getElementById('logradouro').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('estado').value = "...";

      getAddress(cep);

    } else {
      alert('Formato de CEP inválido.');
      limpa_form_cep();
    }
  } else {
    limpa_form_cep();
  }
}

function handleChange() {
  const inputs = document.querySelectorAll('[required]');

  for(let input of inputs) {
    if(!input.checkValidity()){
      input.classList.add('invalid');
    }else{
      input.classList.remove('invalid');
    }
  }
}

function handleSubmit() {
  alert("Formulário enviado com sucesso!");
}

function App() {
  return (
    <div className="App">
      <form action="." method="get" className="form" onSubmit={handleSubmit} >
        <fieldset className="container">
          <legend>Formulário</legend>
          <div className="pag1">
            <label className="nome" htmlFor="nome">Nome* <br/></label>
            <input type="text" id="nome" required autoFocus />

            <label className="email" htmlFor="email">E-mail* <br/></label>
            <input type="email" id="email" required />

            <label className="telefone" htmlFor="telefone">Telefone* <br/></label>
            <MaskedInput
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              type="tel" id="telefone"
              required
            />

            <label className="cep" htmlFor="cep">CEP* <br/></label>
            <MaskedInput
              mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
              type="text" id="cep" minLength="8"
              onBlur={eventCep} required
            />
            
            <label className="logradouro" htmlFor="logradouro">Logradouro* <br/></label>
            <input type="text" id="logradouro" required />

            <p> * Campos obrigatórios.</p>

          </div>
          <div className="pag2">
            <label className="numero" htmlFor="numero">Número* <br/></label>
            <input type="text" id="numero" required />

            <label className="complemento" htmlFor="complemento">Complemento <br/></label>
            <input type="text" id="complemento" />

            <label className="bairro" htmlFor="bairro">Bairro* <br/></label>
            <input type="text" id="bairro" required />

            <label className="cidade" htmlFor="cidade">Cidade* <br/></label>
            <input type="text" id="cidade" required />

            <label className="estado" htmlFor="estado">Estado* <br/></label>
            <input type="text" id="estado" required />

            <button className="enviar" type="submit" onClick={handleChange}>Enviar</button>

          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
