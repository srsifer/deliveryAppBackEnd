import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { registerValidation } from '../../utils/inputValidations';
import { getUsers } from '../../services/apiCalls';
import registerApi from '../../services/AdminRegisterServices';

export default function Management() {
  const [hiddenOn, setHiddenOn] = useState(true);
  const [userToken, setUserToken] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const validatePassword = ({ target: { name, value } }) => {
    setRegister({ ...register,
      [name]: value,
    });
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    const apiCall = async () => {
      const response = await getUsers();
      setUsersList(response);
    };
    apiCall();
    setUserToken(token);
  }, []);

  function switchDisabledButton() {
    const validationError = registerValidation(register).error;
    if (validationError) return true;
    return false;
  }

  const sendRegister = async (data, token) => {
    const conflict = 409;
    const result = await registerApi(data, token);
    if (result === conflict) {
      setHiddenOn(false);
    } else {
      setRegister({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
    }
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
          onClick={ () => sendRegister(register, userToken) }
          type="submit"
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
              <td data-testid={ `${dtId}-remove-${index}` }>
                <button
                  type="button"
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
