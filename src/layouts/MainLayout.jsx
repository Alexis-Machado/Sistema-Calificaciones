/**
 * Layout principal de la aplicación con header, breadcrumb y área de contenido
 * @param {string} title - Título de la página
 * @param {Array} breadcrumb - Ruta de navegación
 * @param {React.ReactNode} actions - Botones de acción
 * @param {React.ReactNode} filters - Filtros de búsqueda
 * @param {React.ReactNode} children - Contenido principal
 */
import React from 'react';
import MDBox from '../components/MDBox';
import MDTypography from '../components/MDTypography';

function MainLayout({ title, breadcrumb = [], actions = null, filters = null, children }) {
  return (
    <MDBox className="container">
      <div className="header">
        <div className="logo-container" style={{ marginBottom: '10px' }}>
          <img 
            src={import.meta.env.VITE_LOGO_URL || "https://i.ibb.co/fY6nHSVq/IU-Digital-New.png"} 
            alt="IU Digital Logo" 
            style={{ height: '60px', width: 'auto' }}
          />
        </div>
        <div className="breadcrumb">
          {breadcrumb.join(' / ')}
        </div>
        <MDTypography variant="h3" className="header-title">{title}</MDTypography>
        {filters && (
          <div className="toolbar">
            {filters}
          </div>
        )}
        {actions && (
          <div className="toolbar">
            {actions}
          </div>
        )}
      </div>
      <div>
        {children}
      </div>
    </MDBox>
  );
}

export default MainLayout;