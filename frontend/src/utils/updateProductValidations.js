const validateFields = (updateProducts) => {
  const isValidFields = updateProducts
    .every((prod) => prod.product_code && prod.new_price);
  console.log('isValidFields', isValidFields);
  return isValidFields;
};

const validatePriceFormat = (updateProducts) => {
  const isValidPrice = updateProducts.every((prod) => {
    const { __parsed_extra: parsedExtra } = prod;
    return parseFloat(prod.new_price) && !parsedExtra;
  });
  console.log('isValidPrice', isValidPrice);
  return isValidPrice;
};

const validateProductCode = (productsFromDB, updateProducts) => {
  const codesFromDB = productsFromDB.map((prods) => prods.code);
  const checkCodes = updateProducts.map((prods) => {
    const checkCode = parseInt(prods.product_code, 10);
    if (!codesFromDB.includes(checkCode)) {
      prods.validation = 'Codigo de Produto Inválido';
      return prods;
    }
    prods.validation = 'Ok';
    return prods;
  });
  console.log('codesFromDB', codesFromDB);
  console.log('updateCodes', checkCodes);
  return checkCodes;
};

const validatePrice = (productsFromDB, updateProducts) => {
  const checkPrice = updateProducts.map((prod) => {
    const currentPrice = productsFromDB
      .find((current) => current.code === parseInt(prod.product_code, 10));

    const priceRatio = parseFloat(prod.new_price) / currentPrice.salesPrice;
    console.log(
      `${parseFloat(prod.new_price)} / ${currentPrice.salesPrice} = ${priceRatio}`,
    );

    const maxRatio = 1.1;
    const minRatio = 0.9;
    if (priceRatio <= maxRatio && priceRatio >= minRatio) {
      prod.validation = 'Ok';
      return prod;
    }
    prod.validation = 'Novo preço não pode ter alteração maior/menor que 10%';
    return prod;
  });
  console.log('check', checkPrice);
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
