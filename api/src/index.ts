import express, {json, urlencoded} from "express";
import productsRoutes from "./routes/product/index";

const port = 3000;
const app = express();

app.use(urlencoded({extended: false}));
app.use(json());

app.get("/", (req, res) => {
    res.send("Hello, backend!");
})

app.use("/products", productsRoutes);


app.listen(port, () => {
    console.log("Server is running on port", port);
})