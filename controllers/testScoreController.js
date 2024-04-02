const admin = require("../firebase");

const testCollection = admin.firestore().collection("testScore"); // Access users 

const addTheTest=async(req,res)=>{
  const body=req.body;
    try {
        const add=await testCollection.add(body);
    
        res.status(200).json({
          status: "success",
          data: add,
        });
        
    } catch (error) {
         res.status(400).json({
            status:"error",
            message:error.message
         });
    }
}

const getSemTest=async(req,res)=>{
    const {sem}=req.body;

     if(!sem){
       return res.status(401).json({
            status:"fails",
            message:"please provide the sem & user"
        })
     }
    try {
        const getallTest=await testCollection.where('userId','==',req.userId).where('sem','==',sem).get();
            const documents = getallTest.docs.map((doc) => doc.data());
           
        res.status(200).json({
          status: "success",
          data: documents,
        });
    } catch (error) {
        res.status(400).json({
            status:"error",
            message:error.message
        })
    }
}


module.exports = { getSemTest, addTheTest };
