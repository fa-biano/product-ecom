const validateFields = (updateProducts) => {
  const isValidFields = updateProducts
    .every((prod) => prod.product_code && prod.new_price);
  return isValidFields;
};

const validatePriceFormat = (updateProducts) => {
  const isValidPrice = updateProducts.every((prod) => {
    const { __parsed_extra: parsedExtra } = prod;
    return parseFloat(prod.new_price) && !parsedExtra;
  });
  return isValidPrice;
};

const validateProductCode = (productsFromDB, updateProducts) => {
  const codesFromDB = productsFromDB.map((prod) => prod.code);
  const checkCodes = updateProducts.map((prod) => {
    const checkCode = parseInt(prod.product_code, 10);

    const updateProd = {
      code: checkCode,
      name: '',
      currentPrice: '',
      newPrice: parseFloat(prod.new_price),
    };

    if (!codesFromDB.includes(checkCode)) {
      updateProd.validation = 'Codigo de Produto Inválido';
      return updateProd;
    }

    updateProd.validation = 'Ok';
    return updateProd;
  });
  return checkCodes;
};

const validatePrice = (productsFromDB, updateProducts) => {
  const checkPrice = updateProducts.map((prod) => {
    const currentPrice = productsFromDB
      .find((current) => current.code === parseInt(prod.product_code, 10));

    const priceRatio = parseFloat(prod.new_price) / currentPrice.salesPrice;

    const updateProd = {
      code: parseInt(prod.product_code, 10),
      name: currentPrice.name,
      currentPrice: currentPrice.salesPrice,
      newPrice: parseFloat(prod.new_price),
    };

    const maxRatio = 1.1;
    const minRatio = 0.9;
    const isGreaterThanCost = parseFloat(prod.new_price) > currentPrice.costPrice;
    const isValidPriceRatio = priceRatio <= maxRatio && priceRatio >= minRatio;

    if (!isGreaterThanCost) {
      updateProd.validation = 'Novo preço não pode ser menor que o Custo do Produto';
      return updateProd;
    }

    if (isValidPriceRatio) {
      updateProd.validation = 'Ok';
      return updateProd;
    }

    updateProd.validation = 'Novo preço não pode ser maior/menor que 10%';
    return updateProd;
  });
  return checkPrice;
};

const updateProductValidations = (productsFromDB, updateProducts) => {
  const hasValidFields = validateFields(updateProducts);

  if (!hasValidFields) {
    const rule1 = 'deve conter os campos product_code e new_price no cabeçalho';
    const rule2 = 'os valores das linhas devem estar preenchidos';
    return `O Arquivo CSV ${rule1} e ${rule2}`;
  }

  const hasPriceFormat = validatePriceFormat(updateProducts);

  if (!hasPriceFormat) {
    const rule1 = 'deve ter um valor válido';
    const rule2 = 'casas decimais devem ser separadas por ponto';
    return `O campo new_price ${rule1} e ${rule2}`;
  }

  const hasValidCode = validateProductCode(productsFromDB, updateProducts);
  if (!hasValidCode.every((prod) => prod.validation === 'Ok')) {
    return hasValidCode;
  }

  return validatePrice(productsFromDB, updateProducts);
};

export default updateProductValidations;
