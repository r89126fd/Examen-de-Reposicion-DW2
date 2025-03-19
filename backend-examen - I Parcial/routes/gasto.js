const express = require('express');
const router = express.Router();

// Simulación de una base de datos (puede ser reemplazada por MySQL, MongoDB, etc.)
let gastos = [
  { idgasto: 1, categoria: 'comida', monto: 6000, fecha: '2024-11-01' },
];

// GET: Obtener todos los gastos
router.get('/', (req, res) => {
  res.json(gastos);
});

// POST: Agregar un nuevo gasto
router.post('/', (req, res) => {
  const nuevoGasto = req.body;
  nuevoGasto.idgasto = gastos.length + 1; // Asignar un ID único
  gastos.push(nuevoGasto);
  res.status(201).json(nuevoGasto);
});

// PUT: Actualizar un gasto existente
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const gastoActualizado = req.body;
  gastos = gastos.map(gasto =>
    gasto.idgasto === id ? { ...gasto, ...gastoActualizado } : gasto
  );
  res.json(gastoActualizado);
});

// DELETE: Eliminar un gasto
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  gastos = gastos.filter(gasto => gasto.idgasto !== id);
  res.status(204).send();
});

module.exports = router;