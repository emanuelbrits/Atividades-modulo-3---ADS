class banco {
    re: number;
    instancias: number;
    alocados: number;
    livre: number;
    processos: processo[];
    terminados: number;
    seguro: boolean;

    constructor(r: number, i: number, a: number, l: number) {
        this.re = r;
        this.instancias = i;
        this.alocados = a;
        this.livre = l;
        this.processos = []
        this.terminados = 0
        this.seguro = false;
    }

    adicionarProcesso(processo: processo) {
        this.processos.push(processo)
    }

    rodar() {
        let contador: number = 0;
        while(this.terminados < this.processos.length) {

            for(let processo of this.processos) {
                if(processo.necessita > 0) {
                    if(processo.possui + this.livre >= processo.necessita) {
                        console.log(`Testando processo ${processo.nome}`);
                        for(let processo of this.processos) {
                            console.log(`Processo ${processo.nome}: Possui: ${processo.possui}, necessita: ${processo.necessita}`)
                        }
                        console.log(`Livre: ${this.livre}\n`);
                        processo.necessita = 0;
                        this.livre += processo.possui
                        processo.possui = 0
                        this.terminados++;
                        contador = 0;
                        if(this.terminados === this.processos.length) {
                            console.log('Resultado final:');
                            for(let processo of this.processos) {
                                console.log(`Processo ${processo.nome}: Possui: ${processo.possui}, necessita: ${processo.necessita}`)
                            }
                            console.log(`Livre: ${this.livre}\n\nEstado Seguro`);
                            this.seguro = true;
                        }
                    } 
                    contador++;
                    if(contador === this.processos.length) {
                        console.log('Estado inseguro');
                        return;
                    }
                } 
            }
        }
    }
}

class processo {
    nome: string;
    possui: number;
    necessita: number;

    constructor(n: string, p: number, ne: number) {
        this.nome = n;
        this.possui = p;
        this.necessita = ne;
    }
}

let b: banco = new banco(1, 10, 7, 3);

let pa: processo = new processo('A', 3, 9);
let pb: processo = new processo('B', 2, 4);
let pc: processo = new processo('C', 2, 7);

b.adicionarProcesso(pa);
b.adicionarProcesso(pb);
b.adicionarProcesso(pc);

b.rodar()
