const express = require('express')
const app = express()
const { Pool } = require('pg');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: 'postgres',
    port: '5432',
});

let ra = []
let conteudo = ``

function retrieveAll() { 
    pool.query('SELECT * FROM post', (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
    } else {
        for (let i = 0; i < result.rows.length; i++) {
            ra.push(result.rows[i])
        }
    }
    })
};

retrieveAll()

//mostrar todos
app.get('/posts', (req, res) => {
    res.send(ra)
})

//mostrar pelo id
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    let raid = [];
  
    pool.query(`SELECT * FROM post WHERE id_post = ${postId}`, (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        raid.push(result.rows);
        res.send(raid);
      }
    });
});

//deletar pelo id
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
  
    pool.query(`delete FROM post WHERE id_post = ${postId}`, (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else if (result.rowCount === 0) {
        res.sendStatus(404);
      } else {
        res.send('Conteúdo excluído');
      }
    });
});

//adicionar post
app.post('/posts', (req, res) => {

    const txt = 'Test add'
  
    pool.query(`INSERT INTO POST VALUES (DEFAULT, '${txt}', 0)`, (err) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.status(201).send('Post adicionado');
      }
    });
});

//atualizar post
app.post('/posts/:id', (req, res) => {

    const postId = parseInt(req.params.id);

    const txt = 'Test update'
  
    pool.query(`update post set texto = '${txt}' where id_post = ${postId}`, (err) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.status(200).send('Post atualizado');
      }
    });
});

//alterar likes
app.patch('/posts/:id', (req, res) => {

    const postId = parseInt(req.params.id);

    const op = 'likes'

    const quant = '3'
  
    pool.query(`update post set ${op} = '${quant}' where id_post = ${postId}`, (err) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.status(200).send('Post atualizado');
      }
    });
});

//dar like
app.patch('/posts/:id/like', (req, res) => {

    const postId = parseInt(req.params.id);
  
    pool.query(`update post set likes = likes + 1 where id_post = ${postId}`, (err) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.status(200).send('Post atualizado');
      }
    });
});

//comentarios

//criar comentario usando id do post
app.post('/comments/:id', (req, res) => {

    const com = 'uau'

    const postId = parseInt(req.params.id);
  
    pool.query(`INSERT INTO comentario VALUES (DEFAULT, '${com}', ${postId})`, (err) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.status(201).send('Comentário adicionado');
      }
    });
});

//deletar comentario pelo id
app.delete('/comments/:id', (req, res) => {
    const postId = parseInt(req.params.id);
  
    pool.query(`delete FROM comentario WHERE id_coment = ${postId}`, (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else if (result.rowCount === 0) {
        res.sendStatus(404);
      } else {
        res.send('Conteúdo excluído');
      }
    });
});

//atualizar comentario
app.post('/updatecomments/:id', (req, res) => {

    const postId = parseInt(req.params.id);

    const txt = 'legal'
  
    pool.query(`update comentario set texto = '${txt}' where id_coment = ${postId}`, (err) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        res.status(200).send('Comentário atualizado');
      }
    });
});

//mostrar comentarios do post pelo id
app.get('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    let comid = [];
  
    pool.query(`select texto from comentario where id_post = ${postId}`, (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).send('Erro ao executar a consulta');
      } else {
        comid.push(result.rows);
        res.send(comid);
      }
    });
});

const port = 3000

app.listen(port, () => {
    console.log(`Aplicação escutando na porta ${port}`)
})