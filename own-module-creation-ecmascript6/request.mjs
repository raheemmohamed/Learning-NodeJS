function encryptData(data) {
  return "Data Encrypted";
}

function send(url, data) {
  encryptData(data);
  console.log(
    `Encrypt the data and Sending to Backend ${url} with Data ${data}`
  );
}

/* ES6 way export modules functions to outside world for accessible via import */
export { send };
