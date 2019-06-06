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
    state:"GOA",
    category:"DARK BEER",
    recomendation:"You can try Budweiser Magnum. It's really good!!"
  },
  {
    state:"MAHARASHTRA",
    category:"LIGHT BEER",
    recomendation:"Definately go for heineken"
  },
  {
    state:"KARNATAKA",
    category:"LIGHT BEER",
    recomendation:"can try corona"
  }
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    // Our skill will receive a LaunchRequest when the user invokes the skill
    // with the  invocation name, but does not provide any utterance
    // mapping to an intent.
    // For Example, "Open beer suggestion"
    const speakOutput = 'I can suggest a local beer from any state in the india. What state would you like a suggestion for?';

    // The response builder contains is an object that handles generating the
    // JSON response that your skill returns.
    return handlerInput.responseBuilder
      .speak(speakOutput)// The text passed to speak, is what Alexa will say.
      .reprompt(speakOutput)
      .getResponse();
  },
};

const MakeRecommendation = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'MakeRecommendation');
  },
  handle(handlerInput) {
    var speechOutput;
    const undefinedPrompt = "Sorry, I dont have recommendation for that. Try again by saying the name of a state.";
    
    // get the value of the category slot
    const request = handlerInput.requestEnvelope.request;
    var categorySlot = request.intent.slots.category.value;
    
    if(getRecommendation(skillData, 'category', categorySlot) === undefined){
      speechOutput = undefinedPrompt;
    }
    else
      speechOutput = getRecommendation(skillData, 'category', categorySlot).recomendation;
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
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
    const undefinedPrompt = "Sorry, I dont have recommendation for that. I can recommend a: light beer, or a: dark beer. Which would you prefer?";

    // get the value of the state slot
    const request = handlerInput.requestEnvelope.request;
    var stateSlot = request.intent.slots.state.value;
    
    if(getRecommendation(skillData, 'state', stateSlot) === undefined){
      speechOutput = undefinedPrompt;
    }
    else
      speechOutput = getRecommendation(skillData, 'state', stateSlot).recomendation;
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

function getRecommendation(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++) {
    if (arr[i][propName] == propValue.toUpperCase()) {
      return arr[i];
    }
  }
}


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
    SessionEndedRequestHandler,
    LaunchRequestHandler,
    LocalSuggestion,
    MakeRecommendation
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
