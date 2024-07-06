import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});

//route file
import routes from "./routes/userRoute.js";
app.use('/api',routes);


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
