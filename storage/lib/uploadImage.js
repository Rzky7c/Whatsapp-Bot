const axios = require("axios");
const formdata = require("form-data");

function uploadByBuffer(buffer, contentType = "image/png", agent) {
  return new Promise(async (resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) return reject("Buffer is not a buffer");
    const formData = new formdata();
    formData.append("photo", Buffer.from(buffer), {
      filename: "blob",
      contentType,
      ...agent && { agent }
    });
    await axios({
      method: "POST",
      url: "https://telegra.ph/upload",
      data: formData.getBuffer(),
      headers: {
        ...formData.getHeaders()
      }
    }).then(({ data }) => {
      if (data.error) return reject(data.error);
      resolve({
        link: 'https://telegra.ph' + data[0].src,
        path: data[0].src,
      });
      console.log(data[0].src)
    }).catch(reject);
  });
}

module.exports = { uploadByBuffer };