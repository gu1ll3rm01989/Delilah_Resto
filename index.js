let mysql = require('mysql')
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//CONEXION DATABASE

let db_conection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'delilah_db',
    user: 'root',
    password: ''


})
db_conection.connect(function(err) {
    if (!err)
        console.log('Conexion a DB ok')
    else {
        console.log(err)
    }
})

//SERVER UP

app.listen(3000, console.log('Server ok'))


//MIDELEWARES
function validarToken(req, res, next) {
    bearerHeader = req.headers.authorization
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(' ')
        let bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.status(403)
    }
}



function authentication(req, res, next) {

    bearerHeader = req.headers['authorization']
        //console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(' ')
        let bearerToken = bearer[1]
        req.token = bearerToken


        jwt.verify(req.token, 'secret', (err, data) => {
            console.log(data)

            if (err) {

                res.status(403)
            }
            if (req.method = 'POST' || 'PUT' || 'DELETE' || 'GET') {
                if (data.user.body.rol == 'admin') {
                    console.log('Login autorizado')
                    next()

                }
                if (data.user.body.rol == 'regular') {
                    res.status(403)
                    console.log('No autorizado')
                } else {
                    res.status(403)

                }



            }


        })
    } else {
        res.status(403)
    }
}





//ROUTES

app.post('/login', validarToken, (req, res) => {

    res.send('Bienvenido a Delilah')
})

app.get('/productos', (req, res) => {
    db_conection.query(
        'SELECT * FROM productos',
        (err, result) => {
            if (err) {
                throw (err)
            } else {
                res.send(result)
            }
        })

})

app.get('/productos/:id', (req, res) => {
    const id = req.params.id
    db_conection.query(
        'SELECT * FROM productos WHERE id=?', id,
        (err, result) => {
            if (err) {
                throw (err)
            } else {
                res.send(result)
            }
        })

})

app.put('/productos/:id', authentication, (req, res) => {
    const id = req.params.id
    const body = req.body


    db_conection.query('UPDATE productos SET ? WHERE id=?', [body, id], (err) => {
        if (err) {
            throw (err)
        } else {
            res.send(
                console.log('Actualizacion completada'))
        }
    })
})

app.post('/productos', authentication, (req, res) => {
    const id = req.params.id
    const body = req.body


    db_conection.query('INSERT INTO productos SET ?', [body, id], (err) => {
        if (err) {
            throw (err)
        } else {
            res.send(
                console.log('Creacion del producto completada'))
        }
    })

})



app.delete('/productos/:id', authentication, (req, res) => {
    const id = req.params.id

    db_conection.query('DELETE FROM productos WHERE id=?', [id], (err) => {
        if (err) {
            throw (err)
        } else {
            res.send(
                console.log('El producto ha sido borrado satisfactoriamente'))
        }
    })
})


//CREAR USUARIO 


app.post('/nuevoUsuario', (req, res) => {

    let body = req.body

    db_conection.query('INSERT INTO usuarios SET ?', body, (err) => {
        if (err) {
            throw (err)
        } else {
            res.send(
                console.log('El usuario se ha dado de alta correctamente')
            )
        }
    })

    const user = { body }
    const token = jwt.sign({ user }, 'secret')

    res.status(201, 'Token generado correctamente').json(token)
})

//CREAR Y EDITAR UN PEDIDO


app.post('/pedidos', (req, res) => {
    const body = req.body
    db_conection.query('INSERT INTO pedidos SET ?', body, (err) => {
        if (err) {
            throw (err)
        } else {
            res.send('Pedido dado de alta correctametne')
        }
    })
})


app.get('/pedidos', authentication, (req, res) => {
    db_conection.query('SELECT * FROM pedidos', (err, result) => {
        if (err) {
            throw (err)
        } else {
            res.send(result)


        }

    })

})


app.put('/pedidos/:id', authentication, (req, res) => {
    const body = req.body
    const id = req.params.id
    db_conection.query('UPDATE pedidos SET ? WHERE id=?', [body, id]), (err) => {
        if (err) {
            throw (err)
        } else {
            res.send(
                console.log('Actualizacion completada'))
        }
    }
})

app.delete('/pedidos/:id', authentication, (req, res) => {
    const id = req.params.id

    db_conection.query('DELETE FROM pedidos WHERE id=?', [id], (err) => {
        if (err) {
            throw (err)
        } else {
            res.send(
                console.log('El pedido ha sido borrado satisfactoriamente'))
        }
    })
})