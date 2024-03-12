exports.authenticateUser = async (req, res, next) => {
    try {
      const data = req.body;
      // Authenticate User here
      if(true){
        next();
      }else {
        res.status(401).json({"message": 'Unauthorized'});
      }
    } catch (error) {
      res.status(500).json({'status': "Not updated!"});
    }
  }