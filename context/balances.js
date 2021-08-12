import { createContext, useContext } from 'react';

export const BalanceContext = createContext(null);

export const useBalance = () => {
	return useContext(BalanceContext);
};
