function navigateToPreviousPage() {
    window.location.href = '../pagina-1/projeto_index.html'; 
};
document.addEventListener("DOMContentLoaded", () => {
    const valorContaAtual = parseFloat(localStorage.getItem('valorContaAtual'));
    if (isNaN(valorContaAtual) || valorContaAtual <= 0) {
        console.error("Dados de valor da conta inválidos.");
        return;
    };
    const tarifaMedia = 0.73; 
    const imd = 4.25; 
    const eficienciaSistema = 0.75;
    const geracaoMediaKWh = valorContaAtual / tarifaMedia; 
    const consumoDiario = geracaoMediaKWh / 30; 
    const potenciaFinal = consumoDiario / (eficienciaSistema * imd); 
    const potenciaModulo = 550; 
    const modulosNecessarios = Math.ceil((potenciaFinal * 1000) / potenciaModulo); 
    const valorModulo = 1000; 
    const valorInversor = 5000; 
    const valorTotalProjeto = (modulosNecessarios * valorModulo) + valorInversor; 
    const valorParcela = valorTotalProjeto / 60; 
    const valorDesconto = valorTotalProjeto * 0.90; 
document.querySelector('.valordaConta').innerHTML = `<span class="titulo">Valor da Conta Atual:</span> <span class="resultado">R$ ${valorContaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
document.getElementById('geracaoMedia').innerHTML = `<span class="titulo">Geração Média:</span> <span class="resultado">${geracaoMediaKWh.toFixed(2)} KWh/mês</span>`;
document.getElementById('potenciaFinal').innerHTML = `<span class="titulo">Potência Final:</span> <span class="resultado">${potenciaFinal.toFixed(2)} KWp</span>`;
document.getElementById('modulo').innerHTML = `<span class="titulo">Módulos:</span> <span class="resultado">${modulosNecessarios} (WEG 550 W)</span>`;
document.getElementById('inversor').innerHTML = `<span class="titulo">Inversor:</span> <span class="resultado">WEG SIW200G M050</span>`;
document.getElementById('valorProjeto').innerHTML = `<span class="titulo">Valor Total do Projeto:</span> <span class="resultado">R$ ${valorTotalProjeto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
document.getElementById('valorParcela').innerHTML = `<span class="titulo">Valor da Parcela Ajustado:</span> <span class="resultado">R$ ${valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
document.getElementById('valorDesconto').innerHTML = `<span class="titulo">Valor Desconto:</span> <span class="resultado">R$ ${valorDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
document.getElementById('condicaoEspecial').innerHTML = `<span class="titulo">Condição Especial:</span> <span class="resultado">60x de R$ ${valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} com carência de 120 dias</span>`;
});
