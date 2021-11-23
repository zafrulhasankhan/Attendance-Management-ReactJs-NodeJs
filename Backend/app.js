const express = require('express');
const app  = express();
var cors = require('cors');
var sess = require('express-session');
app.use(cors());
app.use(express.json());

//Routes
app.use("/",require("./routes/users")); 
app.use("/attend",require("./routes/attendance"));
app.use("/course",require("./routes/course"));



const port = process.env.PORT || 4001;
app.listen(port,console.log(`Server is running on port ${port}`)); 