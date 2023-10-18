import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { getExpenses } from '../API/egress';

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

  const allExpenses = async () => {
    try {
      const res = await getExpenses();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewGasto = async (expenses) => {
    try {
      console.log(expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const delExpense = async (id) => {
    try {
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EgressContext.Provider value={{ allExpenses, addNewGasto, delExpense }}>
      {children}
    </EgressContext.Provider>
  );
}
