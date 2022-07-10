function encryptData(data) {
  return "Data Encrypted";
}

function send(url, data) {
  encryptData(data);
  console.log(
    `Encrypt the data and Sending to Backend ${url} with Data ${data}`
  );
}

/* 
each module you create have `module` that having `module.export` 
using that you can expose your required module function to outside for accessible */

module.exports = {
  send,
};
