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

int eb(No* n){
    if (n == NULL) {
        return 0;
    } 
    if (n->esquerda == NULL && n->direita == NULL) {
        return 1;
    } 
    if (n->esquerda != NULL && n->direita != NULL) {
        return eb(n->esquerda) && eb(n->direita);
    }

    return 0;
    
}

int main() {
    No* raiz = NULL;
    raiz = insereNo(raiz, 15);
    insereNo(raiz, 30);
    insereNo(raiz, 35);
    insereNo(raiz, 28);
    insereNo(raiz, 34);
    insereNo(raiz, 57);

    printf("%d", eb(raiz));

    return 0;
}
