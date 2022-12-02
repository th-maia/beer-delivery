import React from 'react';
import { useNavigate } from 'react-router-dom';
import isRegisterInputValid from '../helpers/register.helpers';
import { register } from '../API/user.API';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showAlert, setAlert] = React.useState(false);
  const [registerDisabled, setRegisterDisabled] = React.useState(true);
  const { setValue } = useLocalStorage('user', '');
  const navigate = useNavigate();

  const registerRequest = async () => {
    const response = await register({ name, email, password });
    if (!response) {
      setAlert(true);
    } else {
      setValue(response);
      navigate('/customer/products');
    }
  };

  React.useEffect(() => {
    if (isRegisterInputValid(name, email, password)) setRegisterDisabled(false);
    else setRegisterDisabled(true);
  }, [name, email, password]);

  return (
    <div className="register-page">
      <h1>Register</h1>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          type="text"
          value={ name }
          data-testid="common_register__input-name"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          value={ email }
          data-testid="common_register__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="password"
          type="password"
          value={ password }
          data-testid="common_register__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ registerDisabled }
        onClick={ async () => registerRequest() }
      >
        Cadastrar
      </button>
      {showAlert ? (
        <span
          data-testid="common_register__element-invalid-register"
        >
          Registro invalido
        </span>
      ) : null}
    </div>
  );
}
