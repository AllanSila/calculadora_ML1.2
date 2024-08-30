let campotxt = document.getElementById('valor-receber');
let resultado = document.getElementById('resultado');
let tipoExposicao = document.getElementById('opcoes');
let valor_inserido = document.getElementById('venda_atual')
const body = document.getElementById('body')
const taxa_comissao_padrao = 0.17; 
const taxa_comissao_classico = 0.12; 
const frete_padrao = 23.50; 
const taxa_extra = 6.00; 


document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio imediato do formulário

    let valorReceber = campotxt.value;

    // Substitui vírgula por ponto
    valorReceber = valorReceber.replace(',', '.');

    // Valida se o valor é realmente um número
    if (isNaN(valorReceber) || valorReceber.trim() === "") {
        alert("Por favor, insira um valor numérico válido.");
        return; // Sai da função se o valor não for válido
    }

    // Converte para número
    valorReceber = parseFloat(valorReceber);

    // Seleciona a comissão com base na opção escolhida
    let taxa_comissao = tipoExposicao.value === 'classico' ? taxa_comissao_classico : taxa_comissao_padrao;

    // Adiciona a taxa extra ao valor recebido
    let valorBase = valorReceber + taxa_extra;

    // Calcula o valor de venda necessário para cobrir o valor base e a comissão
    let valorVendaAntesFrete = valorBase / (1 - taxa_comissao);

    // Verifica se o valor de venda ultrapassa R$79 para determinar o frete
    let frete;
    if (valorVendaAntesFrete >= 79) {
        frete = frete_padrao; // Frete padrão de R$23,50 se o valor de venda for R$79 ou mais
    } else {
        frete = taxa_extra; // Taxa extra de R$6 se o valor de venda for menos de R$79
    }

    // Ajusta o valor de venda se o frete for a taxa extra, não inclui o frete na soma
    let valorVendaFinal;
    if (frete === taxa_extra) {
        valorVendaFinal = valorVendaAntesFrete; // Apenas o valor de venda antes do frete
    } else {
        valorVendaFinal = valorVendaAntesFrete + frete; // Valor de venda antes do frete mais o frete
    }

    let valorComissao = valorVendaFinal * taxa_comissao;

    document.getElementById('valor_venda').textContent = `R$ ${valorVendaFinal.toFixed(2)}`;
    document.getElementById('valor_comissao').textContent = `R$ ${valorComissao.toFixed(2)}`;
    document.getElementById('exposicao').textContent = tipoExposicao.options[tipoExposicao.selectedIndex].text;
    document.getElementById('frete').textContent = `R$ ${frete.toFixed(2)}`;
    document.getElementById('venda_atual').textContent = `R$ ${campotxt.value}`;

    
    // Mostra a seção de resultados
    resultado.style.display = 'block';
    body.style.height = '100%'

    // Limpa o campo de entrada
    campotxt.value = '';
});
