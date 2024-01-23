const OpenAI = require("openai");
const { User } = require("../models/User");
const { Pair } = require("../models/Pair");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getTextCompletionPrompt } = require("prompt-generator");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const openai = new OpenAI({
  apiKey: `${process.env.API_KEY}`,
});


module.exports.createPrompt = async (req, res) => {
  console.log(process.env.API_KEY);
  try {
    const { question } = req.body;
    const convertedQuestion = `Imagine being a prompt engineer. Your objective is to formulate a 150 to 160 word of question the question should contain specific details, intent, example and an output format. The question is: <${question}>`;
    const id = req.user.id;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: convertedQuestion }],
      model: "gpt-3.5-turbo",
    });

    const prompt = completion.choices[0].message.content;

    const completion2 = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const answer = completion2.choices[0].message.content;

    // console.log("the ans is " + prompt);

    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const answer = response.text();

    return res.status(200).json({
      success : true,
      question,
      prompt,
      answer
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.createCustomPrompt = async(req, res)=>{
  try{
    const options = req.body;
    const extendedOptions = {
      ...options,
      "language": "English",
      "shouldIncludeCitations": true,
      "shouldIncludeAnalogies": true,
      "shouldIncludeQuotes": true,
      "shouldIncludeStatistics": true,
      "shouldUseMarkdown": true,
      "additionalConstraints": [
        "avoid using any human names in the text",
        "use short senteces",
        "break the text into multiple paragraphs"
      ],
    }
    
    const prompt = getTextCompletionPrompt(extendedOptions);
    return res.status(200).json({
      success : true,
      message : "prompt has been successfully generated",
      prompt
    })
  }catch(error){
    return res.status(400).json({
      success : false,
      message : error.message
    })
  }
}

module.exports.removePair = async (req, res) => {
  try {
    const { pairId } = req.body;
    const id = req.user.id;
    await User.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          questionAndAnswer: pairId,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "successfully removed",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.createPair = async (req, res) => {
  try {
    const { question } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    const ans = text;
    // const pair = await Pair.create({ question, answer: ans });
    // await User.findByIdAndUpdate(
    //   { _id: id },
    //   {
    //     $push: {
    //       questionAndAnswer: pair._id,
    //     },
    //   }
    // );
    console.log(ans);
    return res.status(200).json({
      question,
      answer: ans,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
