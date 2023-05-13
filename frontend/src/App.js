import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Gestão de Preço de Produtos</h2>
      </header>
      <main>
        <div>
          <input type='file'></input>
          <button>Validar</button>
        </div>
        <button disabled>Atualizar</button>
      </main>
    </div>
  );
}

export default App;
