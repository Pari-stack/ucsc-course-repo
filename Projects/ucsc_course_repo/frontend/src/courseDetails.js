import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch(`http://localhost:3002/courses/${id}/upload`, {
        method: 'POST',
        body: formData,
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Course Details</h2>
      <p>Upload files for course ID: {id}</p>
      <form onSubmit={handleUpload}>
        <label>
          <input type="file" onChange={handleFileChange} required />
        </label>
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default CourseDetails;
