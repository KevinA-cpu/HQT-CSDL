import Express from "express";
import cors from "cors";
import dirtyRead from "./src/dirtyread/routes.js";
import unrepeatableread from "./src/unrepeatableread/routes.js"
import conversiondeadlock from "./src/conversiondeadlock/routes.js"

const App = Express();

//get json from endpoints
App.use(Express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.send("placholder");
});

App.use("/dirtyread", dirtyRead);

App.use("/unrepeatableread", unrepeatableread);

App.use("/conversiondeadlock",  conversiondeadlock );

App.listen(3000, () => console.log(`App is listening on 3000`));
