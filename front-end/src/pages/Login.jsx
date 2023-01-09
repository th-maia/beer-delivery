import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../API/user.API';
import isUserInputValid from '../helpers/login.helpers';
import useLocalStorage from '../hooks/useLocalStorage';
import routesCheck from '../helpers/Routes.helper';
import './Login.css';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showAlert, setAlert] = React.useState(false);
  const [loginDisabled, setLoginDisabled] = React.useState(true);
  const { setValue } = useLocalStorage('user', '');
  const navigate = useNavigate();
  const isLogged = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    if (isLogged && isLogged.token) {
      const route = routesCheck(isLogged?.role);
      navigate(route);
    }
  }, []);

  const loginRequest = async () => {
    const response = await login({ email, password });
    console.log(response);
    if (!response) {
      setAlert(true);
      // const IN_THREE_SECONDS = 3000;
      // setTimeout(() => { setAlert(false); }, IN_THREE_SECONDS);
    } else {
      setValue(response);
      const route = routesCheck(response.role);
      navigate(route);
    }
  };

  React.useEffect(() => {
    if (isUserInputValid(email, password)) setLoginDisabled(false);
    else setLoginDisabled(true);
  }, [email, password]);

  return (
    <div className="login">
      <div className="logoContainer">
        <img className="logo" src="https://cdn.discordapp.com/attachments/938669134890278937/1062068447988695141/Logo.png" alt="Logotipo beer delivery" />
      </div>
      <div className="login-page">
        <h1>Login</h1>
        <div className="inputs-login">
          <label htmlFor="login">
            <input
              id="login"
              type="text"
              value={ email }
              data-testid="common_login__input-email"
              placeholder="E-mail"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <label htmlFor="senha">
            <input
              id="senha"
              type="password"
              value={ password }
              data-testid="common_login__input-password"
              placeholder="Password"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          <button
            type="button"
            className="login-button"
            data-testid="common_login__button-login"
            disabled={ loginDisabled }
            onClick={ async () => loginRequest() }
          >
            Login
          </button>
          <button
            type="button"
            className="password-button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho uma conta
          </button>
        </div>
        {showAlert ? (
          <span
            className="alert"
            data-testid="common_login__element-invalid-email"
          >
            Usuario invalido
          </span>
        ) : null}
      </div>
    </div>
  );
}
