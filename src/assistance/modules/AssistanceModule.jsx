/**
 * Módulo de interfaz para el sistema de calificaciones
 * Renderiza la tabla, formularios y modales
 */
import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import DataTable from '../../examples/Tables/DataTable';
import MDAlert from '../../components/MDAlert';
import MDButton from '../../components/MDButton';
import usePermission from '../../hooks/usePermission';

// Formulario vacío por defecto
const emptyForm = {
  NumerodelRegistro: '',
  Nombre: '',
  Edad: '',
  Calificacion: '',
  Estado: '', // opcional, el backend lo determina si va vacío
  Asignatura: '',
  FechaCalificacion: '',
  Profesor: '',
  NombreAcudiente: '',
  NumeroContacto: '',
  Email: '',
  PromedioGeneral: '',
  Comentarios: ''
};

function AssistanceModule({
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
  onCloseModal,
}) {
  const { can } = usePermission();
  const [form, setForm] = useState(emptyForm);
  const isView = mode === 'view';
  const isEdit = mode === 'edit';

  // Cargar datos del registro seleccionado al formulario
  useEffect(() => {
    if (selected) {
      setForm({
        NumerodelRegistro: selected.NumerodelRegistro ?? '',
        Nombre: selected.Nombre ?? '',
        Edad: selected.Edad ?? '',
        Calificacion: selected.Calificacion ?? '',
        Estado: selected.Estado ?? '',
        Asignatura: selected.Asignatura ?? '',
        FechaCalificacion: selected.FechaCalificacion ?? '',
        Profesor: selected.Profesor ?? '',
        NombreAcudiente: selected.NombreAcudiente ?? '',
        NumeroContacto: selected.NumeroContacto ?? '',
        Email: selected.Email ?? '',
        PromedioGeneral: selected.PromedioGeneral ?? '',
        Comentarios: selected.Comentarios ?? ''
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected, modalOpen]);

  // Botones de acción
  const actions = useMemo(() => (
    <>
      {can('create') && <MDButton onClick={onCreateClicked}>Nueva Calificación</MDButton>}
    </>
  ), [onCreateClicked, can]);

  // Filtro simple por nombre
  const filters = useMemo(() => (
    <>
      <input
        className="input"
        placeholder="Filtrar por nombre..."
        onChange={(e) => {
          const q = e.target.value.toLowerCase();
          const tbody = document.querySelector('tbody');
          if (!tbody) return;
          Array.from(tbody.children).forEach(tr => {
            const nameCell = tr.querySelector('td:nth-child(2)');
            if (!nameCell) return;
            const text = (nameCell.textContent || '').toLowerCase();
            tr.style.display = text.includes(q) ? '' : 'none';
          });
        }}
      />
      <span className="helper">Filtro simple (visual)</span>
    </>
  ), []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario con conversión de tipos
  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      NumerodelRegistro: Number(form.NumerodelRegistro),
      Edad: Number(form.Edad),
      Calificacion: Number(form.Calificacion),
      PromedioGeneral: Number(form.PromedioGeneral),
    });
  };

  return (
    <MainLayout
      title="Sistema de Calificaciones"
      breadcrumb={['Inicio', 'Calificaciones']}
      actions={actions}
      filters={filters}
    >
      {alert && <MDAlert color={alert.type === 'error' ? 'error' : 'success'}>{alert.message}</MDAlert>}

      {/* Tabla con overlay de carga */}
      <div style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
        <DataTable
          columns={columns}
          rows={rows}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Modal de formulario */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={onCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <strong>
                {mode === 'create' && 'Crear Calificación'}
                {mode === 'edit' && 'Editar Calificación'}
                {mode === 'view' && 'Detalle de Calificación'}
              </strong>
              <MDButton variant="outlined" onClick={onCloseModal}>Cerrar</MDButton>
            </div>

            {/* Formulario en 3 columnas */}
            <form onSubmit={submit} className="grid grid-3">
              {/* Datos del Estudiante */}
              <div>
                <div className="section-title">Datos del Estudiante</div>
                <label>Registro</label>
                <input className="input" name="NumerodelRegistro" value={form.NumerodelRegistro} onChange={onChange} disabled={isView} required />
                <label>Nombre</label>
                <input className="input" name="Nombre" value={form.Nombre} onChange={onChange} disabled={isView} required />
                <label>Edad</label>
                <input className="input" name="Edad" type="number" value={form.Edad} onChange={onChange} disabled={isView} required />
                <label>Promedio General</label>
                <input className="input" name="PromedioGeneral" type="number" step="0.01" value={form.PromedioGeneral} onChange={onChange} disabled={isView} required />
              </div>

              {/* Datos Académicos */}
              <div>
                <div className="section-title">Académico</div>
                <label>Asignatura</label>
                <input className="input" name="Asignatura" value={form.Asignatura} onChange={onChange} disabled={isView} required />
                <label>Calificación</label>
                <input className="input" name="Calificacion" type="number" step="0.01" value={form.Calificacion} onChange={onChange} disabled={isView} required />
                <label>Estado</label>
                <select className="input" name="Estado" value={form.Estado} onChange={onChange} disabled={isView}>
                  <option value="">(auto)</option>
                  <option value="APROVADO">APROVADO</option>
                  <option value="REPROVADO">REPROVADO</option>
                  <option value="EN REFUERZO">EN REFUERZO</option>
                </select>
                <label>Fecha Calificación</label>
                <input className="input" name="FechaCalificacion" type="date" value={form.FechaCalificacion} onChange={onChange} disabled={isView} required />
              </div>

              {/* Datos de Contacto */}
              <div>
                <div className="section-title">Contacto</div>
                <label>Profesor</label>
                <input className="input" name="Profesor" value={form.Profesor} onChange={onChange} disabled={isView} required />
                <label>Nombre Acudiente</label>
                <input className="input" name="NombreAcudiente" value={form.NombreAcudiente} onChange={onChange} disabled={isView} required />
                <label>Número Contacto</label>
                <input className="input" name="NumeroContacto" value={form.NumeroContacto} onChange={onChange} disabled={isView} required />
                <label>Email</label>
                <input className="input" name="Email" type="email" value={form.Email} onChange={onChange} disabled={isView} required />
                <label>Comentarios</label>
                <textarea className="input" name="Comentarios" rows="3" value={form.Comentarios} onChange={onChange} disabled={isView} required />
              </div>

              {/* Botones de acción */}
              <div className="grid grid-2" style={{ gridColumn: '1 / -1', marginTop: 12 }}>
                {!isView && (
                  <MDButton type="submit" color="success">
                    {isEdit ? 'Actualizar' : 'Crear'}
                  </MDButton>
                )}
                <MDButton variant="outlined" onClick={onCloseModal}>Cancelar</MDButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default AssistanceModule;