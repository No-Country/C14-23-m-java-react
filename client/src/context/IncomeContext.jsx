import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';

import { getIncomes, addIncome, deleteIncome } from '../API/income';

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

  const [newIncome, setNewIncome] = useState([]);
  const [deleteOneIncome, setDeleteOneIncome] = useState();
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const allIncomes = async () => {
      try {
        const res = await getIncomes();
        setIncomes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    allIncomes();
  }, []);

  const allIncomes = async () => {
    try {
      const res = await getIncomes();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewIncome = async (income) => {
    try {
      const res = await addIncome(income);
      setNewIncome(res);
      console.log('respuesta al añadir', res.data);
      setIncomes((prev) => [...prev, res.data]);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const delIncome = async (id) => {
    try {
      const res = await deleteIncome(id);
      setDeleteOneIncome(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        allIncomes,
        addNewIncome,
        delIncome,
        newIncome,
        deleteOneIncome,
        incomes,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}
