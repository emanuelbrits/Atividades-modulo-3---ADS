var response = require('express').response;
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var Post = /** @class */ (function () {
    function Post(id, text, likes) {
        this.id = id;
        this.text = text;
        this.likes = likes;
    }
    return Post;
}());
var Microblog = /** @class */ (function () {
    function Microblog() {
        this.posts = {};
        this.IdAtual = 1;
    }
    Microblog.prototype.create = function (post) {
        post.id = this.IdAtual++;
        this.posts[post.id] = post;
        return post;
    };
    Microblog.prototype.retrieveAll = function () {
        return Object.values(this.posts);
    };
    Microblog.prototype.retrieve = function (id) {
        return this.posts[id];
    };
    Microblog.prototype.update = function (post) {
        if (this.posts.hasOwnProperty(post.id)) {
            this.posts[post.id] = post;
            return post;
        }
        return null;
    };
    Microblog.prototype.delete = function (id) {
        if (this.posts.hasOwnProperty(id)) {
            delete this.posts[id];
            return true;
        }
        return false;
    };
    Microblog.prototype.incrementLikes = function (id) {
        if (this.posts.hasOwnProperty(id)) {
            this.posts[id].likes++;
            return true;
        }
        return false;
    };
    return Microblog;
}());
var microblog = new Microblog();
var post1 = new Post(1, 'olá, Bom dia!', 10);
var post2 = new Post(2, 'olá, Boa noite!', 3);
microblog.create(post1);
microblog.create(post2);
app.get('/posts', function (req, res) {
    var posts = microblog.retrieveAll();
    res.json(posts);
});
app.get('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var post = microblog.retrieve(id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ error: 'Post não encontrado' });
    }
});
app.delete('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var deleted = microblog.delete(id);
    if (deleted) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ error: 'Post não encontrado' });
    }
});
app.post('/posts', function (req, res) {
    var text = req.body.text;
    var post = new Post(null, text, 0);
    var createdPost = microblog.create(post);
    res.status(201).json(createdPost);
});
app.put('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, text = _a.text, likes = _a.likes;
    var post = new Post(id, text, likes);
    var updated = microblog.update(post);
    if (updated) {
        res.status(200).json(updated);
    }
    else {
        res.status(404).json({ error: 'Post não encontrado' });
    }
});
app.patch('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, text = _a.text, likes = _a.likes;
    var existingPost = microblog.retrieve(id);
    if (existingPost) {
        var post = new Post(id, text || existingPost.text, likes || existingPost.likes);
        var updated = microblog.update(post);
        if (updated) {
            res.status(200).json(updated);
        }
        else {
            res.status(500).json({ error: 'Erro ao atuaçizar post' });
        }
    }
    else {
        res.status(404).json({ error: 'Post não encontrado' });
    }
});
app.patch('/posts/:id/like', function (req, res) {
    var id = parseInt(req.params.id);
    var liked = microblog.incrementLikes(id);
    if (liked) {
        res.status(200).send();
    }
    else {
        res.status(404).json({ error: 'Post não encontrado' });
    }
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
