import axios from 'axios'

export const registerValidation = async values => {
    let errors = {};
    let urlLoginLive = process.env.REACT_APP_API_LOGIN_LIVE;

    try {
        const { data:result } = await axios.post(
            `${urlLoginLive}validate/register`, values
        );

        return { ...errors, ...result };
    } catch (error) {
        throw error;
    }
};