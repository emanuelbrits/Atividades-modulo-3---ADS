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

void preOrder(Node* root) {
    if (root == nullptr)
        return;
    
    cout << root->data << " ";
    preOrder(root->esq);
    preOrder(root->dir);
}

int main() {
    Node* root = criaArvoreAlinhada();
    
    cout << "Percurso pre-order: ";
    preOrder(root);
    cout << endl;
    
    return 0;
}