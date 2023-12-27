// initmongo.js

//To execute:
//$mongo assignment3db initmongo.js 
//Above command to be executed from the directory where initmongo.js is present

//Perform a cleanup of existing data. 
db.dropDatabase()

// Create a collection for User Service (USV)
db.createCollection("users")

// Create a collection for Question Service (QSV)
db.createCollection("questions")

// create a colletions for counter
db.createCollection("counter")
db.counters.insert({ _id: "userId", sequence_value: 0 });
db.counters.insert({ _id: "questionId", sequence_value: 0 });