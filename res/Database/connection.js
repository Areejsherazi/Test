
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://areejsherazi008:qe45qQ4tKgeIWABJ@petbookcluster.pf6erz5.mongodb.net/")
.then(() => {
    console.log("Connection successful");
})
.catch(error => {
    console.error("Connection error:", error);
});
