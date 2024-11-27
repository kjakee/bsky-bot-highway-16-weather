import axios from 'axios';
import OpenAI from "openai";

const openai = new OpenAI();

export default async function getPostText() {
  
    const response = await axios.get('https://www.drivebc.ca/mobile/pub/events/Highway16.html');
    const users = response.data;


 const stream = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "write a tweet on recent three events from " + response.data +"Add reference: https://www.drivebc.ca/mobile/pub/events/Highway16.html"+"Include only hashtags #Highway16 #Highway16Weather #Highway16RoadCondition #DriveHighway16"}],
  stream: true,
});
var tweetString = '';
for await (const chunk of stream) {
  tweetString = tweetString + (chunk.choices[0]?.delta?.content || "");
  //process.stdout.write(chunk.choices[0]?.delta?.content || "");
}
  // Generate the text for your post here. You can return a string or a promise that resolves to a string
  return tweetString;
}