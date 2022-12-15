import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../API/user.API';
import isUserInputValid from '../helpers/login.helpers';
import useLocalStorage from '../hooks/useLocalStorage';
import routesCheck from '../helpers/Routes.helper';

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
    <div className="login-page">
      <label htmlFor="login">
        Login
        <input
          id="login"
          type="text"
          value={ email }
          data-testid="common_login__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          id="senha"
          type="password"
          value={ password }
          data-testid="common_login__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ loginDisabled }
        onClick={ async () => loginRequest() }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => navigate('/register') }
      >
        Ainda não tenho uma conta
      </button>
      {showAlert ? (
        <span data-testid="common_login__element-invalid-email">Usuario invalido</span>
      ) : null}
    </div>
  );
}
