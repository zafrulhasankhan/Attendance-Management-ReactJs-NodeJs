const express = require('express');
const app  = express();
var cors = require('cors');
var sess = require('express-session');
app.use(cors());
app.use(express.json());

//Routes
app.use("/",require("./routes/users"));
app.use("/attend",require("./routes/attendance"));




const port = process.env.port || 4001;
app.listen(port,console.log(`Server is running on port ${port}`));