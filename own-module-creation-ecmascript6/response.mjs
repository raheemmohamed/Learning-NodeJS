function decryptData(data) {
  return "Data Decrypted";
}

function read() {
  decryptData("descrypt data");
  return "reading data";
}

/* ES6 way export modules functions to outside world for accessible via import */
export { read };
