class tarefa {
    id: number;
    ingresso: number;
    duracao: number;
    prioridade: number;
    tempoRestante: number;
    tv: number;
    te: number;
    ultimaEspera: number;
    jaExec: boolean;


    constructor(id, ingresso, duracao, prioridade) {
        this.id = id
        this.ingresso = ingresso;
        this.duracao = duracao;
        this.prioridade = prioridade;
        this.tempoRestante = duracao;
        this.te = 0;
        this.ultimaEspera = ingresso;
        this.jaExec = false;
    }
}

class escalonador {
    quantum: number;
    tc: number;
    fila: tarefa[];
    indexAtual: number;
    tempo: number;
    isTC: boolean;
    tamFila: number;

    constructor(quantum, tc) {
        this.quantum = quantum;
        this.tc = tc;
        this.fila = [];
        this.indexAtual = 0;
        this.tempo = 0;
        this.isTC = false;
    }

    adicionaTarefa(tarefa: tarefa): void {
        this.fila.push(tarefa)
    }

    ordenaIngreso() {
        let tam: number = this.fila.length;
        for(let i = 0; i < tam - 1; i++) {
            for(let j = 0; j< tam - i - 1; j++) {
                if(this.fila[j].ingresso > this.fila[j + 1].ingresso) {
                    [this.fila[j], this.fila[j + 1]] = [this.fila[j + 1], this.fila[j]];
                }
            }
        }
    }

    ordena(): void {
        let aux: tarefa = this.fila[0];
        for(let i = 0; i < this.fila.length; i++) {
            this.fila[i] = this.fila[i + 1];
        }

        this.fila[3] = aux;
    }

    escalona(): void {
        this.tamFila = this.fila.length;

        while (this.tamFila > 0) {
            if(!this.isTC) {
                if(this.fila[0].tempoRestante <= this.quantum) {
                    this.fila[0].te += this.tempo - this.fila[0].ultimaEspera;
                    console.log(`Tempo ${this.tempo}: Tarefa t${this.fila[0].id} em execução.`);
                    this.tempo+= this.fila[0].tempoRestante;
                    this.fila[0].tv = this.tempo - this.fila[0].ingresso;
                    this.fila[0].tempoRestante = 0;
                    this.ordena();
                    this.fila.pop();
                    this.tamFila--;
                    this.isTC = true;
                } else {
                    if(this.tamFila > 1) {
                        if(this.fila[0].jaExec === false) {
                            this.fila[0].te += this.tempo - this.fila[0].ingresso;
                            this.fila[0].jaExec = true;
                        } else {
                            this.fila[0].te += this.tempo - this.fila[0].ultimaEspera;
                        }
                        console.log(`Tempo ${this.tempo}: Tarefa t${this.fila[0].id} em execução.`);
                        this.tempo+= this.quantum;
                        this.fila[0].tempoRestante -= this.quantum;
                        this.fila[0].ultimaEspera = this.tempo;
                        this.ordena();
                        this.isTC = true;
                    } else {
                        this.fila[0].te += this.tempo - this.fila[0].ultimaEspera;
                        console.log(`Tempo ${this.tempo}: Tarefa t${this.fila[0].id} em execução.`);
                        this.tempo+= this.fila[0].tempoRestante;
                        this.fila[0].tv = this.tempo - this.fila[0].ingresso;
                        this.tamFila--;
                    }
                }
            } else {
                for(let i = 0; i < this.tc; i++) {
                    console.log(`Tempo ${this.tempo}: Troca de contexto.`);
                    this.tempo++
                }
                this.isTC = false;
            }
        }
        console.log(`Encerrou em tempo: ${this.tempo}`);
    }
}



let t1 = new tarefa(1, 5, 30, 4);
let t2 = new tarefa(2, 15, 10, 2);
let t3 = new tarefa(3, 10, 40, 1);
let t4 = new tarefa(4, 0, 20, 3);

let esc = new escalonador(15, 4)

esc.adicionaTarefa(t1);
esc.adicionaTarefa(t2);
esc.adicionaTarefa(t3);
esc.adicionaTarefa(t4);

esc.ordenaIngreso();

esc.escalona();

console.log(`\nTempo de vida t1: ${t1.tv}, tempo de espera: ${t1.te}`);
console.log(`Tempo de vida t2: ${t2.tv}, tempo de espera: ${t2.te}`);
console.log(`Tempo de vida t3: ${t3.tv}, tempo de espera: ${t3.te}`);
console.log(`Tempo de vida t4: ${t4.tv}, tempo de espera: ${t4.te}`);

console.log(`\ntempo médio de vida: ${(t1.tv + t2.tv + t3.tv + t4.tv) / 4}`);
console.log(`tempo médio de espera: ${(t1.te + t2.te + t3.te + t4.te) / 4}`);
