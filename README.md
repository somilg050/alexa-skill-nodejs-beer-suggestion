# Beer Suggestion

## Skill OverView

This Alexa skill will help you in finding the most popular beer in any state in the U.S.A.
To start the skill say: Alexa, open beer buddy.
You can also ask beer buddy to repeat the suggestion or can ask for another suggestion.

For Example: 
Alexa, ask beer buddy to suggest a beer from Alaska.

### Testing 
You can test this skill using an Amazon Echo device or at [Echosim](https://echosim.io) or reverb app on android and IOS. you can test this skill using:

- You can open the skill by saying "Alexa, open beer buddy."

- the skill will be invoked with introduction and then ask you 'What state would you like a suggestion for?'.

- after user said a state name then skill will you provide you with the best beer available in that state.

## Under the Hood 

### How Skill Works 

- Create an Alexa Skill in the Alexa Skill Developer Console and define the interaction models as well as the intent schema. This sets up the framework for the behavior of the skill.
- Create an AWS Lambda function that interfaces with the skill and translates the various intents into requests that connects to your service. This lambda function is written in Node.js. 

## Skill setup

### Setting up Your Alexa Skill in the Alexa Developer Console
Open Your developer account or click on the link given  [Amazon developer console](https://developer.amazon.com/edw/home.html#/skills).

1. Create a new skill. name it `Beer Suggestion`. under the model for skill select custom and click on create skill.

2. Choose template `start from scratch` and click on choose.

Give the invocation name as `Beer Buddy`. under the invocation headline from the right side list.

3. Click on the "JSON Editor" item under **Dashboard** on the left side of the skill builder.

4. In the textfield provided, replace any existing code with the code provided in the `Speech Assets/intentSchema.json` and click on "Save Model".

5. Click on the **Save Model** button, and then click on the **Build Model** button.

### Setting Up A Lambda Function on Amazon Web Services

1.  Go to http://aws.amazon.com and sign in to the console and choose the Lambda service from the search box. AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).I have choosed Ireland but you can Choose any one of them.

2.  Click on the "Create function" button. Select "Blueprints", then choose the blueprint named "alexa-skill-kit-sdk-factskill". And give your function a name.

3.  Set up your Lambda function role to "lambda_basic_execution" and click on Create Function. 

4. Configure your trigger. Look at the column on the left called "Add triggers", and select Alexa Skills Kit from the list. 

5. After you create the function, the ARN value appears in the top right corner.

6. Scroll down to the field called "Function code", and replace any existing code with the code provided in the `src/index.js`.

7. Copy the ARN value. The ARN value should be in the top right corner.

### Connecting Your Frontend with your Backend
  
1. Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.

2. Open the "Endpoint" tab on the left side and select the "AWS Lambda ARN" option for your endpoint.

3. copy the skill ID and paste it in the trigger section in your AWS Lammbda and paste the ARN copied to the default region just below your skill ID in the endpoint.
4. Click Save endpoints

### Your Skill is done with the setup part ad is ready to use! You can test it on https://echosim.io 
