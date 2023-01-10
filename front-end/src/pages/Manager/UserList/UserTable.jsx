import React from 'react';
import PropTypes from 'prop-types';
import userType from '../../../utils/userTypes';

function UserTable({ id, index, name, email, role, handleDelete }) {
  return (
    <tr key={ id }>
      <td
        data-testid={
          `admin_manage__element-user-table-item-number-${index}`
        }
      >
        {index + 1}
      </td>
      <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
        {name}
      </td>
      <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
        {email}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {userType.find((type) => type.value === role)?.label}
      </td>
      <td>
        <button
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
