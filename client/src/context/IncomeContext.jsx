import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { getIncomes, deleteIncome } from '../API/income'; 

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
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const delIncome = async (id) => {
  try {
    const res = await deleteIncome(id)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

  return <IncomeContext.Provider value={{allIncomes, delIncome}}>{children}</IncomeContext.Provider>;
}
