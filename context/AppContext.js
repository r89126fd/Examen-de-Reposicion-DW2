import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const [presupuesto, setPresupuesto] = useState(0); // Presupuesto mensual
  const [gastos, setGastos] = useState([]); // Lista de gastos

  return (
    <AppContext.Provider value={{ user, setUser, presupuesto, setPresupuesto, gastos, setGastos }}>
      {children}
    </AppContext.Provider>
  );
};