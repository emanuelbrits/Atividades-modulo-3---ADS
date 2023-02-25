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

void percorreEmOrdem(No* raiz) {
    if (raiz != NULL) {
        percorreEmOrdem(raiz->esquerda);
        printf("%d ", raiz->valor);
        percorreEmOrdem(raiz->direita);
    }
}

void imprimeFilho(No* n) {
    if (n != NULL) {
        printf("<%d", n->valor);        
        imprimeFilho(n->esquerda);        
        imprimeFilho(n->direita);        
        printf(">");    
        } else {        
        printf("<>");    
    }
}


int main() {
    No* raiz = NULL;
    raiz = insereNo(raiz, 15);
    insereNo(raiz, 20);
    insereNo(raiz, 35);
    insereNo(raiz, 57);

    printf("Percorrendo em ordem: ");
    percorreEmOrdem(raiz);
    printf("Percorrendo os filhos: ");
    imprimeFilho(raiz);
    printf("\n");

    return 0;
}
