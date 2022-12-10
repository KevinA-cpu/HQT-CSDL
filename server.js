import Express from "express";
import cors from "cors";
import dirtyRead from "./src/dirtyread/routes.js";
import unrepeatableread from "./src/unrepeatableread/routes.js"

const App = Express();

//get json from endpoints
App.use(Express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.send("placholder");
});

App.use("/dirtyread", dirtyRead);

App.use("/unrepeatableread", unrepeatableread);

App.listen(3000, () => console.log(`App is listening on 3000`));
