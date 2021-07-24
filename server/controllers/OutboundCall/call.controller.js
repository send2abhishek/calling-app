const plivo = require("plivo");
const saveCallDetailsService = require("./call.service");

var plivoClient;

const connectCall = async (req, res, next) => {
  try {
    const result = await getPlivoClientInstance().calls.create(
      `+91${req.body.from}`, // from
      `+91${req.body.to}`, // to
      process.env.ANSWERURL ||
        "https://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url
      {
        answerMethod: "GET",
        time_limit: parseInt(req.body.duration),
        caller_name: req.body.name,
      }
    );
    await saveCallDetailsService.saveCallDetails({
      ...req.body,
      requestUuid: result.requestUuid,
    });

    res.status(201).json({
      message: "Call Connected",
      requestUuid: result.requestUuid,
    });
  } catch (ex) {
    next(ex);
  }
};

const disconnectCall = async (req, res, next) => {
  try {
    await getPlivoClientInstance().calls.cancel(req.body.callUid);
    res.status(201).json({
      message: "Call Disconnected",
    });
  } catch (ex) {
    next(ex);
  }
};

function getPlivoClientInstance() {
  if (plivoClient) return plivoClient;
  return new plivo.Client(process.env.AUTHID, process.env.AUTHTOKEN);
}

const getCallHistory = async (req, res, next) => {
  try {
    const result = await saveCallDetailsService.findAllCallDetailsFromDB();
    res.status(200).json(result.success);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  connectCall,
  disconnectCall,
  getCallHistory,
};
