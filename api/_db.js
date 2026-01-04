import fs from "fs";

const DB_PATH = "db.json";

export function loadDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

export function saveDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}
