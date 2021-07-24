const { CallHistory } = require("../../models/callHistory");

const saveCallDetails = async (payload) => {
  try {
    const result = await CallHistory.create({
      callerName: payload.name,
      callFrom: payload.from,
      callTo: payload.to,
      callDuration: payload.duration,
      callRequestUuid: payload.requestUuid,
    });

    return {
      success: result,
    };
  } catch (ex) {
    throw new Error(ex.message);
  }
};

const findAllCallDetailsFromDB = async () => {
  try {
    const result = await CallHistory.findAll({
      order: [["createdAt", "DESC"]],
    });

    return {
      success: result,
    };
  } catch (ex) {
    throw new Error(ex.message);
  }
};

module.exports = {
  saveCallDetails,
  findAllCallDetailsFromDB,
};
