import { useState, useContext }  from 'react';
import Papa from 'papaparse';
import Context from '../context/Context';
import UpdateProductTable from '../components/UpdateProductTable';

function ProductManagement() {
  const [localFile, setLocalFile] = useState('');
  const { parsedFile, setParsedFile } = useContext(Context);

  const handleChangeFile = ({ target }) => {
    setLocalFile(target.files[0]);
  }

  const readProductFile = () => {
    Papa.parse(
      localFile,
      { header: true, skipEmptyLines: true, complete: (results) => setParsedFile(results.data) },
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Gestão de Preço de Produtos</h2>
      </header>
      <main>
        <div>
          <input type='file' accept='.csv' onChange={ handleChangeFile }></input>
          <button onClick={ readProductFile }>Validar</button>
        </div>
        <button disabled>Atualizar</button>
        {
          parsedFile.length > 0
            ? <UpdateProductTable/> :
            <div>
              <p>Nenhum arquivo carregado...</p>
            </div>
        }
      </main>
    </div>
  );
}

export default ProductManagement;
