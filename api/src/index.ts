import express, {json, urlencoded} from "express";
import productsRoutes from "./routes/product/index.js";
import authRoutes from "./routes/auth/index.js";
import serverless from "serverless-http";

const port = 3000;
const app = express();

app.use(urlencoded({extended: false}));
app.use(json());

app.get("/", (req, res) => {
    res.send("Hello, backend!");
})
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "dev") {
    app.listen(port, () => {
        console.log("Server is running on port", port);
    })
}

app.listen(port, () => {
    console.log("Server is running on port", port);
})

export const handler = serverless(app);



// app.get("/products", (req, res) => {
//     console.log(req);
//     res.send("allproducts display here");
// })
// app.post("/products", (req, res) => {
//     res.send("post product");
// })
// app.get("/products/:id", (req, res) => {
//     res.send("get product");
// })
// app.put("/products/:id", (req, res) => {
//     res.send("put product");
// })
// router.delete("/:id", (req, res) => {
//     res.send("delete product");
// })