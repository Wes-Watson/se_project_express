//const JWT_SECRET =
//"0c3bdcba0c5f1ef3106b064f6444c08eab099ab2a9ebfd85d829ed15764feb56";

const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = { JWT_SECRET };

