import React from "react";
import { motion } from "framer-motion";
import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import Banner from '../assests/video.mp4'

const Hero = () => {
  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex flex-col justify-center items-center relative z-10">
          <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
            Prompt
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          >
            <h1 className={`${styles.heroHeading}`}>whi</h1>
            <div className={`${styles.heroDText}`}></div>
            <h1 className={`${styles.heroHeading}`}>ness</h1>
          </motion.div>
        </div>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="relative w-full md:-mt-[40px] -mt-[12px]"
        >
          <div className="mx-3 my-7">
            <video
              className="w-[90%] mx-auto shadow-[10px_-5px_50px_-5px] shadow-blue-200"
              controls
              muted
              loop
              autoPlay
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
