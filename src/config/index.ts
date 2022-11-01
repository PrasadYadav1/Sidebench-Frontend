export const getAPIUrl = () => process.env.REACT_APP_API_URL;
export const getSessionAlertTimeOut = () => process.env.REACT_APP_SESSION_ALERT_TIME_OUT || '900000';
export const getPromptTimeOut = () => process.env.REACT_APP_PROMPT_TIME_OUT || '60000';

export default getAPIUrl;