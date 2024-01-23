import React from "react";
import signupImage from "../assests/images 2/signup.webp";
import Template from "../auth/Template";

const SignUp = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImage}
      formType="signup"
    />
  );
};

export default SignUp;
