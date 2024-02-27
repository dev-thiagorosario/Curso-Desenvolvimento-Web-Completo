class Despesa {
  constructor(ano, mes, dia, tipoDespesa, descricao, valor, tipoPagamento) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipoDespesa = tipoDespesa;
    this.descricao = descricao;
    this.valor = valor;
    this.tipoPagamento = tipoPagamento;
  }

  validarDados() {
    for (let i in this) {
      if (this[i] === undefined || this[i] === '' || this[i] === null) {
        return false;
      }
    }
    return true;
  }
}

class Ganho {
  constructor(ano, mes, dia, tipoGanho, descricao, valor, tipoPagamento) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipoGanho = tipoGanho;
    this.descricao = descricao;
    this.valor = valor;
    this.tipoPagamento = tipoPagamento;
  }

  validarDados() {
    for (let i in this) {
      if (this[i] === undefined || this[i] === '' || this[i] === null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    if (localStorage.getItem('despesas') === null) {
      localStorage.setItem('despesas', JSON.stringify([]));
    }
    if (localStorage.getItem('ganhos') === null) {
      localStorage.setItem('ganhos', JSON.stringify([]));
    }
  }

  gravarDespesa(d) {
    let despesas = JSON.parse(localStorage.getItem('despesas'));
    despesas.push(d);
    localStorage.setItem('despesas', JSON.stringify(despesas));
  }

  gravarGanho(g) {
    let ganhos = JSON.parse(localStorage.getItem('ganhos'));
    ganhos.push(g);
    localStorage.setItem('ganhos', JSON.stringify(ganhos));
  }

  recuperarTodosRegistros(tipo) {
    let registros = JSON.parse(localStorage.getItem(tipo));
    return registros;
  }
}

let bd = new Bd();

function cadastrarDespesa() {
  let ano = document.getElementById('ano').value;
  let mes = document.getElementById('mes').value;
  let dia = document.getElementById('dia').value;
  let tipoDespesa = document.getElementById('tipoDespesa').value;
  let descricao = document.getElementById('descricao').value;
  let valor = document.getElementById('valor').value;
  let tipoPagamento = document.getElementById('tipoPagamento').value;

  let despesa = new Despesa(ano, mes, dia, tipoDespesa, descricao, valor, tipoPagamento);

  if (despesa.validarDados()) {
    bd.gravarDespesa(despesa);
    $('#sucessoGravacao').modal('show');
    limparCampos();
  } else {
    $('#erroGravacao').modal('show');
  }
}

function cadastrarGanho() {
  let ano = document.getElementById('ano').value;
  let mes = document.getElementById('mes').value;
  let dia = document.getElementById('dia').value;
  let tipoGanho = document.getElementById('tipoGanho').value; // Certifique-se de ter este campo no seu HTML
  let descricao = document.getElementById('descricao').value;
  let valor = document.getElementById('valor').value;
  let tipoPagamento = document.getElementById('tipoPagamento').value;

  let ganho = new Ganho(ano, mes, dia, tipoGanho, descricao, valor, tipoPagamento);

  if (ganho.validarDados()) {
    bd.gravarGanho(ganho);
    $('#sucessoGravacao').modal('show');
    limparCampos();
  } else {
    $('#erroGravacao').modal('show');
  }
}



function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
    despesas = bd.recuperarTodosRegistros() 
  }
  
  let despesas = bd.recuperarTodosRegistros('despesas');
  let ganhos = bd.recuperarTodosRegistros('ganhos');
  let listaDados = document.getElementById('listaDados');
  listaDados.innerHTML = '';

  despesas.forEach(function(d) {
    let linha = listaDados.insertRow();
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
    linha.insertCell(1).innerHTML = d.tipoDespesa;
    linha.insertCell(2).innerHTML = d.tipoPagamento;
    linha.insertCell(3).innerHTML = d.valor;
    linha.insertCell(4).innerHTML = d.descricao;
  });

  ganhos.forEach(function(g) {
    let linha = listaDados.insertRow();
    linha.insertCell(0).innerHTML = `${g.dia}/${g.mes}/${g.ano}`;
    linha.insertCell(1).innerHTML = g.tipoGanho;
    linha.insertCell(2).innerHTML = g.tipoPagamento;
    linha.insertCell(3).innerHTML = g.valor;
    linha.insertCell(4).innerHTML = g.descricao;
  });
}
