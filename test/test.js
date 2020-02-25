const  {runLoaders} = require("loader-runner");
const fs = require("fs")
const path = require("path")

runLoaders({
    resource: path.join(__dirname, './loaders/index.css'),
    loaders: [
        {
            loader: path.join(__dirname, '../src/index.js')
        }
    ],
    readResource: fs.readFile.bind(fs)
}, (err, result)=>{
    if(err){
        console.log(err)
    }
})