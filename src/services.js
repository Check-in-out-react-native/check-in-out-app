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
        });
};

const fetchExcluirCliente = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}excluir_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) return cbSuccess();
        })
        .catch(() => cbError());
};

const fetchClientePorQtd = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}clientes_por_qtd.php`, new URLSearchParams(dto))
        .then(response => {
            const success = response.status === 200;

            if(success) return cbSuccess(response.data);
        })
        .catch(() => cbError());
};

const fetchEnviarClienteFila = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}enviar_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            const success = response.status === 200;

            if(success) return cbSuccess(response.data);
        })
        .catch(() => cbError());
};

const fetchCheckOut = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}excluir_cliente_mesa.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cbSuccess();
        })
        .catch(() => cbError());
};

const fetchCheckinCliente = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}checkin_cliente_da_fila.php`, new URLSearchParams(dto))
        .then(response => {
            const success = response.status === 200;

            if(success) return cbSuccess();
        })
        .catch(() => cbError());
}

const fetchExcluirMesa = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}excluir_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) return cbSuccess();
        })
        .catch(() => cbError());
};

export { 
    fetchEnviarClienteFila, 
    fetchMesas, 
    fetchExcluirCliente, 
    fetchEspera, 
    fetchCheckOut, 
    fetchClientePorQtd,
    fetchCheckinCliente,
    fetchExcluirMesa
};
