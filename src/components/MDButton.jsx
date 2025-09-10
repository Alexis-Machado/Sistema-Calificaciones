/**
 * Componente de botón reutilizable con diferentes variantes y colores
 * @param {React.ReactNode} children - Contenido del botón
 * @param {Function} onClick - Función a ejecutar al hacer clic
 * @param {boolean} disabled - Estado deshabilitado del botón
 * @param {string} color - Color del botón (primary, danger, warning, success)
 * @param {string} variant - Variante del botón (contained, outlined)
 * @param {string} type - Tipo de botón HTML (button, submit, reset)
 */
import React from 'react';

function MDButton({ children, onClick, disabled, color = 'primary', variant = 'contained', type = 'button' }) {
  const classes = ['btn'];
  if (variant === 'contained') classes.push('btn-contained');
  if (variant === 'outlined') classes.push('btn-outlined');
  if (color === 'danger') classes.push('btn-danger');
  if (color === 'warning') classes.push('btn-warning');
  if (color === 'success') classes.push('btn-success');
  return (
    <button type={type} className={classes.join(' ')} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default MDButton;