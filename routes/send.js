function send(fastify, opts, done) {

  //search how to make response from this because it doesn't
    fastify.post('/send', (req, reply)=> {
        const { mailer } = fastify
    
      mailer.sendMail({
        to: 'dev@mon3m.com',
        subject: `contact form From: ${req.body.name} `,
        text: `Email: ${req.body.email},
              Message: ${req.body.message}`
      }, (errors, info) => {
        if (errors) {
          fastify.log.error(errors)
          
          reply.status(500)
          return {
            status: 'error',
            message: 'Something went wrong'
          }
        }
    
        console.log('mon3m info:>',info)
        // reply.status(200)
        reply
          .code(200)
          .send({
              status: 'ok',
              message: 'Email successfully sent',
             })
        // return {
        //   status: 'ok',
        //   message: 'Email successfully sent',
        //     // info: {
        //     //   from: info.from, // John Doe <john.doe@example.tld>
        //     //   to: info.to, // ['someone@example.tld']
        //     // }
        // }
      })
    })
      done();
}

module.exports = send