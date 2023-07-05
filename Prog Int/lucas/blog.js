const { v4: uuidv4 } = require('uuid');
var express = require('express')

var app = express()

app.use(express.json());


class post {
    comentarios = []

    constructor(i, t) {
        this.id = i;
        this.text = t;
        this.likes = 0;
    }
}

class microblog {
    posts = [];

    create(post) {
        this.posts.push(post)
    }

    retrieve(idp) {
        for(let postt of this.posts) {
            if(postt.id == idp) {
                return postt
            }
        }
    }

    update(post) {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts[index] = post;
        }
    }

    delete(idp) {
        for(let i = 0; i < this.posts.length; i++) {
            if(this.posts[i].id == idp) {
                this.posts.splice(i, 1)
            }
        } 
    }

    retrieveAll() {
        return this.posts
    }
}

let p1 = new post(1, 'oi')
let p2 = new post(2, 'ola')
let p3 = new post(3, 'nico')
let p4 = new post(1, 'nico')
let mb = new microblog()

mb.create(p1)
mb.create(p2)
mb.create(p3)
mb.create(p4)

app.get('/posts', (request, response)=>{
    const posts = mb.retrieveAll()
    response.json(posts)
})

app.get('/posts/:id', (request, response)=>{
    const id = request.params.id;
    const post = mb.retrieve(id);

    if(post) {
        response.json(post);
    } else {
        response.status(404).json({ message: 'Post not found'});
    }
})

app.delete('/posts/:id', (request, response)=> {
    const id = request.params.id;
    const post = mb.retrieve(id);

    if(post) {
        mb.delete(id)
        response.json(post);
    } else {
        response.status(404).json({ message: 'Post not found'});
    }
})

app.post('/posts', (request, response)=> {
    let p4 = new post(uuidv4(), request.body.text)
    mb.create(p4)
    response.status(201).json(p4);
})

app.put('/posts/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const updatedPost = request.body;
    updatedPost.id = id;
    mb.update(updatedPost);
    response.json(updatedPost);
});

app.patch('/posts/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const updatedPost = request.body;
    updatedPost.id = id;
    mb.update(updatedPost);
    response.json(updatedPost);
});

app.patch('/posts/:id/like', (request, response) => {
    const id = parseInt(request.params.id);
    const updatedPost = mb.retrieve(id)
    updatedPost.id = id;
    updatedPost.likes++
    mb.update(updatedPost);
    response.json(updatedPost);
});

app.listen(3000, () => {
    console.log('Servidor rodando')
})