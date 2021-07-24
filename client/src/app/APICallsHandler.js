import axios from "app/axios";

export const dialCallToUser = async (payload) => {
  try {
    const result = await axios.post("/call/connect", payload);
    return {
      success: result.data,
    };
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
};

export const disConnectCall = async (payload) => {
  try {
    const result = await axios.post("/call/disconnect", {
      callUid: payload,
    });
    return {
      success: result.data,
    };
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
};

export const getCallHistory = async () => {
  try {
    const result = await axios.get("/call/history");
    return {
      success: result.data,
    };
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
};
