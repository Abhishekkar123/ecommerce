const fs=require('fs');
// console.log(fs);
console.log("current start")

// const constant=fs.readFileSync("input.txt")
//async way

// fs.readFile("input.txt",(err,con)=>{
//     if(err){
//         console.log("err")
//     }else{
//         console.log("output"+con)
//     }
// })
// // console.log("output"+constant)
// console.log("current end")

// fs.writeFileSync('output1.txt',"hello student")

fs.writeFile("output2.txt","hello student again!",err=>{
    if(err){
        console.log(err);
    }else{
        console.log("wriitten successful")
    }
})

console.log("current start")