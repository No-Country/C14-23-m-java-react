import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';

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

  return <IncomeContext.Provider value={{}}>{children}</IncomeContext.Provider>;
}
