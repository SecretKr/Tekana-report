import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';

export default function ImageUpload({setImage}) {
  const [images, setImages] = React.useState([])

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
  }

  useEffect(() => {
    if(images.length) {
      const sImage = new Image()
      sImage.src = images[0]['data_url']//"https://thiscatdoesnotexist.com/"
      sImage.onload = () => setImage(sImage)
    }
  })

  return (
    <div className="App">
      <ImageUploading multiplen value={images} onChange={onChange} maxNumber={1} dataURLKey="data_url">
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
              <p>Upload</p>
              <p>Image</p>
            </button>
            <button onClick={onImageRemoveAll}><p>Remove</p><p>Image</p></button>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

