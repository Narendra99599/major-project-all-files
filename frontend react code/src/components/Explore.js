import React, { useState } from "react";
import { motion } from "framer-motion";
import ExploreCard from "./ExploreCard";
import { TitleText, TypingText } from "./common/CustomText";
import styles from "../styles";
import { staggerContainer } from "../utils/motion";
import { exploreWorlds } from "../constants";

const Explore = () => {
  const [active, setActive] = useState("world-2");
  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| The World" textStyles="text-center" />
        <TitleText
          title={
            <>
              Choose the world you want <br className="md:block hidden"></br> to
              explore
            </>
          }
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
      7
    </section>
  );
};

export default Explore;
