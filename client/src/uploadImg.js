import axios from "axios";

const uploadToPinata = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `1a7cac69d0dac2bceaeb`,
          pinata_secret_api_key: `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Uploaded to IPFS:", resFile.data);
  
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

      console.log("THis is hash",ImgHash);
      
      return ImgHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      return null;
    }
  };


  export default uploadToPinata;