import Express from "express";
import cors from "cors";
import dirtyRead from "./src/dirtyread/routes.js";
import unrepeatableread from "./src/unrepeatableread/routes.js";
import conversiondeadlock from "./src/conversiondeadlock/routes.js";
import cycledeadlock from "./src/cycledeadlock/routes.js";
import lostUpdate from "./src/lostupdate/routes.js";
import phantomRead from "./src/phantomread/routes.js";

const App = Express();

//get json from endpoints
App.use(Express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

App.use("/dirtyRead", dirtyRead);

App.use("/lostUpdate", lostUpdate);

App.use("/unrepeatableread", unrepeatableread);

App.use("/conversiondeadlock", conversiondeadlock);

App.use("/cycledeadlock", cycledeadlock);

App.use("/phantomread", phantomRead);

App.listen(3000, () => console.log(`App is listening on 3000`));
