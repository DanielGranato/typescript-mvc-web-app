import api from "../api/index.js";

export default function (app) {
  app.route("/dados")
    .get(api.dados);
}
