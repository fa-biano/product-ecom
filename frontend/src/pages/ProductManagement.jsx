import { useState, useContext, useEffect } from 'react';
import Papa from 'papaparse';
import Context from '../context/Context';
import UpdateProductTable from '../components/UpdateProductTable';
import updateProductValidations from '../utils/updateProductValidations';

function ProductManagement() {
  const [localFile, setLocalFile] = useState('');
  const [productsFromDB, setProductsFromDB] = useState([]);
  const { validatedFile, setValidatedFile } = useContext(Context);

  const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
  const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
  const endpoint = `${PROTOCOL}://${HOST}/products`;

  const handleChangeFile = ({ target }) => {
    setLocalFile(target.files[0]);
  };

  const readAndValidateProductFile = () => {
    Papa.parse(
      localFile,
      {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const validations = updateProductValidations(productsFromDB, results.data);
          setValidatedFile(validations);
        },
      },
    );
  };

  const isButtonDisabled = Array.isArray(validatedFile) && validatedFile
    .every((prod) => prod.validation === 'Ok');

  const handleSubmit = async () => {
    try {
      const updateProducts = validatedFile
        .map((prod) => ({ code: prod.code, salesPrice: prod.newPrice }));
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProducts),
      });

      const result = await response.json();
      console.log('result', result);
      if (result.message === 'Updated') {
        window.location.reload();
      }
    } catch (err) {
      console.err(err);
    }
  };

  useEffect(() => {
    const fetchProductsApi = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setProductsFromDB(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProductsApi();
  });

  return (
    <div className="App">
      <header className="App-header">
        <h2>Gestão de Preço de Produtos</h2>
      </header>
      <main>
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={ handleChangeFile }
          />
          <button type="button" onClick={ readAndValidateProductFile }>Validar</button>
        </div>
        <button type="submit" disabled={ !isButtonDisabled } onClick={ handleSubmit }>
          Atualizar
        </button>
        {
          typeof validatedFile === 'string'
            ? <p>{validatedFile}</p>
            : <UpdateProductTable />
        }
      </main>
    </div>
  );
}

export default ProductManagement;
