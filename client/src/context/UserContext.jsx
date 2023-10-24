import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { registerRequest } from '../API/user';
import Cookies from 'js-cookie';

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
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, user) => {
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

  const logout = () => {
    Cookies.remove('token');
  };

  return (
    <UserContext.Provider
      value={{ userRegister, getDataUser, updateUser, delUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}
