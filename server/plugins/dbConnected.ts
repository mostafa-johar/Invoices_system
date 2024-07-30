import mongoose from "mongoose"

export default defineNitroPlugin(async()=>{
    try{
      const connc = await mongoose.connect(useRuntimeConfig().mongoDBURl)
      if(connc){
        console.log(`db is connecting`)
      }
    }catch(err){
        console.log(`DataBase Error : ${err}`)
    }

})