import express from "express";
import { resolve } from "path";
import handlebars from "express-handlebars";
import productRouter from "./routes/productRouter.js";
import CartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import { Server } from "socket.io";
import ProductManager from "./controllers/productManager.js";

const pm = new ProductManager();
const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () =>
  console.log(`Listening on localhost:${PORT}`)
);
const viewsPath = resolve("./src/views");

app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`,
  })
);
const socketServer = new Server(httpServer);

app.set("views", viewsPath);
app.set("view engine", "handlebars");
app.use(express.static(viewsPath + "/src/public"));

//MIDDLEWARE REQ.QUERY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", CartRouter);

app.use("/", viewsRouter);

//CONFIGURACION DE PUERTO
// app.listen(8080, () => {
//   console.log("Server listening on port 8080");
// });

async function traer(data){
  await pm.addProduct(data);
}

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("cambios", (data) => {
    console.log(data);

    traer(data);

    socket.broadcast.emit("cambios", data);
  });
});
