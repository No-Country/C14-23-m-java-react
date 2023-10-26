import { createContext, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  registerRequest,
  dataUserRequest,
  updateUserSavings,
  savingsToZero
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
      console.log(res?.data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSaving = async (idUser, toSaving) => {
    console.log('id:'+idUser+'valor'+ toSaving)
    try {
      const res = await updateUserSavings(idUser, toSaving);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const delSaving = async (id) => {
    try {
      const res = await savingsToZero(id)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

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
      value={{
        userRegister,
        getDataUser,
        updateUser,
        delUser,
        logout,
        updateSaving,
        delSaving
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
