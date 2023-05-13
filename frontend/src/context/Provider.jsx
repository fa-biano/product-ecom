import Context from './Context';
import { useState, useMemo } from 'react';

function Provider({ children }) {
  const [parsedFile, setParsedFile] = useState('');

  const context = useMemo(() => ({
    parsedFile,
    setParsedFile,
  }), [parsedFile]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  )
}

export default Provider;
