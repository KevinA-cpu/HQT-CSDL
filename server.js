import Express from "express";
import cors from "cors";
import dirtyRead from "./src/dirtyread/routes.js";
import lostUpdate from "./src/lostupdate/routes.js";

const App = Express();

//get json from endpoints
App.use(Express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

App.use("/dirtyRead", dirtyRead);
App.use("/lostUpdate", lostUpdate);

App.listen(3000, () => console.log(`App is listening on 3000`));
