import React from 'react';
import { findByTestId, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const mockedProductFromDB = [
	{
		"code": 16,
		"name": "AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML",
		"costPrice": 18.4,
		"salesPrice": 20.49
	},
	{
		"code": 18,
		"name": "BEBIDA ENERGÉTICA VIBE 2L",
		"costPrice": 8.09,
		"salesPrice": 8.99
	},
	{
		"code": 19,
		"name": "ENERGÉTICO  RED BULL ENERGY DRINK 250ML",
		"costPrice": 6.56,
		"salesPrice": 7.29
	},
	{
		"code": 20,
		"name": "ENERGÉTICO RED BULL ENERGY DRINK 355ML",
		"costPrice": 9.71,
		"salesPrice": 10.79
	},
	{
		"code": 21,
		"name": "BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML",
		"costPrice": 10.71,
		"salesPrice": 11.71
	},
	{
		"code": 22,
		"name": "ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML",
		"costPrice": 6.74,
		"salesPrice": 7.49
	},
	{
		"code": 23,
		"name": "ÁGUA MINERAL BONAFONT SEM GÁS 1,5L",
		"costPrice": 2.15,
		"salesPrice": 2.39
	},
	{
		"code": 24,
		"name": "FILME DE PVC WYDA 28CMX15ML",
		"costPrice": 3.59,
		"salesPrice": 3.99
	},
	{
		"code": 26,
		"name": "ROLO DE PAPEL ALUMÚNIO WYDA 30CMX7,5M",
		"costPrice": 5.21,
		"salesPrice": 5.79
	},
	{
		"code": 1000,
		"name": "BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES",
		"costPrice": 48.54,
		"salesPrice": 53.94
	},
	{
		"code": 1010,
		"name": "KIT ROLO DE ALUMINIO + FILME PVC WYDA",
		"costPrice": 8.8,
		"salesPrice": 9.78
	},
	{
		"code": 1020,
		"name": "SUPER PACK RED BULL VARIADOS - 6 UNIDADES",
		"costPrice": 51.81,
		"salesPrice": 57
	}
]

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
  
  it('should render product validate result with all status Ok', async () => {
    const mockedProductData = [
      {
        product_code: '16',
        new_price: '20',
      },
      {
        product_code: '20',
        new_price: '11.1',
      },
      {
        product_code: '18',
        new_price: '9.50',
      },
      {
        product_code: '19',
        new_price: '7.99',
      },
    ];

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['Nenhum arquivo carregado...', () => null])
      .mockImplementationOnce(() => ['', () => null])
      .mockImplementationOnce(() => [mockedProductData, () => null])
      .mockImplementation(() => [mockedProductFromDB, () => null]);

    renderWithRouter(<App />);
    
    const validateBtn = screen.getByTestId('validateBtn')
    const initialMsg = screen.getByText(/nenhum arquivo carregado\.\.\./i);
    expect(validateBtn).toBeInTheDocument();
    expect(initialMsg).toBeInTheDocument();
    
    userEvent.click(validateBtn);

    // const submitBtn = screen.getByTestId('submitBtn');
    // const resultTable = await screen.findByTestId('resultTable')
    
    // expect(resultTable).toBeInTheDocument();
    // expect(submitBtn).toBeEnabled();
  });
})
