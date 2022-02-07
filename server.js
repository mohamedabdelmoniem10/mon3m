const fastify = require('fastify')({ logger: true })
const path = require('path');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  dir: 'index.html',
  prefix: '/public/', // optional: default '/'
  list: true,
})

fastify.register(require('fastify-cors'), function (instance) {

    return (req, callback) => {
      let corsOptions;
    //   const origin = req.headers.origin
      // do not include CORS headers for requests from localhost
    //   if (/localhost/.test(origin)) {
    //     corsOptions = { origin: false }
    //   } else {
        corsOptions = { origin: true }
    //   }
      callback(null, corsOptions) // callback expects two parameters: error and options
    }
  })

fastify.register(require('fastify-formbody'))

fastify.post('/api/auth', (req, reply)=> {
  // request //form data ,multible , json
  // response // json images
    const {
        body
      } = req;
    console.log('this is port', body)
    reply.send(req.body);
})

fastify.get('/', (req, reply)=> {
  return reply.sendFile('index.html');
})

fastify.register(require('fastify-mailer'), require('./config/mail.js'))

fastify.register(require('./routes/send'))


const PORT = process.env.PORT || 3000
// Run the server!
fastify.listen(PORT, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})