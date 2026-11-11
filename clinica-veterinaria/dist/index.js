"use strict";
class Animal {
    constructor(nome, idade, tutor) {
        this.nome = nome;
        this.idade = idade;
        this.tutor = tutor;
    }
}
class Cachorro extends Animal {
    emitirSom() {
        return "Au au!";
    }
    cuidadosDiarios() {
        return "Precisa de passeio diário.";
    }
}
class Gato extends Animal {
    emitirSom() {
        return "Miau!";
    }
    cuidadosDiarios() {
        return "Precisa de arranhador.";
    }
}
class Ave extends Animal {
    emitirSom() {
        return "Piu piu!";
    }
    cuidadosDiarios() {
        return "Precisa de gaiola adequada.";
    }
}
class Funcionario {
    constructor(nome, matricula, salario) {
        this.nome = nome;
        this.matricula = matricula;
        if (salario <= 0) {
            throw new Error("O salário deve ser maior que zero.");
        }
        this._salario = salario;
    }
    get salario() {
        return this._salario;
    }
    alterarSalario(novoSalario) {
        if (novoSalario <= 0) {
            throw new Error("O novo salário deve ser maior que zero.");
        }
        this._salario = novoSalario;
    }
}
class Veterinario extends Funcionario {
    constructor(nome, matricula, salario, consultasRealizadas = 0, valorPorConsulta = 20) {
        super(nome, matricula, salario);
        this.consultasRealizadas = consultasRealizadas;
        this.valorPorConsulta = valorPorConsulta;
    }
    realizarConsulta() {
        this.consultasRealizadas++;
    }
    calcularBonus() {
        return this.consultasRealizadas * this.valorPorConsulta;
    }
    prescreverTratamento() {
        return "Tratamento prescrito pelo veterinário.";
    }
}
class Recepcionista extends Funcionario {
    constructor(nome, matricula, salario, agendamentosConfirmados = 0, valorPorAgendamento = 5) {
        super(nome, matricula, salario);
        this.agendamentosConfirmados = agendamentosConfirmados;
        this.valorPorAgendamento = valorPorAgendamento;
    }
    agendarAtendimento() {
        this.agendamentosConfirmados++;
    }
    calcularBonus() {
        return this.agendamentosConfirmados * this.valorPorAgendamento;
    }
}
class Consulta {
    constructor(animal, veterinario, data) {
        this.animal = animal;
        this.veterinario = veterinario;
        this.data = data;
    }
}
class Clinica {
    constructor(nome) {
        this.nome = nome;
        this.animais = [];
        this.funcionarios = [];
        this.consultas = [];
    }
    cadastrarAnimal(animal) {
        this.animais.push(animal);
    }
    contratarFuncionario(funcionario) {
        this.funcionarios.push(funcionario);
    }
    registrarConsulta(consulta) {
        this.consultas.push(consulta);
        consulta.veterinario.realizarConsulta();
    }
    listarAnimais() {
        console.log("\\--- Animais cadastrados ---");
        for (const animal of this.animais) {
            console.log(`${animal.nome} (${animal.idade} anos) - Tutor: ${animal.tutor}`);
            console.log(`Som: ${animal.emitirSom()}`);
            console.log(`Cuidados: ${animal.cuidadosDiarios()}`);
        }
    }
    listarFuncionarios() {
        console.log("\\--- Funcionários ---");
        for (const funcionario of this.funcionarios) {
            console.log(`${funcionario.nome} | Salário: R$ ${funcionario.salario.toFixed(2)} | Bônus: R$ ${funcionario.calcularBonus().toFixed(2)}`);
        }
    }
}
const clinica = new Clinica("Clínica Veterinária da Dona Marta");
const cachorro = new Cachorro("Rex", 4, "João");
const gato = new Gato("Mimi", 2, "Ana");
const ave = new Ave("Louro", 1, "Carlos");
const veterinaria = new Veterinario("Dra. Paula", 101, 3500);
const recepcionista = new Recepcionista("Marina", 202, 1800);
clinica.cadastrarAnimal(cachorro);
clinica.cadastrarAnimal(gato);
clinica.cadastrarAnimal(ave);
clinica.contratarFuncionario(veterinaria);
clinica.contratarFuncionario(recepcionista);
recepcionista.agendarAtendimento();
recepcionista.agendarAtendimento();
clinica.registrarConsulta(new Consulta(cachorro, veterinaria, new Date()));
clinica.listarAnimais();
clinica.listarFuncionarios();
console.log("\\Consulta registrada:", clinica.consultas.length);
console.log(veterinaria.prescreverTratamento());
