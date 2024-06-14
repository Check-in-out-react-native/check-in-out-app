export const validateNomeMesa = (nome) => {
    if (!nome || nome.trim() === '') {
      return 'Nome é obrigatório';
    }
    return null;
  };
  
export const validateQntdLugares = (qntdPessoas) => {
    if (!qntdPessoas || qntdPessoas <= 0) {
      return 'Quantidade deve ser maior que 0';
    }
    return null;
  };