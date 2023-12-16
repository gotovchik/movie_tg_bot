"use strict";

import axios from "axios";
import { ConfigService } from "./src/config/ConfigService.js";

const cs = new ConfigService();
const API_TOKEN = cs.get("KP_TOKEN");
const API_URL = cs.get("API_URL");
axios(`${API_URL}/v1.4/movie/random`, {
  headers: {
    'X-API-KEY': API_TOKEN
  }
}).then((responce) => {
  console.log(responce.data);
});


