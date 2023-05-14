import { useState, useContext, useEffect } from 'react';
import Papa from 'papaparse';
import Context from '../context/Context';
import UpdateProductTable from '../components/UpdateProductTable';
import updateProductValidations from '../utils/updateProductValidations';

function ProductManagement() {
  const [localFile, setLocalFile] = useState('');
  const [productsFromDB, setProductsFromDB] = useState([]);
  const [parsedFile, setParsedFile] = useState([]);
  const { validatedFile, setValidatedFile } = useContext(Context);

  const handleChangeFile = ({ target }) => {
    setLocalFile(target.files[0]);
  };

  const readProductFile = () => {
    Papa.parse(
      localFile,
      {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setParsedFile(results.data);
          const validations = updateProductValidations(productsFromDB, results.data);
          setValidatedFile(validations);
          console.log('validatedFile', validatedFile);
        },
      },
    );
  };

  useEffect(() => {
    const fetchProductsApi = async () => {
      const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
      const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
      const endpoint = `${PROTOCOL}://${HOST}/products`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setProductsFromDB(data);
    };
    fetchProductsApi();
  }, [productsFromDB]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Gestão de Preço de Produtos</h2>
      </header>
      <main>
        <div>
          <input type="file" accept=".csv" onChange={ handleChangeFile } />
          <button type="button" onClick={ readProductFile }>Validar</button>
        </div>
        <button type="submit" disabled>Atualizar</button>
        {
          parsedFile.length > 0
            ? <UpdateProductTable />
            : <p>Nenhum arquivo carregado...</p>
        }
      </main>
    </div>
  );
}

export default ProductManagement;
