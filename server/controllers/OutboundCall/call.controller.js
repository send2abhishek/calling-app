const plivo = require("plivo");

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

module.exports = {
  connectCall,
  disconnectCall,
};
