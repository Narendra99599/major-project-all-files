import React from "react";
import { motion } from "framer-motion";
import { TypingText } from "./common/CustomText";
import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";
import arrowDown from '../assests/images/arrow-down.svg'

const About = () => {
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <div className="z-0" />
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText
          title="| About PromptEngineering"
          textStyles="text-center"
        />
        <motion.p
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
        >
          <span className="font-extrabold text-white">Prompt Engineering </span>{" "}
          refers to the process of crafting and refining prompts, which are
          specific instructions or queries given to a system, such as a language
          model or AI, to generate desired outputs. In the context of{" "}
          <span className="font-extrabold text-white">
            natural language processing
          </span>{" "}
          and
          <span className="font-extrabold text-white"> machine learning </span>
          and <span className="font-extrabold text-white">Explore</span> prompt
          engineering is crucial for achieving accurate and relevant results.
        </motion.p>

        <motion.img
          variants={fadeIn("up", "tween", 0.3, 1)}
          src={arrowDown}
          alt="arrow down"
          className="w-[18px] h-[28px] object-contain mt-[28px] "
        />
      </motion.div>
    </section>
  );
};

export default About;
