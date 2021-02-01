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

function submitOk() {
  const inputs = document.querySelectorAll('[required]');

  console.log(inputs);
  
  for(let input of inputs) {
    input.addEventListener("invalid", event => {
      console.log("Campos invalidos");
    })
  }
}

const form = document.querySelector('form');
if(form) {
  form.addEventListener("submit", event => {
    alert("Formulário enviado.");
  });
}

function App() {
  return (
    <div className="App">
      <form action="." method="get">
        <fieldset>
          <legend>Formulário</legend>
          <div className="pag1">
            <label>
              Nome* <br />
              <input type="text" id="nome" required autoFocus />
            </label>
            <label>
              E-mail* <br />
              <input type="email" id="email" required />
            </label>
            <label>
              Telefone* <br />
              <MaskedInput
                mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                type="tel" id="telefone"
                required
              />
            </label>
            <label>
              CEP* <br />
              <MaskedInput
                mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                type="tel" id="cep" minLength="8"
                onBlur={eventCep} required
              />
            </label>
            <label>
              Logradouro* <br />
              <input type="text" id="logradouro" required />
            </label>
            <p> * Campos obrigatórios.</p>
          </div>
          <div className="pag2">
            <label>
              Número* <br />
              <input type="text" id="numero" required />
            </label>
            <label>
              Complemento <br />
              <input type="text" id="complemento" />
            </label>
            <label>
              Bairro* <br />
              <input type="text" id="bairro" required />
            </label>
            <label>
              Cidade* <br />
              <input type="text" id="cidade" required />
            </label>
            <label>
              Estado* <br />
              <input type="text" id="estado" required />
            </label>
            <button type="submit" onClick={submitOk}>Enviar</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
