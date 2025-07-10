import { useState } from 'react';

export default function CotacaoForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cotacoes, setCotacoes] = useState([]);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}${month}${day}`;
  };

  const buscarCotacao = async () => {
    if (!startDate || !endDate) return alert('Preencha as datas.');

    const start = formatDate(startDate);
    const end = formatDate(endDate);
    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${start}&end_date=${end}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setCotacoes(data);
    } catch (err) {
      console.error('Erro ao buscar cotação:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Buscar Cotação USD/BRL</h2>
      <div>
        <label>Data Início:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>Data Fim:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button onClick={buscarCotacao}>Buscar</button>

      {cotacoes.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Compra</th>
              <th>Venda</th>
            </tr>
          </thead>
          <tbody>
            {cotacoes.map((item) => (
              <tr key={item.timestamp}>
                <td>{new Date(item.timestamp * 1000).toLocaleDateString()}</td>
                <td>{parseFloat(item.bid).toFixed(2)}</td>
                <td>{parseFloat(item.ask).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

