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

int igual(No* a, No* b){
    if(a == NULL || b == NULL){
        return 0;
    } 
    if (a == NULL && b == NULL) {
        return 1;
    } 
    if (a->valor == b->valor) {
        return 1;
    } 
    return igual(a->esquerda, b->esquerda) && igual(a->direita, b->direita);
}

int main() {
    No* raiz = NULL;
    raiz = insereNo(raiz, 15);
    insereNo(raiz, 30);
    insereNo(raiz, 35);
    insereNo(raiz, 28);
    insereNo(raiz, 34);
    insereNo(raiz, 57);

    No* b = NULL;
    b = insereNo(b, 15);
    insereNo(b, 30);
    insereNo(b, 35);
    insereNo(b, 28);
    insereNo(b, 34);
    insereNo(b, 57);

    printf("%d", igual(raiz, b));

    return 0;
}
