import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test page ProductManagement', () => {
  it('should mount page correctly', () => {
    const { history } = renderWithRouter(<App />);
    
    const { pathname } = history.location;
    const fileInput = screen.getByTestId('fileInput');
    const validateBtn = screen.getByTestId('validateBtn');
    const submitBtn = screen.getByTestId('submitBtn');
    const initialMsg = screen.getByText(/nenhum arquivo carregado\.\.\./i);

    expect(pathname).toBe('/');
    expect(fileInput).toBeInTheDocument();
    expect(validateBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
    expect(initialMsg).toBeInTheDocument();
  });
  
  it('should mount page correctly', () => {
    const { history } = renderWithRouter(<App />);
    
    const { pathname } = history.location;
    const fileInput = screen.getByTestId('fileInput')
    const validateBtn = screen.getByTestId('validateBtn')
    const submitBtn = screen.getByTestId('submitBtn')

    expect(pathname).toBe('/');
    expect(fileInput).toBeInTheDocument();
    expect(validateBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
})
