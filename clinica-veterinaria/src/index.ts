
abstract class Animal {
  constructor(
    public nome: string,
    public idade: number,
    public tutor: string
  ) {}

  abstract emitirSom(): string;
  abstract cuidadosDiarios(): string;
}

class Cachorro extends Animal {
  emitirSom(): string {
    return "Au au!";
  }

  cuidadosDiarios(): string {
    return "Precisa de passeio diário.";
  }
}

class Gato extends Animal {
  emitirSom(): string {
    return "Miau!";
  }

  cuidadosDiarios(): string {
    return "Precisa de arranhador.";
  }
}

class Ave extends Animal {
  emitirSom(): string {
    return "Piu piu!";
  }

  cuidadosDiarios(): string {
    return "Precisa de gaiola adequada.";
  }
}

abstract class Funcionario {
  private _salario: number;

  constructor(
    public nome: string,
    public matricula: number,
    salario: number
  ) {
    if (salario <= 0) {
      throw new Error("O salário deve ser maior que zero.");
    }
    this._salario = salario;
  }

  get salario(): number {
    return this._salario;
  }

  alterarSalario(novoSalario: number): void {
    if (novoSalario <= 0) {
      throw new Error("O novo salário deve ser maior que zero.");
    }
    this._salario = novoSalario;
  }

  abstract calcularBonus(): number;
}

class Veterinario extends Funcionario {
  constructor(
    nome: string,
    matricula: number,
    salario: number,
    public consultasRealizadas: number = 0,
    public valorPorConsulta: number = 20
  ) {
    super(nome, matricula, salario);
  }

  realizarConsulta(): void {
    this.consultasRealizadas++;
  }

  calcularBonus(): number {
    return this.consultasRealizadas * this.valorPorConsulta;
  }

  prescreverTratamento(): string {
    return "Tratamento prescrito pelo veterinário.";
  }
}

class Recepcionista extends Funcionario {
  constructor(
    nome: string,
    matricula: number,
    salario: number,
    public agendamentosConfirmados: number = 0,
    public valorPorAgendamento: number = 5
  ) {
    super(nome, matricula, salario);
  }

  agendarAtendimento(): void {
    this.agendamentosConfirmados++;
  }

  calcularBonus(): number {
    return this.agendamentosConfirmados * this.valorPorAgendamento;
  }
}

class Consulta {
  constructor(
    public animal: Animal,
    public veterinario: Veterinario,
    public data: Date
  ) {}
}

class Clinica {
  public animais: Animal[] = [];
  public funcionarios: Funcionario[] = [];
  public consultas: Consulta[] = [];

  constructor(public nome: string) {}

  cadastrarAnimal(animal: Animal): void {
    this.animais.push(animal);
  }

  contratarFuncionario(funcionario: Funcionario): void {
    this.funcionarios.push(funcionario);
  }

  registrarConsulta(consulta: Consulta): void {
    this.consultas.push(consulta);
    consulta.veterinario.realizarConsulta();
  }

  listarAnimais(): void {
    console.log("\\--- Animais cadastrados ---");
    for (const animal of this.animais) {
      console.log(
        `${animal.nome} (${animal.idade} anos) - Tutor: ${animal.tutor}`
      );
      console.log(`Som: ${animal.emitirSom()}`);
      console.log(`Cuidados: ${animal.cuidadosDiarios()}`);
    }
  }

  listarFuncionarios(): void {
    console.log("\\--- Funcionários ---");
    for (const funcionario of this.funcionarios) {
      console.log(
        `${funcionario.nome} | Salário: R$ ${funcionario.salario.toFixed(2)} | Bônus: R$ ${funcionario.calcularBonus().toFixed(2)}`
      );
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
