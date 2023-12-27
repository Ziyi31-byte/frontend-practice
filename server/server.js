const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const path = require('path');

/******************************************* 
DATABASE CONNECTION CODE
********************************************/
//Note that the below variable is a global variable 
//that is initialized in the connectToDb function and used elsewhere.
let db;

//Function to connect to the database
async function connectToDb() {
    const url = 'mongodb://localhost/assignment3db';
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
  }

/******************************************* 
GraphQL CODE
******************************git **************/  
const resolvers = {
  Query: {
    // User Service (USV) Resolvers
    getAllUsers: getAllUsersResolver, // for testing purposes
    accessUserProfile: accessUserProfileResolver,

    // Question Service (QSV) Resolvers
    getAllQuestions: getAllQuestionsResolver,
  },

  Mutation: {
    // User Service (USV) Resolvers
    signUpUser: signUpUserResolver,
    updateUserProfile: updateUserProfileResolver, 
    deregisterUser: deregisterUserResolver,

    // Question Service (QSV) Resolvers
    addQuestion: addQuestionResolver,
    deleteQuestion: deleteQuestionResolver,
    updateQuestion: updateQuestionResolver,
  }
};


// counter to keep track of the number of questions and users
async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await db.collection('counters').findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { returnOriginal: false, upsert: true }
  );
  return sequenceDocument.value.sequence_value;
}

// User Service (USV) Resolvers

// for testing purposes
async function getAllUsersResolver() {
  try {
    const users = await db.collection('users').find().toArray();
    
    if (!users) {
      throw new Error('Error retrieving users.');
    }

    return users;

  } catch (error) {
    console.error(`Error fetching all users:`, error);
    throw error;
  }
}

async function signUpUserResolver(_, {email, password, profile}) {
  try {
    console.log(email, profile);
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }
    
    const userId = await getNextSequenceValue("userId");
    const newUser = {
      id: userId, 
      email: email,
      password: password,
      profile: profile,
    };

    const result = await db.collection('users').insertOne(newUser);

    const insertedUser = result.ops[0];
    console.log(insertedUser);
    return insertedUser;
  } catch (error) {
    throw new Error(`Error signing up user: ${error.message}`);
  }
};

// helper function for update
function processUpdates(updates) {
  let processedUpdates = {};

  for (let key in updates) {
    if (updates[key] !== null && updates[key] !== undefined) {
      processedUpdates[`profile.${key}`] = updates[key];
    }
  }

  return processedUpdates;
}

async function updateUserProfileResolver(_, { auth, updates }) {
  try {
    const existingUser = await db.collection('users').findOne({ email: auth.email });
    if (!existingUser) {
      throw new Error(`User with email: ${auth.email} not found.`);
    }
    if (existingUser.password !== auth.password) {
      throw new Error("Incorrect password");
  }
  } catch (error) {
    throw new Error(`Error fetching user with email ${auth.email}: ${error.message}`);
  }

  const updateQuery = processUpdates(updates);
  try {
    await db.collection('users').updateOne(
      { email: auth.email},
      { $set: updateQuery }
    );

    const updatedUser = await db.collection('users').findOne({ email: auth.email });
    return updatedUser;

  } catch (error) {
    console.error(`Error updating user with email ${email}:`, error);
    throw error;
  }
}

async function deregisterUserResolver(_, { auth }) {
  try {
    const existingUser = await db.collection('users').findOne({ email: auth.email });
    if (!existingUser) {
      throw new Error(`User with email: ${auth.email} not found.`);
    }
    if (existingUser.password !== auth.password) {
      throw new Error("Incorrect password");
  }
  } catch (error) {
    throw new Error(`Error fetching user with email ${auth.email}: ${error.message}`);
  }

  try {
    const result = await db.collection('users').deleteOne({ email: auth.email });
    return true;
  } catch (error) {
    throw new Error(`Error deregistering user: ${error.message}`);
  }
}

// Question Service (QSV) Resolvers

async function getAllQuestionsResolver() {
  try {
    const questions = await db.collection('questions').find().toArray();
    
    if (!questions) {
      throw new Error('Error retrieving questions.');
    }
    console.log(questions); 
    return questions;

  } catch (error) {
    console.error(`Error fetching all questions:`, error);
    throw error;
  }
}

async function addQuestionResolver(_, { auth, input }) {
  try {
    const existingUser = await db.collection('users').findOne({ email: auth.email });
    if (!existingUser) {
      throw new Error(`User with email: ${auth.email} not found.`);
    }
    if (existingUser.password !== auth.password) {
      throw new Error("Incorrect password");
  }
  } catch (error) {
    throw new Error(`Error fetching user with email ${auth.email}: ${error.message}`);
  }

  try {
    const questionId = await getNextSequenceValue("questionId");
    const newQuestion = {
      title: input.title,
      description: input.description,
      complexity: input.complexity,
      category: input.category,
      createdByUser: auth.email, 
      id: questionId,
    };

    const result = await db.collection('questions').insertOne(newQuestion);
    const insertedQuestion = result.ops[0];
    return insertedQuestion;
  } catch (error) {
    throw new Error(`Error adding question: ${error.message}`);
  }
}

async function deleteQuestionResolver(_, { id, auth }) {
  try {
    const existingUser = await db.collection('users').findOne({ email: auth.email });
    if (!existingUser) {
      throw new Error(`User with email: ${auth.email} not found.`);
    }
    if (existingUser.password !== auth.password) {
      throw new Error("Incorrect password");
  }
  } catch (error) {
    throw new Error(`Error fetching user with email ${auth.email}: ${error.message}`);
  }

  try {
    const existingQuestion = await db.collection('questions').findOne({ id: parseInt(id) });
    if (!existingQuestion) {
      throw new Error(`Question with ID: ${id} not found.`);
    }
    if (existingQuestion.createdByUser !== auth.email) {
      throw new Error("Unauthorized");
  }
  } catch (error) {
    throw new Error(`Error fetching user with id ${id}: ${error.message}`);
  }

  try {
    const result = await db.collection('questions').deleteOne({ id: parseInt(id) });
    return true; 
  } catch (error) {
    throw new Error(`Error deleting question: ${error.message}`);
  }
}

async function accessUserProfileResolver(_, { auth }) {
  try {
    console.log(auth.email);
    const user = await db.collection('users').findOne({ email: auth.email });
    console.log(user);
    if (!user) {
      throw new Error(`User with email: ${auth.email} not found.`);
    }
    if (user.password !== auth.password) {
      throw new Error("Incorrect password");
    }
    return user; 
  } catch (error) {
    throw new Error(`Error access user with email ${auth.email}: ${error.message}`);
  }
}

async function updateQuestionResolver(_, { id, auth, updates }) {
  try {
    const existingUser = await db.collection('users').findOne({ email: auth.email });
    if (!existingUser) {
      throw new Error(`User with email: ${auth.email} not found.`);
    }
    if (existingUser.password !== auth.password) {
      throw new Error("Incorrect password");
  }
  } catch (error) {
    throw new Error(`User with email ${auth.email}: ${error.message}`);
  }

  try {
    const existingQuestion = await db.collection('questions').findOne({ id: parseInt(id) });
    if (!existingQuestion) {
      throw new Error(`Question with ID: ${id} not found.`);
    }
    if (existingQuestion.createdByUser !== auth.email) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error(`Error updating question with id: ${id}: ${error.message}`);
  }
  
  try {
    // Update the question with the provided updates by ID
    const result = await db.collection('questions').updateOne({ id: parseInt(id) }, { $set: updates });
    const updatedQuestion = await db.collection('questions').findOne({ id: parseInt(id) });
    return updatedQuestion;
  } catch (error) {
    throw new Error(`Error updating question: ${error.message}`);
  }
}

/******************************************* 
SERVER INITIALIZATION CODE
********************************************/
const app = express();

 

//Creating and attaching a GraphQL API server.
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});
server.applyMiddleware({ app, path: '/graphql' });

//Attaching a Static web server.
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//Starting the server that runs forever.
  (async function () {
    try {
      await connectToDb();
      app.listen(3000, function () {
        console.log('App started on port 3000');
      });
    } catch (err) {
      console.log('ERROR:', err);
    }
  })();