import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function Presupuesto() {
  const { presupuesto, setPresupuesto, gastos } = useContext(AppContext);
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('');

  const handleSetPresupuesto = (e) => {
    e.preventDefault();
    const nuevoPresupuesto = parseFloat(e.target.presupuesto.value);
    if (isNaN(nuevoPresupuesto) || nuevoPresupuesto <= 0) {
      alert('Por favor, ingresa un presupuesto válido.');
      return;
    }
    setPresupuesto(nuevoPresupuesto);
    alert('Presupuesto establecido correctamente');
  };

  useEffect(() => {
    const totalGastos = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);

    if (totalGastos >= presupuesto * 0.8 && totalGastos < presupuesto) {
      setMensaje('Has alcanzado el 80% del presupuesto');
      setColorMensaje('orange'); 
    } else if (totalGastos >= presupuesto) { 
      setMensaje('Has superado el límite del presupuesto');
      setColorMensaje('red'); 
    } else {
      setMensaje('');
      setColorMensaje('');
    }
  }, [gastos, presupuesto]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Presupuesto Mensual</h2>
      <form onSubmit={handleSetPresupuesto}>
        <input type="number" name="presupuesto" placeholder="Presupuesto" required />
        <button type="submit">Establecer Presupuesto</button>
      </form>
      {mensaje && <p style={{ color: colorMensaje, fontWeight: 'bold' }}>{mensaje}</p>}
    </div>
  );
}
