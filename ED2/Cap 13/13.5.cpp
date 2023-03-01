include <stdio.h>
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

int tem(No* n, int x){
        if (n == NULL) {
            return 0;
        } else if(n->valor == x) {
            return 1;
        } else if (n->valor < x) {
            tem(n->direita, x);
        } else {
            tem(n->esquerda, x);
        }
    
}


int main() {
    No* raiz = NULL;
    raiz = insereNo(raiz, 15);
    insereNo(raiz, 30);
    insereNo(raiz, 35);
    insereNo(raiz, 34);
    insereNo(raiz, 57);

    printf("type any number: ");
    int x;
    scanf("%d", &x);

    if (tem(raiz, x)) {
        printf("Number %d find on tree!", x);
    }else {
        printf("Number %d does not find on tree!", x);
    }

    return 0;
}
