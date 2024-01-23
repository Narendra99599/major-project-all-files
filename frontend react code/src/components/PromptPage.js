import React, { useState } from "react";
import { fadeIn, staggerContainer } from "../utils/motion";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createPrompt } from "../services/operations/chatApi";

const PromptPage = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [customPrompt, setCustomPrompt] = useState("");
  const [pair, setPair] = useState({
    prompt: "",
    answer: "",
  });

  const [formData, handleformData] = useState({
    question: "",
  });

  function handleCustomPrompt(event) {
    setCustomPrompt(event.target.value);
  }

  function handleChange(event) {
    handleformData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { question } = formData;
    dispatch(createPrompt(question, token, setPair));
    console.log(pair);
  }

  return (
    <motion.div
      className="min-h-[100vh]"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
    >
      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[10px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white max-w-[80%] mx-auto m-[1.2em]"
      >
        <span className="font-extrabold text-white">
          Simple Prompt Generator{" "}
        </span>{" "}
        Simple type-safe prompt generator - no need to go through long articles
        or cheatsheets to make sure you are considering the factors required for
        a simple prompt
      </motion.p>
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
      >
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="question"
              id="floating_email"
              value={formData.question}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={handleChange}
            />
            <label
              htmlFor="floating_email"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter the topic
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </motion.div>
      {loading ? (
        <div className="w-[100%] min-h-[30vh] flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {!loading && (
            <p className="mt-[10px] font-normal sm:text-[20px] text-[20px] text-center text-secondary-white max-w-[80%] mx-auto m-[1.2em] border-white border-[4px] p-[15px] rounded-2xl">
              {/* {prompt} */}
              Prompt is
              <textarea
                type="text"
                name="question"
                id="floating_email"
                value={pair.prompt}
                rows={5}
                className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                onChange={handleCustomPrompt}
              />
            </p>
          )}

          {!loading && (
            <p className="mt-[10px] whitespace-pre-wrap font-normal sm:text-[20px] text-[20px] text-center text-secondary-white max-w-[80%] mx-auto m-[1.2em] border-white border-[4px] p-[15px] rounded-2xl">
              {pair.answer}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
};

export default PromptPage;
