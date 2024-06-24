export const validateMesa = (mesa) => {
  if (!mesa || mesa.trim() === '') {
    return 'Mesa é obrigatório';
  }
  return null;
};

export const validateQntdLugares = (qntdLugares) => {
  if (!qntdLugares || qntdLugares <= 0) {
    return 'Quantidade deve ser maior que 0';
  }
  return null;
};