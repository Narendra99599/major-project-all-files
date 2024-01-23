import { apiConnector } from "../apiConnector";
import { chatEndPoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import toast from "react-hot-toast";

export function createPrompt(question, token, setPair) {
  return async (dispatch) => {
    console.log(question);
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        chatEndPoints.CREATE_PROMPT,
        {
          question: question,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("CRAETEPROMPT API RESPONSE............", response);
      console.log(response.data.success);
      if (!response.data.success) {
        dispatch(setLoading(false));
        throw new Error(response.data.message);
      }
      toast.success("prompt has been generated");
      const prompt = response.data.prompt;
      const answer = response.data.answer;
      setPair((prevPrev) =>{
        return {
          ...prevPrev, prompt, answer
        }
      })

      console.log(answer);

    } catch (error) {
      console.log("CREATEPROMPT API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
  };
}
