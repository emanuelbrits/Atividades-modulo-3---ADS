//grupo emanuel, italo e nicolas
#include <iostream>

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int value) : data(value), left(nullptr), right(nullptr) {}
};

void printInorder(TreeNode* root) {
    if (root == nullptr) {
        return;
    }

    printInorder(root->left);
    std::cout << root->data << " ";
    printInorder(root->right);
}

TreeNode* rightRotate(TreeNode* root) {
    TreeNode* newRoot = root->left;
    root->left = newRoot->right;
    newRoot->right = root;
    return newRoot;
}

void balanceTree(TreeNode** root) {
    // Step 1: Perform left rotations until the tree becomes a skewed right tree
    TreeNode* curr = *root;
    TreeNode* prev = nullptr;

    while (curr != nullptr) {
        TreeNode* leftChild = curr->left;
        if (leftChild != nullptr) {
            curr->left = leftChild->right;
            leftChild->right = curr;
            if (prev != nullptr) {
                prev->right = leftChild;
            } else {
                *root = leftChild;
            }
            prev = leftChild;
            curr = leftChild->left;
        } else {
            prev = curr;
            curr = curr->right;
        }
    }

    // Step 2: Perform right rotations to compress the skewed right tree into a balanced tree
    int n = 0;
    curr = *root;

    while (n + 1 < 0.5 * (n + 1) * (n + 2)) {
        curr = rightRotate(curr);
        n++;
    }
}

void insert(TreeNode** root, int value) {
    if (*root == nullptr) {
        *root = new TreeNode(value);
        return;
    }

    if (value < (*root)->data) {
        insert(&((*root)->left), value);
    } else {
        insert(&((*root)->right), value);
    }
}

int main() {
    TreeNode* root = nullptr;
    insert(&root, 7);
    insert(&root, 40);
    insert(&root, 63);
    insert(&root, 14);
    insert(&root, 22);
    insert(&root, 6);

    balanceTree(&root);

    std::cout << "Árvore após o balanceamento DSW:" << std::endl;
    printInorder(root);
    std::cout << std::endl;

    return 0;
}
