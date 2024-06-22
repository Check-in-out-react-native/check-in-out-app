import axios from "axios";

const baseUrl = 'https://mobile2024.000webhostapp.com/';

const fetchMesas = (cb) => {
    axios.get(`${baseUrl}listar_mesas.php`)
        .then(response => {
            if (response.status === 200) cb(response.data);
            else console.error(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => console.error('Error fetching mesas:', error));
};

const fetchEspera = (cb) => {
    axios.get(`${baseUrl}fila_de_espera.php`)
        .then(response => {
            if (response.status === 200) cb(response.data);
            else console.error(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => console.error('Error fetching espera:', error));
};

const fetchExcluirCliente = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}excluir_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cbSuccess();
            else cbError(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => cbError('Error:', error));
};

const fetchClientePorQtd = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}clientes_por_qtd.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cbSuccess(response.data);
            else cbError(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => cbError('Error:', error));
};

const fetchEnviarClienteFila = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}enviar_cliente_fila.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cbSuccess(response.data);
            else cbError(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => cbError('Error:', error));
};

const fetchCheckOut = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}excluir_cliente_mesa.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cbSuccess();
            else cbError(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => cbError('Error:', error));
};

const fetchCheckinCliente = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}checkin_cliente_da_fila.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) cbSuccess();
            else cbError(`Error ${response.status}: ${response.statusText}`);
        })
        .catch(error => cbError('Error:', error));
};

const fetchAdicionaMesa = (dto, cbSuccess, cbError) => {
    axios.post(`${baseUrl}add_mesa.php`, new URLSearchParams(dto))
        .then(response => {
            if (response.status === 200) {
                cbSuccess(response.data);  // Verifique se a resposta contém os dados necessários
            } else {
                cbError(`Error ${response.status}: ${response.statusText}`);
            }
        })
        .catch(error => cbError('Error:', error));
};

// const fetchExcluirMesa = (dto, cbSuccess, cbError) => {
//     axios.post(`${baseUrl}excluir_cliente_fila.php`, new URLSearchParams(dto))
//         .then(response => {
//             if (response.status === 200) cbSuccess();
//             else cbError(`Error ${response.status}: ${response.statusText}`);
//         })
//         .catch(error => cbError('Error:', error));
// };

export {
    fetchEnviarClienteFila,
    fetchMesas,
    fetchExcluirCliente,
    fetchEspera,
    fetchCheckOut,
    fetchClientePorQtd,
    fetchCheckinCliente,
    fetchAdicionaMesa
};