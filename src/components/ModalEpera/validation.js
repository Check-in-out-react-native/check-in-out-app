export const validateNome = (nome) => {
    if (!nome || nome.trim() === '') {
      return 'Nome é obrigatório';
    }
    return null;
  };
  
export const validateQntdPessoas = (qntdPessoas) => {
    if (!qntdPessoas || qntdPessoas <= 0) {
      return 'Quantidade deve ser maior que 0';
    }
    return null;
  };