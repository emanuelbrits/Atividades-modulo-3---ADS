#include <iostream>

using namespace std;

struct Node {
    char data;
    Node* esq;
    Node* dir;
};

Node* criaNo(char data) {
    Node* newNode = new Node();
    newNode->data = data;
    newNode->esq = newNode->dir = nullptr;
    return newNode;
}

void morrisInOrder(Node* raiz) {
    if (raiz == nullptr)
        return;
    
    Node* atual = raiz;
    while (atual != nullptr) {
        if (atual->esq == nullptr) {
            cout << atual->data << " ";
            atual = atual->dir;
        }
        else {
            Node* anterior = atual->esq;
            while (anterior->dir != nullptr && anterior->dir != atual)
                anterior = anterior->dir;
            
            if (anterior->dir == nullptr) {
                anterior->dir = atual;
                atual = atual->esq;
            }
            else {
                anterior->dir = nullptr;
                cout << atual->data << " ";
                atual = atual->dir;
            }
        }
    }
}

void morrisPreOrder(Node* raiz) {
    if (raiz == nullptr)
        return;
    
    Node* atual = raiz;
    while (atual != nullptr) {
        if (atual->esq == nullptr) {
            cout << atual->data << " ";
            atual = atual->dir;
        }
        else {
            Node* anterior = atual->esq;
            while (anterior->dir != nullptr && anterior->dir != atual)
                anterior = anterior->dir;
            
            if (anterior->dir == nullptr) {
                cout << atual->data << " ";
                anterior->dir = atual;
                atual = atual->esq;
            }
            else {
                anterior->dir = nullptr;
                atual = atual->dir;
            }
        }
    }
}

int main() {
    Node* raiz = criaNo('A');
    raiz->esq = criaNo('B');
    raiz->dir = criaNo('C');
    raiz->esq->esq = criaNo('D');
    raiz->esq->dir = criaNo('E');
    raiz->dir->esq = criaNo('F');
    
    cout << "Percurso in-order utilizando Morris: ";
    morrisInOrder(raiz);
    cout << endl;
    
    cout << "Percurso pre-order utilizando Morris: ";
    morrisPreOrder(raiz);
    cout << endl;
    
    return 0;
}
