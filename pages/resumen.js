import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Resumen() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/gasto');
        setGastos(response.data);
      } catch (error) {
        console.error('Error al obtener los gastos:', error);
      }
    };
    fetchGastos();
  }, []);

  return (
    <div>
      <h2>Resumen de Gastos</h2>
      <ul>
        {gastos.map((gasto) => (
          <li key={gasto.idgasto}>
            {gasto.categoria} - ${gasto.monto} - {gasto.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}