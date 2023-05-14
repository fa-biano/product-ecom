import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import Context from './Context';

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
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
