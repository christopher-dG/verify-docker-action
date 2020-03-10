const core = require("@actions/core");
const exec = require("@actions/exec");

const image = core.getInput("image", { required: true });
const digest = core.getInput("digest", { required: true });

exports.main = async () => {
  await exec.exec("docker", ["pull", image]);

  let output;
  await exec.exec("docker", ["inspect", image, "--format", "{{.ID}}"], {
    listeners: {
      stdout: buf => {
        output = buf.toString().trim();
      },
    }
  });

  if (output === digest) {
    console.log("Image verification succeeded")
    return true;
  } else {
    core.setFailed("Image verification failed");
    console.log(`Expected: ${digest}`);
    console.log(`Observed: ${output}`);
    return false;
  }
};

if (!module.parent) {
  main();
}
