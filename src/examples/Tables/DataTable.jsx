/**
 * Componente de tabla de datos con acciones CRUD
 * @param {Array} columns - Configuración de columnas
 * @param {Array} rows - Datos a mostrar
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para eliminar
 * @param {Function} onView - Callback para ver detalles
 */
import React from 'react';
import MDButton from '../../components/MDButton';

function DataTable({ columns, rows, onEdit, onDelete, onView }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map(c => <th key={c.field}>{c.headerName}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{textAlign: 'center', padding: '20px'}}>Sin registros</td>
            </tr>
          ) : rows.map(row => (
            <tr key={row.id}>
              {columns.map(c => (
                <td key={`${row.id}-${c.field}`} title={row[c.field]}>
                  {row[c.field]}
                </td>
              ))}
              <td>
                <div className="row-actions">
                  <MDButton variant="outlined" onClick={() => onView(row)}>Ver</MDButton>
                  <MDButton variant="outlined" onClick={() => onEdit(row)}>Editar</MDButton>
                  <MDButton color="danger" onClick={() => onDelete(row)}>Eliminar</MDButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;