//install and import express module
var exp=require("express");
var app=exp();
var path = require('path');
//import body parser module
//this will be used t/o extract data from
//req object when it recieves a POST req
var bodyParser=require("body-parser");
const bcrypt=require("bcrypt");
//jsonweb token
const jwt=require("jsonwebtoken");

const ct=require("./checktoken");

//check token middleware


app.use(bodyParser.json());

app.use(exp.static(path.join(__dirname,'./dist/myNewApp')));




app.get('*',(req,res)=> res.sendFile(path.join(__dirname,'./dist/myNewApp/index.html')));

//install and import mongodb

var mc=require("mongodb").MongoClient;
var url="mongodb+srv://akhilcruise:akhilcruise@cluster0-7p2th.mongodb.net/test?retryWrites=true&w=majority";
//connect with DB server
var dbo;
mc.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error)
    {
        console.log("error during db connection",error);
    }
    else{
        console.log("connected to db...");
        dbo=client.db("cartdb");
        ob=client.db("vnrdb");
        ad=client.db("Admindb")
    }
});

//request handlers
//GET req handler




app.get('/orderrequests',(request,response)=>{
    dbo.collection("cartdbcollection").find({}).toArray(
        (error,dataArray)=>
        {
            if(error)
             {
                 console.log("error in data reading",error);
            }
            else
            {
                if(dataArray.length==0)
                {
                    response.send({message:"no data found"});
                }
                else
                {
                    response.send(dataArray);
                }
            }
        }
    )
  
});

    

app.post("/login",(req,res)=>{
        ob.collection("vnrdbcollection").findOne({email:req.body.username},(err,uo)=>{
            if(err)
            {
                throw err;
            }
            else if(uo==null)
            {
                res.json({message:"invalid user name"});
            }
            else
            {
              //tocompare normal and encrypted password
                bcrypt.compare(req.body.password,uo.password,(err,result)=>{
                    
                    if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        if(result==false)
                        {
                            res.json({message:"invalid password"});
                        }
                        else
                        {
                            //res.json({message:"successfully logined"});
                            //create and send json web token
                            jwt.sign({username:uo.username},'secret',{expiresIn:60},(err,swt)=>{
                                if(err)
                                {
                                    throw err;
                                }
                                else
                                {
                                             console.log("signed token is",swt);
                                             res.json({message:"logged in successfully",token:swt});
                                }
                            })
                        }
                    }
                })
            }
        })
    })
    
  




app.post("/adminlogin",(req,res)=>{
    ad.collection("AdminUser").findOne({email:req.body.username},(err,uo)=>{
        if(err)
        {
            throw err;
        }
        else
        {
            if(uo!=null)
            {
                console.log("working");
                //create and send json web token
                bcrypt.compare(req.body.password,uo.password,(err,result)=>{
                    
                    if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        if(result==false)
                        {
                            res.json({message:"invalid password"});
                        }
                        else
                        {
                            //res.json({message:"successfully logged in"});
                            //create and send json web token
                            jwt.sign({username:uo.username},'secret',{expiresIn:60},(err,swt)=>{
                                if(err)
                                {
                                    throw err;
                                }
                                else
                                {
                                             console.log("signed admintoken is",swt);
                                             res.json({message:"Welcome Admin",admintoken:swt});
                                }
                            })
                        }
                    }
                })
            
            }
            else
            {
                res.json({message:"Not Admin"})
            }
        }
    })
})


app.post('/register',(req,res)=>{
    console.log("data received",req.body);

    var stob=req.body;
    ob.collection("vnrdbcollection").findOne({email:stob.email},(err,oso)=>{
        if(err)
        {
            console.log("error");
        }
        else if(oso!=null)
        {
            res.json({message:'email already exists'});
        }
        else ob.collection("vnrdbcollection").findOne({name:stob.name},(err,oso)=>{
            if(err)
            {
                console.log("error");
            }
            else if(oso!=null)
            {
                res.json({message:'name already exists'});
            }
            else ob.collection("vnrdbcollection").findOne({phnno:stob.phnno},(err,oso)=>{
                if(err)
                {
                    console.log("error");
                }
                else if(oso!=null)
                {
                    res.json({message:'Number already exists'});
                }
                                else{
                                    //hash the password
                                    console.log("workig",req.body.password)
                                    bcrypt.hash(req.body.password,8,(err,hashedpassword)=>{
                                        if(err)
                                        throw err;
                                        else
                                        req.body.password=hashedpassword;
                                        ob.collection("vnrdbcollection").insertOne(stob,(error,result)=>{
                                            
                                            if(err)
                                            {
                                                console.log("err");
                                            }
                                            else{
                                                res.json({message:"successfully registered"});
                                            }
                                        })

                                    })
                                    
                                }
                })
        })



    })
  
});


app.post('/profile',(req,res)=>{
    
    ob.collection("vnrdbcollection").findOne({email:req.body.username},(err,result)=>{
        if(err)
        {
            console.log("error");
        }
        else
        {
            if(result==null)
            {
                console.log("no data found");
            }
            else
            {
                delete result.password;
                console.log(result)
                res.send(result)

            }
            

        }
    })
})


app.post('/order',(req,res)=>{
    var ord = req.body;
    console.log(ord)
    dbo.collection("cartdbcollection").insertOne(ord,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.json({message:"successfully inserted"})
        }
    })
})


/*

app.post('/write',(request,response)=>{
    console.log("data received",request.body);
    dbo.collection("cartdbcollection").find({name:request.body.name}).toArray(
        (error,dataArray)=>{
            if(error)
            {
                console.log("error during posting data in to cartdb"+error)
            }
            else
            {
                if(dataArray.length == 0)
                {
                    console.log("akhil")
                    dbo.collection("cartdbcollection").insertOne(request.body,(error,response)=>{
                        if(error)
                        {
                            console.log("error during data inserting"+error);
                        }
                        else
                        {
                            console.log("data-inserted successfully")
                        }
                    })
                }
                else
                {
                    response.send("incrementing count of exixsting data");
                    dbo.collection("cartdbcollection").updateOne({name:request.body.name},{ $set:{count:request.body.count}},{ upsert: true },(error,response)=>{
                        if(error)
                        {
                            console.log("error during update"+error)
                        }
                        else
                        {
                            console.log("updated successfully");
                        }
                    })
                }
            }
        }
    )


})

*/



//assign port number
app.listen(process.env.PORT || 3000,()=>console.log("server running on 3000...."));