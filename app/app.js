const path = require("path");
const fs = require("fs");

const data = path.join(__dirname, "data.json");
const full = path.join(__dirname, "full.json");
const as = path.join(__dirname, "as.json");
const file = JSON.parse(fs.readFileSync(full, "utf-8"));
const arr = JSON.parse(fs.readFileSync(data, "utf-8"));

const result = [];

const start = new Date().getTime();
arr.forEach((el) => {
  const res = [];
  file.forEach((item) => {
    if (item[el]) {
      res.push(item[el]);
    }
  });
  result.push({ [el]: res });
});
const end = new Date().getTime();

fs.writeFileSync(as, JSON.stringify(result, null, 2), "utf-8");
console.log("Time:", end - start);
