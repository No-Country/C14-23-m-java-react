import { createContext, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  registerRequest,
  loginUserRequest,
  updateUserSavings,
  savingsToZero,
  partialUpdateUserRequest,
  updateUserPasswordRequest,
} from '../API/user';
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

  const [userData, setUserData] = useState(null);

  const userRegister = async (user) => {
    try {
      const res = await registerRequest(user);
      return res;
    } catch (error) {
      return error;
    }
  };

  const getLoginUser = async (user) => {
    try {
      const res = await loginUserRequest(user);
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateSaving = async (idUser, toSaving) => {
    try {
      const res = await updateUserSavings(idUser, toSaving);
      setUserData(res.data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const delSaving = async (id) => {
    try {
      const res = await savingsToZero(id);
      setUserData(res.data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateUser = async (id, user) => {
    try {
      console.log(id, user);
    } catch (error) {
      console.log(error);
    }
  };

  const partialUpdateUser = async (id, data) => {
    try {
      const res = await partialUpdateUserRequest(id, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPassword = async (id, data) => {
    try {
      const res = await updateUserPasswordRequest(id, data);
      return res;
    } catch (error) {
      return error;
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
      value={{
        userData,
        setUserData,
        userRegister,
        getLoginUser,
        updateUser,
        partialUpdateUser,
        updateUserPassword,
        delUser,
        logout,
        updateSaving,
        delSaving,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
