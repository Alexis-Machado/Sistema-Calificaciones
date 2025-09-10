/**
 * Controlador principal para el módulo de calificaciones
 * Maneja el estado y las operaciones CRUD
 */
import React, { useEffect, useMemo, useState } from 'react';
import { assistanceService } from '../services/assistanceService';
import AssistanceModule from '../modules/AssistanceModule';
import { RATE_LIMIT_MESSAGE } from '../../constants/messages';

// Configuración de columnas para la tabla
const columns = [
  { field: 'NumerodelRegistro', headerName: 'Registro' },
  { field: 'Nombre', headerName: 'Nombre' },
  { field: 'Edad', headerName: 'Edad' },
  { field: 'Calificacion', headerName: 'Calificación' },
  { field: 'Estado', headerName: 'Estado' },
  { field: 'Asignatura', headerName: 'Asignatura' },
  { field: 'FechaCalificacion', headerName: 'Fecha Calificación' },
  { field: 'Profesor', headerName: 'Profesor' },
  { field: 'NombreAcudiente', headerName: 'Acudiente' },
  { field: 'NumeroContacto', headerName: 'Contacto' },
  { field: 'Email', headerName: 'Email' },
  { field: 'PromedioGeneral', headerName: 'Promedio' },
  { field: 'Comentarios', headerName: 'Comentarios' },
];

function AssistanceController() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); 
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('create'); 

  // Obtener todas las calificaciones
  const fetchAll = async () => {
    setLoading(true);
    const res = await assistanceService.list();
    setLoading(false);
    if (!res.success) {
      const message = res.status === 429 ? RATE_LIMIT_MESSAGE : (res.message || 'Error listando');
      setAlert({ type: 'error', message });
      return;
    }
    setRows(res.payload || []);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onCreateClicked = () => {
    setSelected(null);
    setMode('create');
    setModalOpen(true);
  };

  const onView = (row) => {
    setSelected(row);
    setMode('view');
    setModalOpen(true);
  };

  const onEdit = (row) => {
    setSelected(row);
    setMode('edit');
    setModalOpen(true);
  };

  // Eliminar calificación con confirmación
  const onDelete = async (row) => {
    if (!window.confirm(`¿Eliminar calificación de ${row.Nombre}?`)) return;
    setLoading(true);
    const res = await assistanceService.remove(row.id);
    setLoading(false);
    if (!res.success) {
      const message = res.status === 429 ? RATE_LIMIT_MESSAGE : (res.message || 'No se pudo Eliminar.');
      setAlert({ type: 'error', message });
      return;
    }
    setAlert({ type: 'success', message: 'Eliminado Correctamente.' });
    fetchAll();
  };

  // Crear o actualizar calificación
  const onSubmit = async (form) => {
    setLoading(true);
    let res;
    if (mode === 'create') {
      res = await assistanceService.create(form);
    } else {
      res = await assistanceService.update(selected.id, form);
    }
    setLoading(false);

    if (!res.success) {
      const message = res.status === 429 ? RATE_LIMIT_MESSAGE : (res.message || 'Error al Guardar.');
      setAlert({ type: 'error', message });
      return;
    }

    setAlert({ type: 'success', message: 'Guardado Correctamente.' });
    setModalOpen(false);
    setSelected(null);
    fetchAll();
  };

  // Contexto para el módulo
  const ctx = useMemo(() => ({
    columns,
    rows,
    loading,
    alert,
    setAlert,
    selected,
    modalOpen,
    mode,
    onCreateClicked,
    onView,
    onEdit,
    onDelete,
    onSubmit,
    onCloseModal: () => setModalOpen(false),
  }), [rows, loading, alert, selected, modalOpen, mode]);

  return <AssistanceModule {...ctx} />;
}

export default AssistanceController;