import { config } from "dotenv";

export class ConfigService {
  #config;

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error("Нет файла .env");
    }
    if (!parsed) {
      throw new Error("Пустой файл .env");
    }
    this.#config = parsed;
  }

  get(key) {
    const res = this.#config[key];
    if (!res) {
      throw new Error("Нет такого ключа");
    }

    return res;
  }

}