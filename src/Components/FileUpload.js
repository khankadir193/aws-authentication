import React, { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "fugetroncorp-frontend-test"; // Updated bucket name
const REGION = "us-west-2"; // Replace with your AWS S3 bucket region

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "your-access-key-id", // Replace with your AWS Access Key ID
  secretAccessKey: "your-secret-access-key", // Replace with your AWS Secret Access Key
});

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload");
      return;
    }

    setUploading(true);
    setMessage("");

    const params = {
      Bucket: 'fugetroncorp-frontend-test',
      Key: selectedFile.name, // The file name
      Body: selectedFile,
      ACL: "public-read", // Set file permissions (optional)
      ContentType: selectedFile.type,
    };

    try {
      const data = await s3.upload(params).promise();
      setMessage(`File uploaded successfully: ${data.Location}`);
      // console.log('getting error....!!!!',errr);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload File to S3</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;


//s3 bucket
//https://dev.to/aws-builders/how-to-upload-files-to-amazon-s3-with-react-and-aws-sdk-b0n
