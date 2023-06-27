#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    int height;
};

// Função para obter a altura de um nó
int getHeight(Node* node) {
    if (node == nullptr)
        return 0;
    return node->height;
}

// Função para calcular o fator de balanceamento de um nó
int getBalanceFactor(Node* node) {
    if (node == nullptr)
        return 0;
    return getHeight(node->left) - getHeight(node->right);
}

// Função para atualizar a altura de um nó
void updateHeight(Node* node) {
    int leftHeight = getHeight(node->left);
    int rightHeight = getHeight(node->right);
    node->height = max(leftHeight, rightHeight) + 1;
}

// Função para fazer uma rotação simples à direita
Node* rotateRight(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;

    x->right = y;
    y->left = T2;

    updateHeight(y);
    updateHeight(x);

    return x;
}

// Função para fazer uma rotação simples à esquerda
Node* rotateLeft(Node* x) {
    Node* y = x->right;
    Node* T2 = y->left;

    y->left = x;
    x->right = T2;

    updateHeight(x);
    updateHeight(y);

    return y;
}

// Função para inserir um nó em uma árvore AVL
Node* insertNode(Node* root, int data) {
    // Realiza a inserção normal de um nó em uma árvore binária de busca
    if (root == nullptr) {
        Node* newNode = new Node();
        newNode->data = data;
        newNode->left = nullptr;
        newNode->right = nullptr;
        newNode->height = 1;
        return newNode;
    }
    if (data < root->data)
        root->left = insertNode(root->left, data);
    else if (data > root->data)
        root->right = insertNode(root->right, data);
    else
        return root;  // Ignora a inserção de valores duplicados

    // Atualiza a altura do nó atual
    updateHeight(root);

    // Verifica o fator de balanceamento e realiza as rotações, se necessário
    int balanceFactor = getBalanceFactor(root);

    // Caso LL (rotação simples à direita)
    if (balanceFactor > 1 && data < root->left->data)
        return rotateRight(root);

    // Caso RR (rotação simples à esquerda)
    if (balanceFactor < -1 && data > root->right->data)
        return rotateLeft(root);

    // Caso LR (rotação dupla à direita)
    if (balanceFactor > 1 && data > root->left->data) {
        root->left = rotateLeft(root->left);
        return rotateRight(root);
    }

    // Caso RL (rotação dupla à esquerda)
    if (balanceFactor < -1 && data < root->right->data) {
        root->right = rotateRight(root->right);
        return rotateLeft(root);
    }

    return root;
}

// Função para imprimir o percurso in-ordem da árvore AVL
void inOrderTraversal(Node* root) {
    if (root == nullptr)
        return;
    inOrderTraversal(root->left);
    cout << root->data << " ";
    inOrderTraversal(root->right);
}

int main() {
    Node* root = nullptr;

    // Inserindo os valores na árvore AVL
    root = insertNode(root, 7);
    root = insertNode(root, 6);
    root = insertNode(root, 22);
    root = insertNode(root, 14);
    root = insertNode(root, 40);
    root = insertNode(root, 63);

    // Imprimindo o percurso in-ordem da árvore AVL
    cout << "Percurso in-ordem: ";
    inOrderTraversal(root);
    cout << endl;

    return 0;
}
