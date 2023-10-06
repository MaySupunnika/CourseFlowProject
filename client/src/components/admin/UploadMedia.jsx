import React, { useEffect } from "react";
import deleteIcon from "../../assets/addCourse/deleteIcon.png";
import useDataCenter from "../../context/DataCenter";
import plusIcon from "../../assets/addCourse/plus.png";

function UploadMedia() {
  const {
    imageServerUrl,
    imagePreview,
    setImagePreview,
    videoPreview,
    setVideoPreview,
    videoType,
    handleImagePreview,
    handleVideoPreview,
    coverImageError,
    setCoverImageError,
    videoTrailerError,
    setVideoTrailerError,
    handleClearVideoClick,
    handleClearImageClick,
    videoTrailerServerUrl,
    setSelectedImage,
    setSelectedVideoTrailer,  
  } = useDataCenter();

  useEffect(() => {
    if(imageServerUrl){
      setImagePreview(imageServerUrl);
    }
    if(videoTrailerServerUrl){
      setVideoPreview(videoTrailerServerUrl);
    }
  }, [videoTrailerServerUrl, imageServerUrl]);

  return (
    <>
      <div className="w-[240px] h-[272px] mt-[40px]">
        <label htmlFor="coverImage">Cover image *</label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          accept="image/*"
          onChange={(e) => {
            setCoverImageError(false);
            const maxSize = 5 * 1024 * 1024;
            const selectedFile = e.currentTarget.files[0];
            const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (
              selectedFile &&
              selectedFile.size <= maxSize &&
              allowedImageTypes.includes(selectedFile.type)
            ) {
              setSelectedImage(selectedFile);
            } else {
              setCoverImageError(true);
            }
            handleImagePreview(e);
          }}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => document.getElementById("coverImage").click()}
        >
          {!imagePreview && (
            <div className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2">
              <div className="w-[93px] h-[53px] text-blue-400 flex flex-col justify-center items-center space-y-3">
                <img src={plusIcon} />
                <div className="text-[14px]">Upload Image</div>
              </div>
            </div>
          )}

          {imagePreview && (
            <div
              onClick={handleClearImageClick}
              className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2 relative"
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-[240px] h-[240px] rounded-xl"
              />
              <div
                type="button"
                className="absolute top-0 right-0"
              >
                <img src={deleteIcon} alt="Remove Icon" />
              </div>
            </div>
          )}
        </button>
      </div>
      {coverImageError && (
        <div className="text-purple-500 mt-4">
          Image is required & Maximum size is 5MB & Only JPEG, PNG & JPG
        </div>
      )}

      <div className="w-[240px] h-[272px] mt-[60px]">
        <label htmlFor="videoTrailer">Video Trailer *</label>
        <input
          type="file"
          id="videoTrailer"
          name="videoTrailer"
          accept=".mp4,.avi,.mov"
          onChange={(e) => {
            setVideoTrailerError(false);
            const maxSize = 20 * 1024 * 1024;
            const selectedFile = e.currentTarget.files[0];
            const allowedVideoTypes = ["video/mp4", "video/avi", "video/mov"];
            if (
              selectedFile &&
              selectedFile.size <= maxSize &&
              allowedVideoTypes.includes(selectedFile.type)
            ) {
              setSelectedVideoTrailer(selectedFile);
            } else {
              setVideoTrailerError(true);
            }
            handleVideoPreview(e);
          }}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => document.getElementById("videoTrailer").click()}
        >
          {!videoPreview && (
            <div className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2">
              <div className="w-[93px] h-[53px] text-blue-400 flex flex-col justify-center items-center space-y-3">
                <img src={plusIcon} />
                <div className="text-[14px]">Upload Video</div>
              </div>
            </div>
          )}

          {videoPreview && (
            <div
              onClick={handleClearVideoClick}
              className="w-[240px] h-[240px] bg-gray-100 flex justify-center items-center rounded-xl mt-2 relative"
            >
              <video controls className="w-full h-full object-cover rounded-xl">
                <source src={videoPreview} type={videoType} />
              </video>
              <div
                type="button"
                className="absolute top-0 right-0"
              >
                <img src={deleteIcon} alt="Remove Icon" />
              </div>
            </div>
          )}
        </button>
      </div>
      {videoTrailerError && (
        <div className="text-purple-500 mt-4">
          Video is required & Maximum size is 20MB & Only MP4, MOV & AVI
        </div>
      )}
      <div className="mb-[200px]"></div>
    </>
  );
}

export default UploadMedia;
