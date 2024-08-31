function resultado(){
    let indice = parseInt(document.getElementById('indice').value, 10);
    let soma = parseInt(document.getElementById('somaa').value, 10);
    let k = parseInt(document.getElementById('k').value, 10);

    while (k < indice) {
        k = k + 1;
        soma = soma + k;
    }

    let resultadoElemento = document.getElementById('resultado');
    resultadoElemento.textContent = soma;

} 

function verificarFibonacci() {
    let numero = parseInt(document.getElementById('numero').value, 10);

    if (isNaN(numero) || numero < 0) {
        document.getElementById('resultadoFubonacci').textContent = 'Por favor, insira um número válido.';
        return;
    }

    function pertenceFibonacci(num) {
        let a = 0, b = 1;

        if (num === 0 || num === 1) return true;
        while (b < num) {
            let temp = a;
            a = b;
            b = temp + b;
        }
        return b === num;
    }


    let resultado = pertenceFibonacci(numero) ? 'O número pertence à sequência de Fibonacci.' : 'O número não pertence à sequência de Fibonacci.';
    document.getElementById('resultadoFubonacci').textContent = resultado;
}


const jsonUrl = 'db.json';

async function carregarDados() {
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error('Erro ao carregar o JSON');
        
        const dados = await response.json();
        preencherTabela(dados);
        calcularEstatisticas(dados);
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector('#tabelaFaturamento tbody').innerHTML = '<tr><td colspan="2">Erro ao carregar dados.</td></tr>';
    }
}

function preencherTabela(dados) {
    const tbody = document.querySelector('#tabelaFaturamento tbody');
    tbody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

    dados.forEach(dia => {
        const tr = document.createElement('tr');
        const tdDia = document.createElement('td');
        const tdNomeDia = document.createElement('td');
        const tdValor = document.createElement('td');

        tdDia.textContent = dia.dia;
        tdValor.textContent = dia.valor === 0 ? '0' : `R$ ${dia.valor}`;
        tdNomeDia.textContent = dia.Nome;
        tr.appendChild(tdDia);
        tr.appendChild(tdNomeDia);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    });
}

function calcularEstatisticas(dados) {
    const diasComFaturamento = dados.filter(d => d.valor > 0);
    const valores = diasComFaturamento.map(d => d.valor);

    if (valores.length === 0) {
        document.getElementById('menorValor').textContent = 'Menor valor: Não há dados de faturamento.';
        document.getElementById('maiorValor').textContent = 'Maior valor: Não há dados de faturamento.';
        document.getElementById('diasAcimaDaMedia').textContent = 'Dias acima da média: Não há dados de faturamento.';
        return;
    }

    const menorValor = Math.min(...valores);
    const maiorValor = Math.max(...valores);
    const soma = valores.reduce((acc, val) => acc + val, 0);
    const mediaMensal = soma / valores.length;

    const diasAcimaDaMedia = diasComFaturamento.filter(d => d.valor > mediaMensal).length;


    document.getElementById('menorValor').textContent = `Menor valor: R$ ${menorValor}`;
    document.getElementById('maiorValor').textContent = `Maior valor: R$ ${maiorValor}`;
    document.getElementById('mediaValor').textContent = `Média: R$${mediaMensal.toFixed(2)}`;
    document.getElementById('diasAcimaDaMedia').textContent = `Dias acima da média: ${diasAcimaDaMedia}`;
}




const faturamento = {
    SP: 67836.43,
    RJ: 36678.66,
    MG: 29229.88,
    ES: 27165.48,
    Outros: 19849.53
};

function calcularPercentuais(faturamento) {
    const total = Object.values(faturamento).reduce((acc, valor) => acc + valor, 0);
    const percentuais = {};

    for (const estado in faturamento) {
        percentuais[estado] = (faturamento[estado] / total * 100).toFixed(2);
    }

    return percentuais;
}


const percentuais = calcularPercentuais(faturamento);


const tabelaBody = document.querySelector('#tabela-percentuais tbody');


for (const estado in percentuais) {
    const row = document.createElement('tr');
    const cellEstado = document.createElement('td');
    const cellPercentual = document.createElement('td');

    cellEstado.textContent = estado;
    cellPercentual.textContent = `${percentuais[estado]}%`;

    row.appendChild(cellEstado);
    row.appendChild(cellPercentual);
    tabelaBody.appendChild(row);
}

function inverterString(str) {
    let resultado = '';
    for (let i = str.length - 1; i >= 0; i--) {
        resultado += str[i];
    }
    return resultado;
}

// Função chamada quando o botão é clicado
function invertString() {
    // Obtendo a string do input
    const inputString = document.getElementById('inputString').value;
    
    // Invertendo a string
    const stringInvertida = inverterString(inputString);
    
    // Atualizando os elementos na página
    document.getElementById('original').textContent = inputString;
    document.getElementById('invertida').textContent = stringInvertida;
}

document.addEventListener('DOMContentLoaded', carregarDados);