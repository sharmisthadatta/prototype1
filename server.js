const { GraphQLServer } = require("graphql-yoga");
const {graphqlExpress,graphiqlExpress}= require('apollo-server-express');
const bodyParser =require('body-parser');
const cors= require('cors');
const express= require ('express');
const {makeExecutableSchema }= require ('graphql-tools');
const fetch = require("node-fetch");
var express_graphql = require('express-graphql');
const _ = require  ('lodash');
const randomstringPromise = require ('randomstring-promise');
const redis =require ('redis');



client = redis.createClient();
 client.on('connect', () => {
   console.log("connected to redis");
});

client.on("error", function (err) {
   console.log("Error " + err);
});


//var redis = require("redis"),

const SAMPLE_DATA =[

  {

    App_name: 'App - 01',

    crn: 'crn... blah...',

    space_name: 'dev',

    organization_name: 'sharmistha.datta@ibm.com',

    resource_group_name: 'Default'

  },
  {

    App_name: 'Service - 01',

    crn: 'crn... service...',

    space_name: 'internal',

    organization_name: 'abc@ca.ibm.com',

    resource_group_name: 'Default'

  }


];

const SAMPLE_DATA2 =[

  {

    id: 'App - 01',
    place:'kolkata'

  }


];
const typeDefs = `
  type Query {
    hello(name: String): String!
    getPerson(id: Int!): Person

  }

  type Planet {
    name: String
    rotation_period: String
    orbital_period: String
    films: [Film]
  }

  type Film {
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
    producer: String
    release_date: String
  }

  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    films: [Film]
    homeworld: Planet
    author: [Author]
    place:[Place]
  }

  type Author {
    App_name: String
    crn: String
    space_guid: String
    organization_guid: String
    space_name: String
    organization_name: String
      }

  type Place {
    id: String


          }
`;

const resolveFilms = parent => {
  const promises = parent.films.map(async url => {
    const response = await fetch(url);
    return response.json();
  });

  return Promise.all(promises);
};

/*function fakeDelay1 (SAMPLE_DATA) {
 return  setTimeout(() => {
      return SAMPLE_DATA;
    }, 2000);
};*/
const fakeDelay=()=>
  {
  return new Promise(resolve => {
    setTimeout(() => {
      //console.log("timeout");
      resolve(SAMPLE_DATA);
      //client.set(author.crn,JSON.stringify.author)
    }, 2000);
  });

};
/*
function f(){
  fakeDelay2();
  i++;
  if( i < howManyTimes ){
      setTimeout( f, 2000 );
  }
};
f();
*/

const fakeDelay2=()=>
  {
  return new Promise(resolve => {
    setTimeout(() => {
      var someString = makeid();
      resolve(someString);
      //client.set(place.id,JSON.stringify.place);
    }, 5000);
  });
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //var time = current time
    //var threshold = 10
    //var previousTime = someGlobalVar
    //if ((time-previousTime)>threshold) || (someGlobalVar == DEFAULT VALUE)  then someGlobalVar = time else do nothing
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

       MY_DATA =[
        {
          id: text
        }
      ];


    return (MY_DATA);
  }
};




const random_data=function (emptyString){
  return new Promise(
    function (resolve) {
     var someNumber = "123";
     resolve(someNumber);
   });
 };





  /*var i = 0, howManyTimes = 10;

  function f() {
      value = makeid();
      console.log("place:" + value);
      i++;
      if( i < howManyTimes ){
          setTimeout( f, 3000 );
      }
  }
  f();*/



/*function fakeDelay (cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cb())
    }, 2000)
  })
};*/
//var someGlobalVar;
const resolvers = {



  Planet: {
    films: resolveFilms
  },
  Person: {
    homeworld: async parent => {
      const response = await fetch(parent.homeworld);
      return response.json();
    },
    films: resolveFilms,
    author:(parent,args,{client})=>{
      return new Promise(resolve => {
        setTimeout(() => {
          //console.log("timeout");
          resolve(SAMPLE_DATA);

        }, 2000);
     })
     client.set(author.crn,JSON.stringify.author);
     client.get(author.crn,JSON.stringify.author);
          },
    place: fakeDelay2,
  },
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getPerson: async (_, { id },{client}) => {
      const response = await fetch(`https://swapi.co/api/people/${id}/`);
      //console.log(response);
      //client.get(response.data.getPerson.author.crn,JSON.stringify.response.data.getPerson.author);
      return response.json();
    },

  },
};

const schema = makeExecutableSchema({typeDefs, resolvers});



const app = express();
app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use(cors(), bodyParser.json());
      app.use('/graphql', express_graphql({
          schema: schema,
          context:{client},
          tracing: true,
          cacheControl: true,
          graphiql: true
      }));
 app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
