import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config()

async function APIcall(code) { 
  console.log("Making API call...")

  console.log(process.env.OPENAI_SECRET_KEY)
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_SECRET_KEY 
  });

	try { 
	const GPTOutput = await openai.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages:[
      {
        "role": "system",
        "content": "You will be provided with a piece of python code, and your task is to recommend ways to improve it."
      },
      {
        "role": "user",
        "content": code,
      }
    ],
    temperature:0,
    max_tokens:1024,
    top_p:1,
    frequency_penalty:0,
    presence_penalty:0
  });

	const output_text = GPTOutput.choices[0].message.content; 
	console.log(output_text); 
  return output_text;
	} catch (err) { 
	if (err.response) { 
		console.log(err.response.status); 
		console.log(err.response.data); 
	} else { 
		console.log(err).message; 
	} 
	} 
}; 

export default APIcall;
