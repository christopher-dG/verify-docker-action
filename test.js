(async () => {
  const assert = require("assert");

  const path = require("path");
  const verifyjs = path.join(path.dirname(__filename), "verify.js");

  const core = require("@actions/core");
  core.setFailed = () => null;

  delete process.env.INPUT_IMAGE;
  delete process.env.INPUT_DIGEST;
  assert.throws(() => { require("./verify.js") }, Error);
  delete require.cache[verifyjs];
  process.env.INPUT_IMAGE = "foo";
  assert.throws(() => require("./verify.js"), Error);
  delete require.cache[verifyjs];
  process.env.INPUT_DIGEST = "bar";
  assert.doesNotThrow(() => require("./verify.js"), Error);
  delete require.cache[verifyjs];

  process.env.INPUT_IMAGE = "alpine:3.1";
  process.env.INPUT_DIGEST = "sha256:a1038a41fe2b75d8c53d0a4d22207e4e7f72e95a11da4d20424f0062b239b67f";

  let verify = require("./verify.js");
  assert(await verify.main() === true);
  delete require.cache[verifyjs];
  process.env.INPUT_DIGEST += "x";
  verify = require("./verify.js");
  assert(await verify.main() === false);
})();
