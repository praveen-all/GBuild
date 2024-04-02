const jwt=require('jsonwebtoken');
const admin=require('./../firebase')
const userCollection = admin.firestore().collection('users'); // Access users collection
const secret = "your_secret_key";


const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    //   console.log(token);
      // decode the toke i will get user id
      const decodeid = await jwt.verify(token, secret);
    //    console.log(decodeid);
      req.user = (await userCollection.doc(decodeid.userId).get()).data();
      req.userId=decodeid.userId;
    //   console.log(req);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
};


module.exports = { protect };