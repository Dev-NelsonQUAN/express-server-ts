import express, { Application, Request, Response} from "express";

const app: Application = express();
const port = 4050;

app.get('/', (req: Request, res: Response) => {
    // res.send("This is an express server")
    res.status(200).send("This is an express server")
})

app.listen(port, () => {
    console.log(`Server is listening to http://localhost:${port}`)
})
