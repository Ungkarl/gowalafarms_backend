import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  
  const tokenHeader = req.headers['authorization'];
 
  if (!tokenHeader) {
    
    return res.json({'message' : 'Ingen adgang uden token'});

  }
  try {

    const token = tokenHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 

  } catch (err) {

    console.log('Error', err);
    return res.json({'message' : 'Ikke en valid Token'});

  }

  return next();

}

export default auth;