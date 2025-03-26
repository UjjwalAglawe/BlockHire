import axios from "axios";

const uploadPinata = async (jsonData) => {
  try {
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: {
        pinataContent: jsonData,
        pinataMetadata: {
          name: "project-data",
        },
      },
      headers: {
        pinata_api_key: `1a7cac69d0dac2bceaeb`,
        pinata_secret_api_key: `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`,
        "Content-Type": "application/json",
      },
    });

    console.log("Uploaded JSON to IPFS:", resFile.data);

    const jsonHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

    console.log("This is hash:", jsonHash);

    return jsonHash;
  } catch (error) {
    console.error("Error uploading JSON to Pinata:", error);
    return null;
  }
};

export default uploadPinata;
