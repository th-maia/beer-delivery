import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import validateEmail from '../../../utils/validate';
import api from '../../../services/api';
import UserTable from './UserTable';
import userType from '../../../utils/userTypes';

const validateRules = {
  NAME_LENGTH: 12,
  EMAIL_REGEX: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
  PASSWORD_LENGTH: 6,
};

function UserList() {
  const [users, setUsers] = React.useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [erroMsg, setErroMsg] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: true,
    email: true,
    password: true,
    role: true,
  });

  const fetchUsers = async () => {
    await api.get('/adm', {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      setUsers(response.data);
    }).catch((error) => {
      console.error(error.response.data.message);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.elements;
    const values = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    await api.post('/adm/register', values, {
      headers: {
        authorization: user?.token,
      },
    }).then(() => {
      fetchUsers();
      console.log('Usuário registrado com sucesso');
    }).catch((error) => {
      setErroMsg(error.response.data.message);
      console.error(error.response.data.message);
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/adm/${id}`, {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      console.log(response.data);
      fetchUsers();
    }).catch((error) => {
      console.error(error.response.data);
    });
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const titleHead = [
    { id: 1, title: 'Item', align: 'center', width: '50px' },
    { id: 2, title: 'Nome', align: 'center', width: '250px' },
    { id: 3, title: 'Email', align: 'center', width: '80px' },
    { id: 4, title: 'Tipo', align: 'center', width: '150px' },
    { id: 5, title: 'Excluir', align: 'center', width: '80px' },
  ];
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
      <table>
        <thead>
          <tr>
            {titleHead.map((item) => (
              <th
                key={ item.id }
                align={ item.align }
                width={ item.width }
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users && users?.map((item, index) => (
            <UserTable
              key={ item?.id }
              id={ item?.id }
              index={ index }
              name={ item?.name }
              email={ item?.email }
              role={ item?.role }
              handleDelete={ handleDelete }
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
