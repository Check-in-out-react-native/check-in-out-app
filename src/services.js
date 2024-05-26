import axios from "axios";

const baseUrl = 'https://mobile2024.000webhostapp.com/';

const fetchMesas = (cb) => {
    axios.get(`${baseUrl}listar_mesas.php`)
        .then(response => {
            if (response.status === 200) cb(response.data)
            else console.error(`Error ${response.status}: ${response.statusText}`);
        });
};

const fetchEspera = (cb) => {
    axios.get(`${baseUrl}fila_de_espera.php`)
        .then(response => {
            if (response.status === 200) cb(response.data);
            else console.error(`Error ${response.status}: ${response.statusText}`);
        });
};

const fetchExcluirCliente = (dto, cb) => {
    axios.post(`${baseUrl}excluir_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cb();
            else console.error(`Error ${response.status}: ${response.statusText}`);
        });
};

const fetchClientePorQtd = (dto, cb) => {
    axios.post(`${baseUrl}clientes_por_qtd.php`, new URLSearchParams(dto))
        .then(response => {
            const success = response.status === 200;

            if(success) cb(response.data);
        });
};

const fetchEnviarClienteFila = (dto, cb) => {
    axios.post(`${baseUrl}enviar_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            const success = response.status === 200;

            if(success) return cb(response.data);
            else console.error(`Error ${response.status}: ${response.statusText}`);
        });
};

const fetchCheckOut = (dto, cb) => {
    axios.post(`${baseUrl}excluir_cliente_mesa.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cb();
            else console.error(`Erro ${response.status}: ${response.statusText}`);
        });
};

const fetchCheckinCliente = (dto, cb) => {
    axios.post(`${baseUrl}checkin_cliente_da_fila.php`, new URLSearchParams(dto))
        .then(response => {
            const success = response.status === 200;

            if(success) cb();
            else console.error(`Error ${response.status}: ${response.statusText}`);
        });
}

export { 
    fetchEnviarClienteFila, 
    fetchMesas, 
    fetchExcluirCliente, 
    fetchEspera, 
    fetchCheckOut, 
    fetchClientePorQtd,
    fetchCheckinCliente
};
