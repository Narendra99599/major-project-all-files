const BASE_URL = "http://localhost:4000/api/v1"

// auth endpoints

export const authEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    GET_All_DETAILS_API : BASE_URL + "/auth/get-all-details"
}

export const chatEndPoints = {
    CREATE_PROMPT : BASE_URL + "/chat/create-prompt",
    CREATE_PAIR : BASE_URL + "/chat/create-pair",
    REMOVE_PAIR : BASE_URL + "/chat/remove-pair", 
    CREATE_CUSTOM_PROMPT : BASE_URL + "/chat/create-custom-prompt"
}