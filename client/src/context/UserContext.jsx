import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { registerRequest ,dataUserRequest, updateUserRequest} from '../API/user';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export function UserProvider({ children }) {
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const userRegister = async (user) => {
    try {
      const res = await registerRequest(user);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getDataUser = async (id) => {
    try {
      const res = await dataUserRequest(id);
      console.log(res?.data)
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  // {
  //   idUser: 1,
  //   name: 'Usuario Primero',
  //   last_name: 'Apellido',
  //   email: 'usuario1@gmail.com',
  //   birthday_date: [ 1991, 10, 19 ],
  //   totalIncome: 179550,
  //   accumulatedSavings: 0
  // }

  const updateUser = async ( id , user) => {
    try {
      console.log(id, user);
    } catch (error) {
      console.log(error);
    }
  };

  const delUser = async (id) => {
    try {
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userRegister, getDataUser, updateUser, delUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
