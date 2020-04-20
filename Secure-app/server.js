//install and import express module
var exp=require("express");
var app=exp();

//global variable 
var uname;

//bcrypt
const bcrypt=require("bcrypt");

//path
var path = require('path');

//body-parser
var bodyParser=require("body-parser");

//jwt-webtoken
const jwt=require("jsonwebtoken");

app.use(bodyParser.json());

//check token

//connecting to front-end
app.use(exp.static(path.join(__dirname,'./dist/secure1-app')));

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname+ '/dist/secure1-app/index.html'))
})


//install and import mongodb
const ID = require('mongodb').ObjectID;
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
        dbo=client.db("secure1");
        sdbo=client.db("studentsrequestoutpassdetaills");
        adbo=client.db("secureadmin")
    }
});




function verifyToken(req,res,next){
    //console.log("verify token working")
    if(!req.headers.authorization)
    {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token == 'null')
    {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token , 'secretKey')
    if(!payload)
    {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;
    uname = payload.subject;
    //console.log("payload :",payload.subject)
    next()
}


















app.post("/loginuser",(req,res)=>{
    //console.log("Working login")
    dbo.collection("login").findOne({username:req.body.username},(err,uo)=>{
        if(err)
        {
            throw err;
        }
        else if(uo==null)
        {
            res.json({message:"Invalid username"});
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
                        res.json({message:"Invalid password"});
                    }
                    else
                    {
                        //res.json({message:"successfully logined"});
                        //create and send json web token


                        let payload = {subject: uo.username}
                        let token  = jwt.sign(payload, 'secretKey');
                        res.json({message:"logged in successfully",token:token});


                        /*jwt.sign({username:uo.username},'secret',{expiresIn:60},(err,swt)=>{
                            if(err)
                            {
                                throw err;
                            }
                            else
                            {
                                         console.log("signed token is",swt);
                            }
                        })*/
                    }
                }
            })
        }
    })
})


app.post("/requestoutpass",verifyToken,(req,res)=>{
    req.body.username = uname;
    dbo.collection("requestsoutpass").insertOne(req.body,(error,result)=>{
        if(error)
        {
            console.log("error during requestoutpass");
        }
        else{
            res.json({message:"successfully sent your request"});

        }

    })
})


app.post("/pass",verifyToken,(req,res)=>{
    req.body.username = uname;
    sdbo.collection(req.body.username).find().toArray((err, uo) =>{
        if(err)
            console.log("error during checking student collection")
        else if(uo.length == 0)
            {
                //creating student's collection
                sdbo.createCollection(req.body.username,(err,res)=>{
                    if(err)
                    {
                        console.log("Error during creating collection of user's dbcollection")
                    }
                    else{
                        console.log("dbcollection created for user")
                    }
                })
                //inserting request into student dbcollection
                sdbo.collection(req.body.username).insertOne(req.body,(error,result)=>{
                    if(error)
                    {
                        console.log("error during requestoutpass");
                    }
                    else{
                        res.json({message:"successfully inserted into user's database",requestid:result.insertedId});
                        //console.log(result._id);
                    }
            
                })

            }
        else
            {
                sdbo.collection(req.body.username).insertOne(req.body,(error,result)=>{
                    if(error)
                    {
                        console.log("error during requestoutpass");
                    }
                    else{
                        res.json({message:"successfully inserted into user's database",requestid:result.insertedId});
                        //console.log(result.insertedId,result["ops"][0]["_id"]);
                    }
            
                })
            }

    })
})


/*app.post("/pass2",(req,res)=>{
    var a = (req.body.username)

    console.log("working pass")
    console.log(req.body.username)

    //db.collectionNames(collName, function(err, names) {
     //   console.log('Exists: ', names.length > 0);
    //});

    //db.system.namespaces.find( { name: 'test.testCollection' } );
    sdbo.collection(a).find().toArray(function(err, res) {
        if(err)
            console.log("err")
        else if(res.length==0)
        {
            console.log("no data",res)
        }
        else
        {
            
            console.log("FOund",res)
        }
    })
})*/


app.post("/viewdata",verifyToken,(req,res)=>{

    //console.log("working inside viewdata :",uname)
    sdbo.collection(uname).find().toArray(function(err,result){
        if(err)
            console.log("err")
        else if(result.length == 0)
            res.json({message:"no data found"})
        else
        {
            res.json({message:"data found",result:result})
        }
    })
    uname = '';
    //console.log("uname :",uname)
})


app.post("/profile",verifyToken,(req,res)=>{
    //console.log("Working Profile :",uname)
    dbo.collection("login").find({username:uname}).toArray(function(err,result){
        if(err)
            console.log("error during profile check")
        else if(result.length == 0)
            res.json("no data found")
        else
            delete (result[0].password)
            //delete (result[0]._id)
            res.json({message:"data found",result:result})
    })
    uname = '';
    //console.log("uname",uname)
})



app.post("/profilereqbyadmin",verifyToken,(req,res)=>{
    //console.log("Working Profile :",uname)
    dbo.collection("login").find({username:req.body.username}).toArray(function(err,result){
        if(err)
            console.log("error during profile check")
        else if(result.length == 0)
            res.json("no data found")
        else
            delete (result[0].password)
            //delete (result[0]._id)
            res.json({message:"data found",result:result})
    })
    uname = '';
    //console.log("uname",uname)
})



app.post("/adminlogin",(req,res)=>{
    adbo.collection("admin").findOne({username:req.body.username},(err,uo)=>{
        if(err)
        {
            console.log("error during adminlogin");
        }
        else
        {
            if(uo!=null)
            {
                //console.log("working");
                //create and send json web token
                bcrypt.compare(req.body.password,uo.password,(err,result)=>{
                    
                    if(err)
                    {
                        console.log("error2 during adminlogin");
                    }
                    else
                    {
                        if(result==false)
                        {
                            res.json({message:"Invalid password"});
                        }
                        else
                        {
                            //res.json({message:"successfully logged in"});
                            //create and send json web token
                            let payload = { subject: uo.username}
                            let token  = jwt.sign(payload, 'secretKey');
                            res.json({message:"Welcome Admin",admintoken:token});

                            
                            /*jwt.sign({username:uo.username},'secret',{expiresIn:60},(err,swt)=>{
                                if(err)
                                {
                                    console.log("error3 during adminlogin");
                                }
                                else
                                {
                                             console.log("signed admintoken is",swt);
                                             res.json({message:"Welcome Admin",admintoken:swt});
                                }
                            })*/
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




app.post("/viewrequestpass",verifyToken,(request,response)=>{
    console.log("working")
    dbo.collection("requestsoutpass").find({}).toArray(function(error,dataArray)
    {
        if(error)
        {
            request.send("error",error);
        }
        else
        {
            if(dataArray.length==0)
                response.json({result:dataArray});
            else
                response.json({result:dataArray});
        }
    }
        
            
       )
})



//accept the request

app.put("/acceptstatus",verifyToken,(req,res)=>{
    sdbo.collection(req.body.name).find({"_id":ID(req.body.id)}).toArray((err,dataArray)=>{
        if(err)
            console.log(err)
        else if(dataArray.length==0)
            console.log("no data found")
        else
            sdbo.collection(req.body.name).update(
                {"_id":ID(req.body.id)},
                {
                    $set:
                    {status:"Accepted"}
                }
                
            ,(err,success)=>{
                if(err)
                    console.log("error during update to accept")
                else
                    console.log("updated successfully")
            })
            dbo.collection("requestsoutpass").deleteOne({id:req.body.id},(err,result)=>{
                if(err)
                    console.log("error")
                else
                    console.log("deleted successfully")
            })

    })

})


//reject the request

app.put("/rejectstatus",verifyToken,(req,res)=>{
    sdbo.collection(req.body.name).find({"_id":ID(req.body.id)}).toArray((err,dataArray)=>{
        if(err)
            console.log(err)
        else if(dataArray.length==0)
            console.log("no data found")
        else
            sdbo.collection(req.body.name).update(
                {"_id":ID(req.body.id)},
                {
                    $set:
                    {status:"Rejected"}
                }
                
            ,(err,success)=>{
                if(err)
                    console.log("error during update to accept")
                else
                    console.log("updated successfully")
            })
            dbo.collection("requestsoutpass").deleteOne({id:req.body.id},(err,result)=>{
                if(err)
                    console.log("error")
                else
                    console.log("deleted successfully")
            })

    })
    
})



//update password
app.post("/updatepassword",verifyToken,(req,res)=>{
    req.body.username = uname;
    dbo.collection("login").findOne({username:req.body.username},(err,result)=>{
        if(err)
            console.log("error0 during password update")
        else if(result == null)
            console.log("no data present")
        else
        {
            //console.log(result.password)
                          //tocompare normal and encrypted password
                          bcrypt.compare(req.body.currentpassword,result.password,(error,success)=>{
                    
                            if(error)
                            {
                                throw error;
                            }
                            else
                            {
                                if(success==false)
                                {
                                    //consol.log("password not matched")
                                    res.json({message:"current password is incorrect"});
                                }
                                else
                                {
                                    bcrypt.hash(req.body.newpassword,8,(err,hashedpassword)=>{
                                        if(err)
                                            console.log("error1 during password update")
                                        else
                                        {
                                            req.body.newpassword=hashedpassword;
                                            dbo.collection("login").update(
                                            {username:req.body.username},
                                            {$set:
                                                {
                                                    password:req.body.newpassword
                                                }
                                            }
                                            ,(err,success)=>{
                                                if(err)
                                                    console.log("error2 during password update")
                                                else
                                                    console.log("password updated successfully")
                                                    res.json({message:"Your Password has been changed successfully!"})
                                            })
                                        }
                                        
                        
                                    })
                                }
                            }
                        })

            //bcrypt password

            
        }
    })
})






//assign port number
app.listen(process.env.PORT || 3000,()=>console.log("server running on 3000...."));