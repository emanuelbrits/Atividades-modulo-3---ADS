#include <iostream>
#include <queue>

using namespace std;

struct Node {
    char data;
    Node* esq;
    Node* dir;
};

Node* criarNo(char data) {
    Node* novoNo = new Node();
    novoNo->data = data;
    novoNo->esq = novoNo->dir = nullptr;
    return novoNo;
}

Node* criaArvoreAlinhada() {
    Node* raiz = criarNo('A');
    raiz->esq = criarNo('B');
    raiz->dir = criarNo('C');
    raiz->esq->esq = criarNo('D');
    raiz->esq->dir = criarNo('E');
    raiz->dir->esq = criarNo('F');
    return raiz;
}

void ImprimeArvoreInOrder(Node* raiz) {
    if (raiz == nullptr)
        return;
    
    ImprimeArvoreInOrder(raiz->esq);
    cout << raiz->data << " ";
    ImprimeArvoreInOrder(raiz->dir);
}

int main() {
    Node* raiz = criaArvoreAlinhada();
    
    cout << "Arvore binaria alinhada: ";
    ImprimeArvoreInOrder(raiz);
    
    return 0;
}
