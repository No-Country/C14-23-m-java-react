import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';

import {
  getIncomes,
  addIncome,
  deleteIncome,
  getFilteredIncomes,
} from '../API/income';
import { useUser } from './UserContext';

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

  const { setUserData } = useUser();

  useEffect(() => {
    const getAllIncomes = async () => {
      try {
        const res = await getIncomes();
        setIncomes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllIncomes();
  }, []);

  const allIncomes = async () => {
    try {
      const res = await getIncomes();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const allFilteredIncomes = async (id, filters) => {
    try {
      const res = await getFilteredIncomes(id, filters);
      return res;
    } catch (error) {
      return error;
    }
  };

  const addNewIncome = async (income) => {
    try {
      const res = await addIncome(income);
      setNewIncome(res);
      setIncomes((prev) => [...prev, res.data]);
      setUserData((prev) => ({
        ...prev,
        totalIncome: prev.totalIncome + res.data.amount,
      }));

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const delIncome = async (id) => {
    try {
      const res = await deleteIncome(id);
      setDeleteOneIncome(res);
      if (res.status === 200) {
        const newData = incomes.filter((income) => income.idIncome !== id);
        setIncomes(newData);

        const amountOfIncomeToDelete = incomes.find(
          (income) => income.idIncome === id,
        ).amount;

        setUserData((prev) => ({
          ...prev,
          totalIncome: prev.totalIncome - amountOfIncomeToDelete,
        }));
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        allIncomes,
        allFilteredIncomes,
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
