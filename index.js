import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var nizDanas = [];
var nizPosao = [];
var danSlovima;

function dobijDan() {
  var gja = new Date().getUTCDay();
  switch (gja) {
    case 1:
      danSlovima = "Monday";
      break;
    case 2:
      danSlovima = "Tuesday";
      break;
    case 3:
      danSlovima = "Wednesday";
      break;
    case 4:
      danSlovima = "Thursday";
      break;
    case 5:
      danSlovima = "Friday";
      break;
    case 6:
      danSlovima = "Saturday";
      break;
    case 0:
      danSlovima = "Sunday";
      break;
    default:
      console.log("NoDay");
      break;
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  dobijDan();
  res.render("today.ejs", {
    taskovi: nizDanas,
    danUSedmici: danSlovima,
    dan: new Date().getDay(),
    mjesec: new Date().getMonth(),
    godina: new Date().getFullYear(),
  });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { taskovi: nizPosao });
});

app.post("/submitToday", (req, res) => {
  var noviTask = req.body["tekstboks"];
  if (noviTask == "") {
    noviTask = "Empty task";
  }
  nizDanas.push(noviTask);
  dobijDan();
  res.render("today.ejs", {
    taskovi: nizDanas,
    danUSedmici: danSlovima,
    dan: new Date().getDay(),
    mjesec: new Date().getMonth(),
    godina: new Date().getFullYear(),
  });
});

app.post("/submitWork", (req, res) => {
  var noviTask = req.body["tekstboks"];
  if (noviTask == "") {
    noviTask = "Empty task";
  }
  nizPosao.push(noviTask);
  res.render("work.ejs", {
    taskovi: nizPosao,
  });
});

app.post("/deleteToday", (req, res) => {
  var noviTask = req.body["tekstBrisanje"];
  var temp = [];
  for (let i = 0; i < nizDanas.length; i++) {
    if (i != noviTask) {
      temp.push(nizDanas[i]);
    }
  }
  nizDanas = temp;
  res.render("today.ejs", {
    taskovi: nizDanas,
    dan: new Date().getDay(),
    mjesec: new Date().getMonth(),
    godina: new Date().getFullYear(),
  });
});

app.post("/deleteWork", (req, res) => {
  var noviTask = req.body["tekstBrisanje"];
  var temp = [];
  for (let i = 0; i < nizPosao.length; i++) {
    if (i != noviTask) {
      temp.push(nizPosao[i]);
    }
  }
  nizPosao = temp;
  res.render("work.ejs", {
    taskovi: nizPosao,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
