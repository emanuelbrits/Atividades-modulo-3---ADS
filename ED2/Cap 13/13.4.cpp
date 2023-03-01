#include <stdio.h>
#include <stdlib.h>

typedef struct no {
    int valor;
    struct no *esquerda, *direita;
} No;

No* novoNo(int valor) {
    No* no = (No*) malloc(sizeof(No));
    no->valor = valor;
    no->esquerda = NULL;
    no->direita = NULL;
    return no;
}

No* insereNo(No* raiz, int valor) {
    if (raiz == NULL) {
        return novoNo(valor);
    } else {
        if (valor < raiz->valor) {
            raiz->esquerda = insereNo(raiz->esquerda, valor);
        } else {
            raiz->direita = insereNo(raiz->direita, valor);
        }
        return raiz;
    }
}

int altura_arvore(No* n){
    if(n == NULL) {
        return 0;
    }
    else{
        int alturaesquerda = altura_arvore(n->esquerda);
        int alturadireita = altura_arvore(n->direita);
        if(alturaesquerda > alturadireita){
            return 1 + alturaesquerda;
        }else {
            return 1 + alturadireita;
        }
    }
}


int main() {
    No* raiz = NULL;
    raiz = insereNo(raiz, 15);
    insereNo(raiz, 30);
    insereNo(raiz, 35);
    insereNo(raiz, 34);
    insereNo(raiz, 57);
    int altura = altura_arvore(raiz);
    printf("Altura da árvore: %d", altura);

    return 0;
}
