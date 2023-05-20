const { response } = require('express')
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Post {

  id: number;
  text: string;
  likes: number;

  constructor(id: number, text: string, likes: number) {
    this.id = id;
    this.text = text;
    this.likes = likes;
  }
}

class Microblog {

  posts: {};
  IdAtual: number;

  constructor() {
    this.posts = {};
    this.IdAtual = 1;
  }

  create(post) {
    post.id = this.IdAtual++;
    this.posts[post.id] = post;
    return post;
  }

  retrieveAll() {
    return Object.values(this.posts);
  }

  retrieve(id) {
    return this.posts[id];
  }

  update(post) {
    if (this.posts.hasOwnProperty(post.id)) {
      this.posts[post.id] = post;
      return post;
    }
    return null;
  }

  delete(id) {
    if (this.posts.hasOwnProperty(id)) {
      delete this.posts[id];
      return true;
    }
    return false;
  }

  incrementLikes(id) {
    if (this.posts.hasOwnProperty(id)) {
      this.posts[id].likes++;
      return true;
    }
    return false;
  }
}

const microblog = new Microblog();
const post1 = new Post(1, 'olá, Bom dia!', 10);
const post2 = new Post(2, 'olá, Boa noite!', 3);
microblog.create(post1);
microblog.create(post2);

app.get('/posts', (req, res) => {
  const posts = microblog.retrieveAll();
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = microblog.retrieve(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = microblog.delete(id);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

app.post('/posts', (req, res) => {
  const { text } = req.body;
  const post = new Post(null, text, 0);
  const createdPost = microblog.create(post);
  res.status(201).json(createdPost);
});

app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, likes } = req.body;
  const post = new Post(id, text, likes);
  const updated = microblog.update(post);
  if (updated) {
    res.status(200).json(updated);
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, likes } = req.body;
  const existingPost = microblog.retrieve(id);
  if (existingPost) {
    const post = new Post(id, text || existingPost.text, likes || existingPost.likes);
    const updated = microblog.update(post);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(500).json({ error: 'Erro ao atuaçizar post' });
    }
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

app.patch('/posts/:id/like', (req, res) => {
  const id = parseInt(req.params.id);
  const liked = microblog.incrementLikes(id);
  if (liked) {
    res.status(200).send();
  } else {
    res.status(404).json({ error: 'Post não encontrado' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
