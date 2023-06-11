// qrcode
const qr = require("qrcode");
// google cloud bucket
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const gcs = new Storage({
  keyFilename: "./service-account.json",
  projectId: "evident-bedrock-381211",
});

const bucket = gcs.bucket("qrcode-test-dev");

const uploadBucket = async (generateqrId) => {
  let url = "http://34.101.117.52:9000";
  await qr.toFile(
    `${generateqrId}.png`,
    `${url}/qrcode/approve/${generateqrId}`,
    (err) => {
      if (err) throw err;
    }
  );
  await bucket.upload(`./${generateqrId}.png`);
  await fs.unlink(`./${generateqrId}.png`, (err) => {
    if (err) throw err;
  });
};

module.exports.uploadBucket = uploadBucket;
