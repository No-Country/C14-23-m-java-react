import { useState } from 'react';
import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { addExpenses, deleteExpenses, getExpenses } from '../API/egress';

const EgressContext = createContext();

export const useEgress = () => {
  const context = useContext(EgressContext);
  if (!context) {
    throw new Error('useUser must be used within a EgressProvider');
  }
  return context;
};

export function EgressProvider({ children }) {
  EgressProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [newExpense, setNewExpense] = useState([]);

  const allExpenses = async () => {
    try {
      const res = await getExpenses();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewGasto = async (expenses) => {
    try {
      const res = await addExpenses(expenses);
      setNewExpense(res);
    } catch (error) {
      console.log(error);
    }
  };

  const delExpense = async (id) => {
    try {
      const res = await deleteExpenses(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EgressContext.Provider
      value={{ allExpenses, addNewGasto, delExpense, newExpense }}
    >
      {children}
    </EgressContext.Provider>
  );
}
