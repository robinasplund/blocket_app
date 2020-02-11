module.exports=class CreateRestRoutes{

  constructor(app,db,models){
    this.app=app;
    this.db=db;
    for(let key in models){
      this.createRoutes(key,models[key]);
    }
  }

  createRoutes(baseRoute,Model){
    baseRoute='/json/'+baseRoute+'/';

    this.app.post(baseRoute,async(req,res)=>{
      let err;
      let instance=new Model(req.body);
      let result=await instance.save().catch(error=>err=error)
      res.json(err||result);
    });

    this.app.get(baseRoute,async(req,res)=>{
      res.json(await Model.find());
    });

    // Get article by id
    /*this.app.get(baseRoute+':id',async(req,res)=>{
      let err;
      let result=await Model.findById(req.params.id).catch(
        error=>err=error
      );
      res.json(err||result);
    });*/
    this.app.get(baseRoute+':id',async(req,res)=>{
      let result=await Model.findById(req.params.id);
      res.json(result);
    });
 
    //Delete article by id
    this.app.delete(baseRoute+':id',async(req,res)=>{
      let err;
      let result=await Model.findByIdAndRemove(req.params.id).catch(
        error=>err=error
      );
      res.json(err||result);
    });

     //Find by name
     this.app.get(baseRoute+'name/:searchname',async(req,res)=>{
      const regEx= new RegExp(req.params.searchname,"i");
      let result = await Model.find({name:regEx}).catch((err)=>{
        res.json({error:err});
      });
      res.json(result);
    });

    //Find by Category
    this.app.get(baseRoute+'category/:input',async(req,res)=>{
      const regEx= new RegExp(req.params.input,"i");
      let result= await Model.find({category:regEx}).catch((err)=>{
        res.json({error:err});
      });
      res.json(result);
    });

    // Find most purchases
    this.app.get(baseRoute+'purchases/toplist',async(req,res)=>{
     let err;
      let result= await Model.find().sort({purchases:-1}).limit(6).catch((err)=>{
        res.json({error:err});
      });
      res.json(err||result); 
     // let result =await Model.find();
     // res.json(result);
    });

    // Find model by user
    this.app.get(baseRoute+'articleuser/:input', async(req,res)=>{
      let err;
      let result = await Model.find({user:req.params.input}).catch((err)=>{
        res.json({error:err});
      });
      res.json(result);
    });

    //Update whatever by id
    this.app.put(baseRoute + ':id', async (req,res) => {
      let result;
      try {
        let instance = await Model.findById(req.params.id);
        Object.assign(instance, req.body);
    
        result = await instance.save();
      }
      catch(error){
        result = {error: error + ''}
      }
      res.json(result);
    });

  }

}

