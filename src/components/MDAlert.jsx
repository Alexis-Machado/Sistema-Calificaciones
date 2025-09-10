/**
 * Componente de alerta reutilizable con diferentes variantes de color
 * @param {string} color - Tipo de alerta (info, success, warning, danger)
 * @param {React.ReactNode} children - Contenido de la alerta
 */
import React from 'react';

function MDAlert({ color = 'info', children }) {
  const classes = ['alert', `alert-${color}`].join(' ');
  return <div className={classes}>{children}</div>;
}

export default MDAlert;