function mailConfiguration() {
    return {
        defaults: { from: 'MO. <dev@mon3m.com>' },
        transport: {
            host: 'mon3m.com',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: 'dev@mon3m.com',
                pass: 'MOn3m@dev'
            },
            debug: true,
            logger: true
        }
    }
}


module.exports = mailConfiguration