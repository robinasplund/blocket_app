const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const CreateRestRoutes = require('./CreateRestRoutes');

const LoginHandler=require('./LoginHandler.js');
const settings=require('./settings.json');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);

module.exports=class Server{
  constructor(){
    this.start();
  }
  async start(){
    console.log(await this.connectToDb());
    await this.startWebServer();
  }

  connectToDb(){
    return new Promise((resolve,reject)=>{
      let dbName='blocket'
      mongoose.connect(`mongodb://localhost/${dbName}`);
      global.passwordSalt=settings.passwordSalt;
      global.db=mongoose.connection;
      db.on('error',()=>reject('can NOT connect to db'));
      db.once('open',()=>resolve('connected to db'));
    });
  }

  startWebServer(){
    const app=express();
    app.use(bodyParser.json());
    //app.use(express.static('www'));

    app.use(session({
      secret: settings.cookieSecret,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: db
      })
    }));

    const models={
      articles:require('./article.js'),
      users:require('./user.js')
    };

    app.get('/json/users/:id',async(req,res)=>{
      let result=await models.users.findById(req.params.id).populate('articles','name category price purchases user').exec();
      res.setHeader('X-Robin', true);
      res.json(result);
    });

    //update user by id
    app.put('/json/users/:id', async (req,res) => {
      let result;
      try {
        let instance = await models.users.findById(req.params.id);
        //Object.assign(instance, req.body);
        instance.articles.push(req.body.article);
        result = await instance.save();
      }
      catch(error){
        result = {error: error + ''}
      }
      res.json(result);
    });

    //find article by name
    
    app.get('/json/articles/name/:searchname',async(req,res)=>{
      const regEx= new RegExp(req.params.searchname,"i");
      let result = await models.articles.find({name:regEx}).populate('user','firstName lastName phone email').exec();
      res.json(result);
    });
    
    //get article by id
    app.get('/json/articles/:id',async(req,res)=>{
      let result=await models.articles.findById(req.params.id).populate('user','firstName lastName phone email').exec();
      res.json(result);
    });

    // Get article by user
    app.get('/json/articles/articleuser/:input', async(req,res)=>{
      let result = await models.articles.find({user:req.params.input}).populate('user','firstName lastName').exec();
      res.json(result);
    });

    // Get article by category
    app.get('/json/articles/category/:input',async(req,res)=>{
      const regEx= new RegExp(req.params.input,"i");
      let result= await models.articles.find({category:regEx}).populate('user','firstName lastName phone email').exec();
      res.json(result);
    });





    new CreateRestRoutes(app,db,models);

    new LoginHandler(app,models.users);

    app.listen(3001,()=>console.log('listening on port 3001'));

  }

}

