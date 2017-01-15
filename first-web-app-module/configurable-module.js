module.exports = (config)=> {
    return {
        log: (msg)=>{
            console.log(config.prefix + msg);
        }
    }
};