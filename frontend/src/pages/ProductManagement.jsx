import { useState, useContext, useEffect } from 'react';
import Papa from 'papaparse';
import Context from '../context/Context';
import UpdateProductTable from '../components/UpdateProductTable';
import updateProductValidations from '../utils/updateProductValidations';

function ProductManagement() {
  const [localFile, setLocalFile] = useState('');
  const [parsedFile, setParsedFile] = useState([]);
  const [productsFromDB, setProductsFromDB] = useState([]);
  const { validatedFile, setValidatedFile } = useContext(Context);

  const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
  const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
  const endpoint = `${PROTOCOL}://${HOST}/products`;

  const handleChangeFile = ({ target }) => {
    setLocalFile(target.files[0]);
  };

  const ValidateProductFile = () => {
    if (parsedFile.length > 0) {
      const validations = updateProductValidations(productsFromDB, parsedFile);
      setValidatedFile(validations);
    }
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
      if (result.message === 'Updated') {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
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
  }, [endpoint]);

  useEffect(() => {
    if (localFile) {
      Papa.parse(
        localFile,
        {
          header: true,
          skipEmptyLines: true,
          complete: (results) => setParsedFile(results.data),
        },
      );
    }
  }, [localFile]);

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
            data-testid="fileInput"
            onChange={ handleChangeFile }
          />

          <button
            type="button"
            data-testid="validateBtn"
            onClick={ ValidateProductFile }
          >
            Validar
          </button>

        </div>
        <button
          type="button"
          data-testid="submitBtn"
          disabled={ !isButtonDisabled }
          onClick={ handleSubmit }
        >
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
