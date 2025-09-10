/**
 * Componente contenedor genérico que actúa como wrapper div con estilos y clases personalizables
 * @param {React.ReactNode} children - Contenido del componente
 * @param {Object} style - Estilos CSS inline
 * @param {string} className - Clases CSS adicionales
 */
import React from 'react';

function MDBox({ children, style, className }) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export default MDBox;