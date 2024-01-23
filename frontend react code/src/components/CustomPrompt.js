import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { chatEndPoints } from "../services/apis";
import { setLoading } from "../slices/authSlice";

const CustomPrompt = () => {
  const [pair, setPair] = useState({
    prompt: "",
    answer: "",
  });
  const token = JSON.parse(localStorage.getItem("token"));
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [customPrompt, setCustomPrompt] = useState("");

  const [formData, handleformData] = useState({
    topic: "",
    actAs: "",
    objective: "",
    tone: "",
    audience: "",
    format: "",
  });

  function handleChange(event) {
    handleformData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function generateCustomPrompt() {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        chatEndPoints.CREATE_CUSTOM_PROMPT,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      const generatedPrompt = response.data.prompt;
      console.log(generatedPrompt);

      const response2 = await apiConnector(
        "POST",
        chatEndPoints.CREATE_PAIR,
        {
          question: generatedPrompt,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      const answer = response2.data.answer;

      setPair((prevPair) => {
        return {
          ...prevPair,
          prompt: generatedPrompt,
          answer,
        };
      });
    } catch (error) {
      console.log(error.message);
    }
    dispatch(setLoading(false));
  }

  function handleSubmit(event) {
    event.preventDefault();
    generateCustomPrompt();
  }

  return (
    <div className="w-[80%] mx-auto min-h-[100vh]">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-8">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="topic"
              id="floating_email"
              value={formData.topic}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={handleChange}
            />
            <label
              htmlFor="floating_email"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Topic
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="actAs"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Act as
            </label>
            <select
              id="actAs"
              name="actAs"
              value={formData.actAs}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option className="bg-primary-black text-white" value="">
                select option
              </option>
              <option className="bg-primary-black text-white" value="expert">
                expert
              </option>
              <option className="bg-primary-black text-white" value="critic">
                critic
              </option>
              <option
                className="bg-primary-black text-white"
                value="enthusiast"
              >
                enthusiast
              </option>
              <option className="bg-primary-black text-white" value="teacher">
                teacher
              </option>
              <option className="bg-primary-black text-white" value="student">
                student
              </option>
              <option className="bg-primary-black text-white" value="parent">
                parent
              </option>
              <option className="bg-primary-black text-white" value="child">
                child
              </option>
              <option className="bg-primary-black text-white" value="friend">
                friend
              </option>
              <option className="bg-primary-black text-white" value="advisor">
                advisor
              </option>
              <option className="bg-primary-black text-white" value="analyst">
                analyst
              </option>
              <option className="bg-primary-black text-white" value="blogger">
                blogger
              </option>
              <option
                className="bg-primary-black text-white"
                value="researcher"
              >
                reasearcher
              </option>
              <option
                className="bg-primary-black text-white"
                value="travel-guide"
              >
                travel-guide
              </option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="objective"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Objective
            </label>
            <select
              id="objective"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option className="bg-primary-black text-white" value="">
                select option
              </option>
              <option className="bg-primary-black text-white" value="inform">
                inform
              </option>
              <option className="bg-primary-black text-white" value="persuade">
                persuade
              </option>
              <option className="bg-primary-black text-white" value="entertain">
                entertain
              </option>
              <option className="bg-primary-black text-white" value="explain">
                explain
              </option>
              <option className="bg-primary-black text-white" value="advise">
                adivse
              </option>
              <option className="bg-primary-black text-white" value="analyse">
                analyse
              </option>
              <option className="bg-primary-black text-white" value="inspire">
                inspire
              </option>
              <option className="bg-primary-black text-white" value="convince">
                convince
              </option>
              <option className="bg-primary-black text-white" value="describe">
                describe
              </option>
              <option className="bg-primary-black text-white" value="compare">
                compare
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center gap-8">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="tone"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tone
            </label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option className="bg-primary-black text-white" value="">
                select option
              </option>
              <option className="bg-primary-black text-white" value="expert">
                neutral
              </option>
              <option className="bg-primary-black text-white" value="critic">
                formal
              </option>
              <option
                className="bg-primary-black text-white"
                value="enthusiast"
              >
                casual
              </option>
              <option className="bg-primary-black text-white" value="teacher">
                playful
              </option>
              <option className="bg-primary-black text-white" value="student">
                authoritative
              </option>
              <option className="bg-primary-black text-white" value="parent">
                empathetic
              </option>
              <option className="bg-primary-black text-white" value="child">
                informative
              </option>
              <option className="bg-primary-black text-white" value="friend">
                persuastive
              </option>
              <option className="bg-primary-black text-white" value="advisor">
                amusing
              </option>
              <option className="bg-primary-black text-white" value="analyst">
                humorous
              </option>
              <option className="bg-primary-black text-white" value="blogger">
                blogger
              </option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="audience"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              audience
            </label>
            <select
              id="audience"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option className="bg-primary-black text-white" value="">
                select option
              </option>
              <option
                className="bg-primary-black text-white"
                value="professionals"
              >
                professionals
              </option>
              <option
                className="bg-primary-black text-white"
                value="general public"
              >
                general public
              </option>
              <option
                className="bg-primary-black text-white"
                value="highschool students"
              >
                highschool students
              </option>
              <option
                className="bg-primary-black text-white"
                value="graduate students"
              >
                graduate students
              </option>
              <option
                className="bg-primary-black text-white"
                value="tech-savvy people"
              >
                tech-savvy people
              </option>
              <option
                className="bg-primary-black text-white"
                value="non-tech-savvy people"
              >
                non-tech-savvy people
              </option>
              <option
                className="bg-primary-black text-white"
                value="bussiness people"
              >
                bussiness people
              </option>
              <option
                className="bg-primary-black text-white"
                value="enterpreners"
              >
                enterpreners
              </option>
              <option className="bg-primary-black text-white" value="engineers">
                engineers
              </option>
              <option className="bg-primary-black text-white" value="designers">
                designers
              </option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="format"
              className="sm:text-[25px] text-[25px] text-center peer-focus:font-medium absolute text-sm text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Format
            </label>
            <select
              id="format"
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-[20px] text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option className="bg-primary-black text-white" value="">
                select option
              </option>
              <option className="bg-primary-black text-white" value="table">
                table
              </option>
              <option
                className="bg-primary-black text-white"
                value="code block"
              >
                code block
              </option>
              <option
                className="bg-primary-black text-white"
                value="ordered list"
              >
                ordered list
              </option>
              <option
                className="bg-primary-black text-white"
                value="unordered list"
              >
                unordered list
              </option>
              <option className="bg-primary-black text-white" value="outline">
                outline
              </option>
              <option className="bg-primary-black text-white" value="headline">
                headline
              </option>
              <option className="bg-primary-black text-white" value="essay">
                essay
              </option>
              <option className="bg-primary-black text-white" value="letter">
                letter
              </option>
              <option className="bg-primary-black text-white" value="email">
                email
              </option>
              <option
                className="bg-primary-black text-white"
                value="news article"
              >
                news article
              </option>
              <option
                className="bg-primary-black text-white"
                value="blog article"
              >
                blog article
              </option>
              <option className="bg-primary-black text-white" value="story">
                story
              </option>
              <option className="bg-primary-black text-white" value="poem">
                poem
              </option>
              <option
                className="bg-primary-black text-white"
                value="instruction menu"
              >
                instruction menu
              </option>
              <option
                className="bg-primary-black text-white"
                value="product description"
              >
                product description
              </option>
              <option
                className="bg-primary-black text-white"
                value="presentation"
              >
                presentation
              </option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          generate
        </button>
      </form>
      {/* <div className="mt-[8px] font-normal sm:text-[20px] text-[20px] text-center text-secondary-white">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <p className="mt-[10px] font-normal sm:text-[20px] text-[20px] text-center text-secondary-white max-w-[80%] mx-auto m-[1.2em]  border-white border-[4px] p-[15px] rounded-2xl">
          {prompt}
        </p>
      </div> */}
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
    </div>
  );
};

export default CustomPrompt;
