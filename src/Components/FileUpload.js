import {useState, useEffect} from 'react';
import base_url from "../service/serviceapi";
import axios from "axios";
import uploadImg from '../images/uploadImg.png'
import {useNavigate} from 'react-router-dom';



const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState(false);
  const [pdfUpload, setPdfUpload] = useState([]);
  const [bgImageUpload, setBgImageUpload] = useState([]);
  const [logoUpload, setLogoUpload] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfName, setPdfName] = useState();
  const [bgImageName, setBgImageName] = useState();
  const [logoName, setLogoName] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      setIsConverting(true);
      navigate("/fileProgress");
      console.log(pdfUpload);
      handleUploadFiles(pdfUpload);
      handleUploadFiles(bgImageUpload);
      handleUploadFiles(logoUpload);
      e.preventDefault();
      setProgress(true);
      const url = `${base_url}/upload`;
      const formData = new FormData();
      for (let i = 0; i < uploadedFiles.length; i++) {
          formData.append("files", uploadedFiles[i]);
      }
      setUploadedFiles([]);
      console.log(uploadedFiles);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
            setProgress(false);
            setIsConverting(false);
            navigate("/");
            window.location.reload(true);
          alert("FlopBook Successfully Created.");
          var preview_url = 'http://localhost/'+ response.data;
          window.open(preview_url);
        } else {
            Promise.reject();
        }
      })
      .catch((err) => { alert("Something went wrong");
      setIsConverting(false); navigate("/"); window.location.reload(true);});
  };

  const handleUploadFiles = (file) => {
    console.log(file);
    console.log(file[0])
    uploadedFiles.push(file[0]);
  };


  const handlePdfChange = (e) => {
      console.log(e.target.files);
      setPdfUpload(Array.prototype.slice.call(e.target.files));
      setPdfName(e.target.files[0].name);
  }
  const handleBgImageChange = (e) => {
      console.log(e.target.files);
      setBgImageUpload(Array.prototype.slice.call(e.target.files));
      setBgImageName(e.target.files[0].name);
  }
  const handleLogoChange = (e) => {
      console.log(e.target.files);
      setLogoUpload(Array.prototype.slice.call(e.target.files));
      setLogoName(e.target.files[0].name);
  }
   return (
       <>
      <form onSubmit={handleSubmit}>
       <div className="box-div" >
          <div className="parent">
            <div className="file-upload">
              <img src={uploadImg} alt="upload" />
              <h3>Upload Pdf</h3>
              <p>Maximun file size 100mb</p>
              <p>{pdfName}</p>
              <input required id = "1" type="file" accept='application/pdf' onChange={handlePdfChange} />
            </div>
          </div>
          <div className="parent">
            <div className="file-upload">
              <img src={uploadImg} alt="upload" />
              <h3>Upload Background Image</h3>
              <p>{bgImageName}</p>
              <p>Supported formats are jpg, jpeg, png, jfif</p>
              <input id = "2" type="file" accept= " .jpg, .jpeg, .png, .jfif" onChange={handleBgImageChange} />
            </div>
          </div>
          <div className="parent">
            <div className="file-upload">
              <img src={uploadImg} alt="upload" />
              <h3>Upload Logo</h3>
              <p>{logoName}</p>
              <p>Supported format <br/>svg</p>
              <input id = "3" type="file" accept= ".svg" onChange={handleLogoChange} />
            </div>
          </div>
       </div>
       <div
          className="upload-button">
        <button type="submit">Upload</button>
        </div>
        </form>
        </>
  );

}


export default FileUpload;