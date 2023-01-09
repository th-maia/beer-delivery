import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../API/user.API';
import isRegisterInputValid from '../helpers/register.helpers';
import useLocalStorage from '../hooks/useLocalStorage';
import './Register.css';

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
    <div className="register">
      <div className="logoContainer">
        <img className="logo" src="https://cdn.discordapp.com/attachments/938669134890278937/1062068447988695141/Logo.png" alt="Logotipo beer delivery" />
      </div>
      <div className="register-page">
        <h1>Register</h1>
        <div className="inputs-register">
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              value={ name }
              data-testid="common_register__input-name"
              placeholder="Nome"
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              value={ email }
              data-testid="common_register__input-email"
              placeholder="E-mail"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              value={ password }
              data-testid="common_register__input-password"
              placeholder="Password"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          <button
            type="button"
            className="register-button"
            data-testid="common_register__button-register"
            disabled={ registerDisabled }
            onClick={ async () => registerRequest() }
          >
            Cadastrar
          </button>
          <button
            type="button"
            className="back-button"
            onClick={ () => navigate('/login') }
          >
            Back to Login
          </button>
        </div>
        {showAlert ? (
          <span
            className="alert"
            data-testid="common_register__element-invalid_register"
          >
            Registro invalido
          </span>
        ) : null}
      </div>
    </div>
  );
}
