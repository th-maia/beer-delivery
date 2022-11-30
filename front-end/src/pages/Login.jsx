import React from 'react';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_MIN_LENGTH = 6;

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [showAlert, setAlert] = React.useState(false);
  const [loginDisabled, setLoginDisabled] = React.useState(true);

  React.useEffect(() => {
    const isEmailValid = EMAIL_REGEX.test(email);
    const isPasswordValid = password.length >= PASSWORD_MIN_LENGTH;
    console.log(email, isEmailValid, isPasswordValid);
    if (isEmailValid && isPasswordValid) {
      setLoginDisabled(false);
      return;
    }
    setLoginDisabled(true);
  }, [email, password]);

  return (
    <div className="login-page">
      <label htmlFor="login">
        Login
        <input
          id="login"
          type="text"
          data-testid="common_login__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          id="senha"
          type="password"
          data-testid="common_login__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ loginDisabled }
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda não tenho uma conta
      </button>
      {/* {showAlert ? (
        <span data-testid="common_login__element-invalid-email">Usuario invalido</span>
      ) : null} */}
    </div>
  );
}
