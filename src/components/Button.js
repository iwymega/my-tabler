import React from 'react';

export const Button = ({ type, children, onClick }) => {
  const className = `btn btn-ghost-${type}`;
  return (
    <a href="#" className={className} onClick={onClick}>
      {children}
    </a>
  );
};