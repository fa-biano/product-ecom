import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [validatedFile, setValidatedFile] = useState('Nenhum arquivo carregado...');

  const context = useMemo(() => ({
    validatedFile,
    setValidatedFile,
  }), [validatedFile, setValidatedFile]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
