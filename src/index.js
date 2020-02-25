const fs = require("fs");
const path = require("path")
const Spritesmith = require("spritesmith");

module.exports = function(source){
    const callback = this.async();

    const images = source.match(/url\('(\S*)\?__sprite/g);
    const matchImages = images.map(it=>{
        const img = it.match(/url\('(\S*)\?__sprite/)[1];
        return path.join(__dirname, `../test/loaders/${img}`);
    });

    Spritesmith.run({
        src: matchImages
    }, (err, result)=>{
        if(err){
            throw new Error(err)
        }
        fs.writeFileSync(path.join(process.cwd(), 'test/loaders/dist/sprite.png'), result.image)

        source = source.replace(/url\('(\S*)\?__sprite/g, (match)=>{
            return `url('./sprite.png`;
        })

        fs.writeFileSync(path.join(process.cwd(), 'test/loaders/dist/index.css'), source)

        callback(null, source)
    })

    
}