import { useContext } from 'react';
import Context from '../context/Context';

function UpdateProductTable() {
  const { validatedFile } = useContext(Context);

  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Preço Atual</th>
          <th>Novo Preço</th>
          <th>Validação</th>
        </tr>
      </thead>
      <tbody>
        {
          validatedFile.map((prod) => {
            const { code, name, currentPrice, newPrice, validation } = prod;
            return (
              <tr key={ code }>
                <td>{ code }</td>
                <td>{ name }</td>
                <td>{ currentPrice }</td>
                <td>{ newPrice }</td>
                <td>{ validation }</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default UpdateProductTable;
