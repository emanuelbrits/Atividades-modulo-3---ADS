#include <iostream>
#include <queue>
#include <vector>
using namespace std;

// Função para adicionar uma aresta ao grafo
void addEdge(vector<int> adj[], int u, int v) {
    adj[u].push_back(v);
}

// Função para realizar a busca em largura em um grafo
void breadthFirstSearch(vector<int> adj[], int startVertex, vector<bool>& visited, vector<int>& path) {
    queue<int> q;

    visited[startVertex] = true;
    q.push(startVertex);

    while (!q.empty()) {
        int currentVertex = q.front();
        q.pop();
        path.push_back(currentVertex);

        for (int adjacentVertex : adj[currentVertex]) {
            if (!visited[adjacentVertex]) {
                visited[adjacentVertex] = true;
                q.push(adjacentVertex);
            }
        }
    }
}

int main() {
    int numVertices = 7;
    vector<int> adj[numVertices];

    addEdge(adj, 0, 1);
    addEdge(adj, 0, 2);
    addEdge(adj, 1, 3);
    addEdge(adj, 1, 4);
    addEdge(adj, 2, 5);
    addEdge(adj, 2, 6);

    vector<bool> visited(numVertices, false);
    vector<int> path;

    breadthFirstSearch(adj, 0, visited, path);

    cout << "Caminho percorrido: ";
    for (int vertex : path) {
        cout << vertex << " ";
    }
    cout << endl;

    return 0;
}
