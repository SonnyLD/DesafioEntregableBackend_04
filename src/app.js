import express from 'express';
import {productsRouter} from './routers/products.router.js';
import {cartsRouter} from './routers/carts.router.js'
import {viewsRouter} from './routers/views.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');


app.use((req, res, next) => { //https://aaryanadil.com/pass-socket-io-to-express-routes-in-files/ Es la mejor opción?
    req.io = io;
    next();
});
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use("/", viewsRouter);

const PORT=process.env.PORT || 8080; 
const server = app.listen(PORT, () => {
console.log(`🚀 Server started on port http://localhost:${PORT}`)
});

server.on('error', (err) => console.log(err));

const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`Nueva conexion desde el id: ${socket.id}`);

    socket.on('disconnect', (socket) => {
        console.log(`Cierre de conexion`);
    })
})