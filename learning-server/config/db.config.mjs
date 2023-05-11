import mongoose from "mongoose"

export async function connectDB() {
    const uri = `mongodb+srv://isuruakalanka071:pMIlV5ojDlO69tMx@learning.1yo64vy.mongodb.net/train_dev?retryWrites=true&w=majority`
    mongoose.set("strictQuery", true);
   
    try {
        await mongoose.connect(uri)
        console.log("MongoDB Connected")
    } catch (err) {
        console.log(`Atlas Server Connection Error ${err}`)
    } 
};



// async function listDatabases(client) {
//    const dbList =  await client.db().admin().listDatabases()
//    dbList.databases.forEach( db => {
//      console.log(`${db.name}`)
//    })
//    console.log()
// }
// connectDB().catch(console.error)