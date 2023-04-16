const { expressjwt: jwt } = require("express-jwt");


function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
   
    const jwtMiddleware = jwt({
      secret,
      algorithms: ['HS256'],
      isRevoked: isRevoked,
      credentialsRequired: false,
    });
  
    return (req, res, next) => {
      const isRegisterRoute = req.path === `${api}/users/register` && req.method === 'POST';
  
      if (isRegisterRoute) {
        next();
      } else {
        jwtMiddleware(req, res, next);
      }
    };
  }
  
      


async function isRevoked(req, payload, done) {
    if (typeof done !== 'function') {
      console.error('done is not a function:', done);
      return;
    }
  
    if (!payload.isAdmin) {
        done(null, true);
    } else {
        done(null, false);
    }
}
  

 

module.exports = {
    authJwt: authJwt,
  };
