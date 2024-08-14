const test = (req, res, next) => {
  
  console.log('Testing Request', req)

  return next();

}

export default test;