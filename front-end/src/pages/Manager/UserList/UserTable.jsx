import React from 'react';
import PropTypes from 'prop-types';
import userType from '../../../utils/userTypes';
import './UserTable.css';

function UserTable({ id, index, name, email, role, handleDelete }) {
  return (
    <tr key={ id }>
      <td
        className="userId"
        data-testid={
          `admin_manage__element-user-table-item-number-${index}`
        }
      >
        {index + 1}
      </td>
      <td
        className="name"
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}
      </td>
      <td
        className="email"
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}
      </td>
      <td
        className="role"
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {userType.find((type) => type.value === role)?.label}
      </td>
      <td>
        <button
          className="deleteUser"
          type="button"
          data-testid={ `admin_manage__element-user-table-remove-${index + 1}` }
          onClick={ () => handleDelete(id) }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

export default UserTable;

UserTable.propTypes = {
  id: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;
