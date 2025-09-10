/**
 * Componente de tipografía que renderiza diferentes elementos HTML según la variante
 */
import React from 'react';

function MDTypography({ children, variant = 'body', style, className }) {
  const Tag = variant === 'h1' ? 'h1'
    : variant === 'h2' ? 'h2'
    : variant === 'h3' ? 'h3'
    : 'div';
  return (
    <Tag className={className} style={style}>{children}</Tag>
  );
}

export default MDTypography;