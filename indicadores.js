$(document).ready(function() {
    $.getJSON('https://mindicador.cl/api', function(data) {
        const indicadores = `
            <p>UF: ${data.uf.valor}</p>
            <p>IVP: ${data.ivp.valor}</p>
            <p>Dólar: ${data.dolar.valor}</p>
            <p>Dólar Intercambio: ${data.dolar_intercambio.valor}</p>
            <p>Euro: ${data.euro.valor}</p>
            <p>IPC: ${data.ipc.valor}</p>
            <p>UTM: ${data.utm.valor}</p>
            <p>IMACEC: ${data.imacec.valor}</p>
        `;
        $('#indicadores').html(indicadores);
    });
});
