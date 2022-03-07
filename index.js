const express = require("express");

const app = express();

app.use(logger);

app.get("/books", (req,res) => {

    return res.send({route:"/books"});
});

app.get("/libraries", (req,res) => {

    return res.send({route : "/libraries" , permission : true});
});

app.get("/authors" , (req,res) => {

    return res.send({route : "?authors" , permission : true});
});


app.get("/libraries", checkPermission("/libraries"), (req,res) => {

    return res.send({permission : true});
});

app.get("/authors" , checkPermission("/authors"),(req,res) => {

    return res.send({permission : true});
});

function logger(req,res,next)
{
    if(req.path === "/books")
    {
        console.log("/books");
    }
    else if(req.path === "/libraries")
    {
        console.log("/libraries");
    }
    else if(req.path === "/authors")
    {
        console.log("/authors");
    }
    next();
}

function checkPermission(role)
{
    return function logger(req,res,next)
    {
        if(role == "/libraries")
        {
            return next();
        }
        else if (role == "/authors")
        {
            return next();
        }
        else{
            return res.send("No data");
        }
    }
}

app.listen(6002, () => {

    console.log("Listening to port 6002");
})