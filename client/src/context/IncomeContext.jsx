import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { addIncome, getIncomes } from '../API/income';

const IncomeContext = createContext();

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error('useUser must be used within a IncomeProvider');
  }
  return context;
};

export function IncomeProvider({ children }) {
  IncomeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const allIncomes = async () => {
    try {
      const res = await getIncomes();
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewIncome = async (income) => {
    try {
      const res = await addIncome(income);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IncomeContext.Provider value={{ allIncomes, addNewIncome }}>
      {children}
    </IncomeContext.Provider>
  );
}
