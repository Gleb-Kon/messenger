const crypto = require('crypto');
const hash = crypto.createHash('sha512');

const pepper = "qweasdwqwerwe1w323e4e5123";

exports.pepper = pepper;
