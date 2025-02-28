'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Definir la animación de temblor
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

// Definir el componente de celda con la animación de temblor
const StyledCell = styled.div<{ color: string; isShaking: boolean; size: 'small' | 'tiny' | 'default' }>`
  width: ${({ size }) => (size === 'tiny' ? '16px' : size === 'small' ? '32px' : '64px')};
  height: ${({ size }) => (size === 'tiny' ? '16px' : size === 'small' ? '32px' : '64px')};
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  animation: ${({ isShaking }) => (isShaking ? css`${shake} 0.5s` : 'none')};
`;

interface CellProps {
  color: string;
  onClick?: () => void;
  isShaking?: boolean;
  size?: 'small' | 'tiny' | 'default';
}

const Cell: React.FC<CellProps> = ({ color, onClick, isShaking = false, size = 'default' }) => {
  return <StyledCell color={color} onClick={onClick} isShaking={isShaking} size={size} />;
};

export default Cell;