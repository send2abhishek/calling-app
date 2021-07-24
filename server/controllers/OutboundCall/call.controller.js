var plivo = require("plivo");

const initiateCall = async (req, res, next) => {
  try {
    var authId = process.env.AUTHID;
    var authToken = process.env.AUTHTOKEN;
    var client = new plivo.Client(authId, authToken);

    const result = await client.calls.create(
      req.body.from, // from
      req.body.to, // to
      process.env.ANSWERURL ||
        "https://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url
      {
        answerMethod: "GET",
        time_limit: parseInt(req.body.time),
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

module.exports = {
  initiateCall,
};
