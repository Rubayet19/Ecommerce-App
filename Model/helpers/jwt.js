const { expressjwt: jwt } = require("express-jwt");


function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    const paths = [
        { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'], roles: ['admin'] },
        { url: `${api}/users/login`, methods: ['POST'] },
        { url: `${api}/users/register`, methods: ['POST'] },
        { url: `${api}/users`, methods: ['GET'], roles: ['admin'] },
        { url: `${api}/users/get/count`, methods: ['GET'], roles: ['admin'] },
    ];

    const jwtMiddleware = jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    });

    return jwtMiddleware.unless({
        custom: (req) => {
            const pathCheck = paths.find(path => {
                if (typeof path.url === 'string') {
                    return path.url === req.path && path.methods.includes(req.method);
                } else {
                    return path.url.test(req.path) && path.methods.includes(req.method);
                }
            });

            if (!pathCheck) return false;
            if (!pathCheck.roles) return true;

            const userRole = req.user && req.user.isAdmin ? 'admin' : 'user';
            return pathCheck.roles.includes(userRole);
        }
    });
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
