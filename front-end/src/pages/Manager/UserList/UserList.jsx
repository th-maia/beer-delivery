import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import validateEmail from '../../../utils/validate';
import api from '../../../services/api';

export const userType = [
  {
    label: 'Vendedor',
    value: 'seller',
  },
  {
    label: 'Cliente',
    value: 'customer',
  },
];

const validateRules = {
  NAME_LENGTH: 12,
  EMAIL_REGEX: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
  PASSWORD_LENGTH: 6,
};

function UserList() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [erroMsg, setErroMsg] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: true,
    email: true,
    password: true,
    role: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.elements;
    const values = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };
    console.log(values);

    await api.post('/adm/register', values, {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      console.log('Usuário registrado com sucesso');
      console.log(response.data);
    }).catch((error) => {
      setErroMsg(error.response.data.message);
      console.error(error.response.data.message);
    });
  };

  React.useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <Navbar />
      <div>
        {erroMsg && (
          <div data-testid="admin_manage__element-invalid-register">
            {erroMsg}
          </div>
        )}
        <form
          style={ { marginTop: 50, display: 'flex' } }
          onSubmit={ handleSubmit }
          autoComplete="off"
        >
          <div>
            <input
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Nome e sobrenome"
              data-testid="admin_manage__input-name"
              onChange={ (event) => {
                const { value } = event.target;
                if (value.length >= validateRules.NAME_LENGTH) {
                  setErrors({
                    ...errors,
                    name: false,
                  });
                } else {
                  setErrors({
                    ...errors,
                    name: true,
                  });
                }
              } }
            />
          </div>

          <div>
            <input
              autoComplete="none"
              type="email"
              name="email"
              data-testid="admin_manage__input-email"
              onChange={ (event) => {
                const { value } = event.target;
                const isValid = validateEmail(value);
                if (isValid) {
                  setErrors({
                    ...errors,
                    email: false,
                  });
                } else {
                  setErrors({
                    ...errors,
                    email: true,
                  });
                }
              } }
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              data-testid="admin_manage__input-password"
              onChange={ (event) => {
                const { value } = event.target;
                if (value.length >= validateRules.PASSWORD_LENGTH) {
                  setErrors({
                    ...errors,
                    password: false,
                  });
                } else {
                  setErrors({
                    ...errors,
                    password: true,
                  });
                }
              } }
            />
          </div>

          <div>
            <select
              name="role"
              data-testid="admin_manage__select-role"
              onChange={ (event) => {
                const { value } = event.target;
                if (value) {
                  setErrors({
                    ...errors,
                    role: false,
                  });
                } else {
                  setErrors({
                    ...errors,
                    role: true,
                  });
                }
              } }
            >
              {userType?.map((option) => (
                <option
                  key={ option?.value }
                  value={ option?.value }
                >
                  { option?.label }
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              disabled={ errors.email || errors.name || errors.password || errors.role }
              type="submit"
              data-testid="admin_manage__button-register"
            >
              CADASTRAR
            </button>
          </div>

        </form>

      </div>
    </>
  );
}

export default UserList;
