import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export default function Gastos() {
const { gastos, setGastos } = useContext(AppContext);
const [nuevoGasto, setNuevoGasto] = useState({ categoria: '', monto: 0, fecha: '' });
const obtenerGastos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5000/gasto');
      setGastos(respuesta.data);
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    }
  };
    useEffect(() => {
    obtenerGastos();
  }, []);

  const agregarGasto = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/gasto', nuevoGasto);
      obtenerGastos(); 
      setNuevoGasto({ categoria: '', monto: 0, fecha: '' }); // Reinicia el formulario
    } catch (error) {
      console.error('Error al agregar el gasto:', error);
    }
  };


  const eliminarGasto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/gasto/${id}`);
      obtenerGastos(); //actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Gastos</h2>
     <form onSubmit={agregarGasto}>
        <input
          type="text "
          name="categoria"
          placeholder="Categoría"
          value={nuevoGasto.categoria}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, categoria: e.target.value })}
          required
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={nuevoGasto.monto}
          onChange={(e) =>  setNuevoGasto({ ...nuevoGasto, monto: parseFloat(e.target.value) })}
          required
        />
        <input
          type="date"
          name="fecha"
          value={nuevoGasto.fecha}
          onChange={(e) => setNuevoGasto({ ...nuevoGasto, fecha: e.target.value })}
          required
        />
        <button type="submit">Agrgar Gasto</button>
      </form>
      
      <ul>
        {gastos.map((gasto) => (
          <li key={gasto.idgasto}>
            {gasto.categoria} - ${gasto.monto} - {gasto.fecha}
            <button onClick={() => eliminarGasto(gasto.idgasto)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
