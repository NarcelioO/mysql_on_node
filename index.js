const express = require ("express")
const handlebars = require ("express-handlebars")
const app = express()
const Post = require('./models/Post')



//template engine
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//rotas
app.get('/', function(req, res){
    Post.findAll({order:[['id','DESC']]}).then(function(posts){
        res.render('home', {posts:posts})
        
    })
  
})
app.get('/cad', function(req, res){
    res.render('form')
})

app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo :req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("erro" + erro)
    })
  
})

app.get('/delete/:id', function(req, res){
    Post.destroy({where:{'id':req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso")
    }).catch(function(erro){
        res.send("esse post nao existe")
    })
})
app.put('/post/:id', function (req, res, next) {
    Post.update(
      {titulo: req.body.titulo},
      {returning: true, where: {'id': req.params.id} }
    )
    .then(function([ rowsUpdate, [updatedBook] ]) {
      res.json(updatedBook)
    })
    .catch(next)
   })

app.listen(8081,()=>{console.log("server running na url http://localhost:8081/ ")})




 


