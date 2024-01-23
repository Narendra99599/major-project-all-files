import React, { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import styles from "../styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileDropdown from "../auth/ProfileDropDown";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const [menuClick, setMenuClick] = useState(false);

  function handleMenu() {
    setMenuClick(!menuClick);
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative border-b-[1px] border-b-richblack-700`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
      >
        <Link to={"/"}>
          <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
            PROMPT_TUNER
          </h2>
        </Link>
        <button className="text-yellow-400 md:hidden" onClick={handleMenu}>
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        <div
          className={`items-center gap-x-4 md:flex hidden ${
            menuClick ? "block" : "hidden"
          }`}
        >
          <Link to="/">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Home
            </button>
          </Link>
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="mx-4 rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 md:mx-0">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
      <div
        className={`lg:hidden flex flex-col justify-start ${
          menuClick ? "block" : "hidden"
        }`}
      >
        <Link to="/">
          <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 py-[8px] text-richblack-100">
            Home
          </button>
        </Link>
        {token === null && (
          <Link to="/login">
            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className="mx-4 rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 md:mx-0">
              Sign up
            </button>
          </Link>
        )}
        {token !== null && <ProfileDropdown />}
      </div>
    </motion.nav>
  );
};

export default NavBar;
