const http=require('http');

const server=http.createServer((req,res)=>{
    console.log(req)
if(req.url=='/hello'){
    res.end("hello")
}else{
    res.end("not working");
}

})

server.listen(8000,()=>{
    console.log("server is started");
})