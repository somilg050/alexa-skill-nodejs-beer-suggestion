/* eslint-disable  func-names */
/* eslint-disable  no-console */

//CONSTANTS
const Alexa = require('ask-sdk');
const SKILL_NAME = 'Beer Suggestions';
const GET_FACT_MESSAGE = 'Here\'s your Suggestion: ';
const HELP_MESSAGE = 'You can say tell me a beer suggestions, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const skillData = [
  {
      name: "Wyoming",
      ans: "Rainier"
  },
  {
      name: "Wisconsin",
      ans: "Blue Moon"
  },
  {
      name: "West Virginia",
      ans: "Hamms"
  },
  {
      name: "Virginia",
      ans: "Blue Moon"
  },
  {
      name: "Vermont",
      ans: "Gose Beer"
  },
  {
      name: "Utah",
      ans: "Homemade Root Beer"
  },
  {
      name: "Texas",
      ans: "Lone Star"
  },
  {
      name: "Tennessee",
      ans: "Tailgate"
  },
  {
      name: "South Dakota",
      ans: "India Pale Ales"
  },
  {
      name: "South Carolina",
      ans: "Blue Moon"
  },
  {
      name: "Rhode Island",
      ans: "Blue Moon"
  },
  {
      name: "Pennsylvania",
      ans: "Blue Moon"
  },
  {
      name: "Oregon",
      ans: "Buoy"
  },
  {
      name: "Oklahoma",
      ans: "Corona"
  },
  {
      name: "Ohio",
      ans: "Blue Moon"
  },
  {
      name: "North Dakota",
      ans: "Spotted Cow"
  },
  {
      name: "North Carolina",
      ans: "Burial"
  },
  {
      name: "New York",
      ans: "Randolph"
  },
  {
      name:"New Mexico",
      ans: "India Pale Ales"
  },
  {
      name: "New Jersey",
      ans: "Blue Moon"
  },
  {
      name: "New Hampshire",
      ans: "Schilling"
  },
  {
      name: "Nevada",
      ans: "Firestone Walker 805"
  },
  {
      name: "Nebraska",
      ans: "Yuengling's Black and Tan"
  },
  {
      name: "Monatana",
      ans: "Rainier"
  },
  {
      name: "Missouri",
      ans: "Yoengling"
  },
  {
      name: "Mississippi",
      ans: "Blue Moon"
  },
  {
      name: "Minnesota",
      ans: "Hamms"
  },
  {
      name: "Michigan",
      ans: "India Pale Ale M 43"
  },
  {
      name: "Massachusetts",
      ans: "Cape Cod"
  },
  {
      name: "Maryland",
      ans: "Attaboy"
  },
  {
      name: "Maine",
      ans: "Bear Bones"
  },
  {
      name: "Louisiana",
      ans: "Bayou"
  },
  {
      name: "Kentucky",
      ans: "Yuengling"
  },
  {
      name: "Kansas",
      ans: "Blue Moon"
  },
  {
      name: "Iowa",
      ans: "Yuengling"
  },
  {
      name: "Indiana",
      ans: "Yuengling"
  },
  {
      name: "Illinois",
      ans: "Blue Moon"
  },
  {
      name: "Idaho",
      ans: "Gluten Free"
  },
  {
      name: "Hawaii",
      ans: "Aloha"
  },
  {
      name: "Georgia",
      ans: "Blue Moon"
  },
  {
      name: "Florida",
      ans: "Jai Alai"
  },
  {
      name:"Washington",
      ans: "Dacha Garden Beer"
  },
  {
      name: "Delaware",
      ans: "Dewey"
  },
  {
      name: "Connecticut",
      ans: "Blue Moon"
  },
  {
      name: "Colorado",
      ans: "Boulder"
  },
  {
      name: "California",
      ans: "Firestone Walker 805"
  },
  {
      name: "Arkansas",
      ans: "Rainier"
  },
  {
      name:"Arizona",
      ans: "Firestone Walker 805 Blonde Ale"
  },
  {
      name: "Alaska",
      ans: "Irish Death"
  },
  {
      name: "Alabama",
      ans: "Blue Moon"
  }
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {

    // For Example, "Open beer buddy"
    const speakOutput = `Hello friend, I am your beer buddy, I can suggest you a most popular beer in any state in USA.
    What state would you like a suggestion for?`;
    const speakReprompt = `You can say something like: suggest a beer from Alaska.`;
    
    return handlerInput.responseBuilder
      .speak(speakOutput)// The text passed to speak, is what Alexa will say.
      .reprompt(speakReprompt)
      .getResponse();
  },
};


const LocalSuggestion = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'MakeSuggestion');
  },
  handle(handlerInput) {
    var speechOutput;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const undefinedPrompt = "Sorry, I don't understand what you just said. Try again by saying the name of a state.";
    var speechPrompt = `You can ask again for beer suggestion or you can just say exit.`;
    
    // get the value of the state slot
    const request = handlerInput.requestEnvelope.request;
    var stateSlot = request.intent.slots.state.value;
    
    if(getRecommendation(skillData, stateSlot) === undefined){
      speechOutput = undefinedPrompt;
    }
    else{
      var result = getRecommendation(skillData, stateSlot).ans;
      sessionAttributes.result = result;
      sessionAttributes.stateSlot = stateSlot;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      speechOutput = `${result}. Is the most popular beer in ${stateSlot}. ` + `Would you like another beer suggestion?`;
      
    }
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechPrompt)
      .getResponse();
  },
};

function getRecommendation(arr, state) {
  for (var i=0; i < arr.length; i++) {
    if ((arr[i].name).toUpperCase() === state.toUpperCase()) {
      return arr[i];
    }
  }
}

const RepeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.RepeatIntent');
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = `${sessionAttributes.result}. Is the most popular beer in ${sessionAttributes.stateSlot}. `
    + `Would you like another beer suggestion?`;
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const YesIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    var speechOutput = `
  What state would you like a suggestion for?`;
    var speakReprompt = `You can say something like: suggest a beer from Alaska.`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speakReprompt)
      .getResponse();
  },
};

const NoIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    var speechOutput = `Okay then, that's it for today. Goodbye and have a nice day.`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
      .getResponse();
  },
};

// exports.handler = function(event, context, callback){
//   var alexa = Alexa.handler(event, context);
//   alexa.registerHandlers(handlers);
//   alexa.execute();
// };


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    HelpHandler,
    ExitHandler,
    RepeatHandler,
    YesIntent,
    NoIntent,
    SessionEndedRequestHandler,
    LaunchRequestHandler,
    LocalSuggestion,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
