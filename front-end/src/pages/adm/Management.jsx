import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { registerValidation } from '../../utils/inputValidations';
import { getUsers, removeUser } from '../../services/apiCalls';
import registerApi from '../../services/AdminRegisterServices';

export default function Management() {
  const [hiddenOn, hiddenOnSet] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const validatePassword = ({ target: { name, value } }) => {
    setRegister({ ...register, [name]: value });
  };

  const apiCall = async () => {
    const response = await getUsers();
    setUsersList(response);
  };

  useEffect(() => {
    apiCall();
  }, []);

  function switchDisabledButton() {
    const validationError = registerValidation(register).error;
    if (validationError) return true;
    return false;
  }

  const sendRegister = async () => {
    const response = await registerApi(register);
    if (response.error) {
      hiddenOnSet(false);
    } else {
      apiCall();
      setRegister({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
    }
  };

  const deleteUser = async (id) => {
    await removeUser(id);
    await apiCall();
  };

  const dtId = 'admin_manage__element-user-table';

  return (
    <>
      <div>
        <Navbar />
        <p
          data-testid="admin_manage__element-invalid-register"
          hidden={ hiddenOn }
        >
          Person already registered
        </p>
        <input
          name="name"
          value={ register.name }
          onChange={ validatePassword }
          type="text"
          data-testid="admin_manage__input-name"
          placeholder="Nome e sobrenome"
        />
        <input
          name="email"
          value={ register.email }
          onChange={ validatePassword }
          type="text"
          data-testid="admin_manage__input-email"
          placeholder="E-mail"
        />
        <input
          name="password"
          value={ register.password }
          onChange={ validatePassword }
          type="password"
          data-testid="admin_manage__input-password"
          placeholder="Insira sua senha"
        />
        <select
          name="role"
          value={ register.role }
          onChange={ validatePassword }
          data-testid="admin_manage__select-role"
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Admin</option>
        </select>
        <button
          disabled={ switchDisabledButton() }
          onClick={ () => sendRegister() }
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { usersList.map((user, index) => (
            <tr key={ index }>
              <td data-testid={ `${dtId}-item-number-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${dtId}-name-${index}` }>
                {user.name}
              </td>
              <td data-testid={ `${dtId}-email-${index}` }>
                {user.email}
              </td>
              <td data-testid={ `${dtId}-role-${index}` }>
                {user.role}
              </td>
              <td>
                <button
                  data-testid={ `${dtId}-remove-${index}` }
                  type="button"
                  onClick={ () => deleteUser(user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}
