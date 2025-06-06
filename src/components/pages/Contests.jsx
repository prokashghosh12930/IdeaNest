import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';

const Contests = () => {
  const [uploadedImages, setUploadedImages] = useState({});
  const [currentContests, setCurrentContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/api/get_contests.php')
      .then(res => {
        setCurrentContests(res.data.current || []);
        setUpcomingContests(res.data.upcoming || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load contests.');
        setLoading(false);
      });
  }, []);

  const handleImageUpload = async (contestId, file) => {
    const userId = localStorage.getItem('user_id');
    console.log("User ID - ", userId);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('contest_id', contestId);
    if (userId) formData.append('user_id', userId);

    try {
      console.log("Api call- ", formData.get('user_id'));
      const response = await fetch('http://localhost/api/upload_submission.php', {
        method: 'POST',
        body: formData
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('Upload API did not return valid JSON:', text);
        alert('Image upload failed: Invalid server response.');
        return;
      }
      console.log("data - ", data);
      if (data.success) {
        setUploadedImages((prev) => ({
          ...prev,
          [contestId]: file,
        }));
      } else {
        alert(data.error || 'Image upload failed.');
      }
    } catch (err) {
      console.log("Error uploading image:", err);
      alert('Image upload failed.');
    }
  };

  const ContestCard = ({ contest, isCurrent }) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 w-full md:w-80 border border-[#e6e6f0] flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
      <img
        src={contest.image}
        alt={contest.title}
        className="h-32 w-32 object-cover rounded-xl mb-4 border border-[#e6e6f0]"
      />
      <h3 className="text-xl font-bold mb-2 text-[#4417de] text-center">{contest.title}</h3>
      <p className="text-gray-600 mb-3 text-center">{contest.description}</p>
      {isCurrent ? (
        <>
          <p className="text-sm text-[#5f30e2] mb-3">Deadline: {contest.deadline}</p>
          {uploadedImages[contest.id] ? (
            <div className="text-green-600 text-sm font-medium">Image uploaded!</div>
          ) : (
            <label className="block w-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(contest.id, e.target.files[0])}
                disabled={!!uploadedImages[contest.id]}
              />
              <button
                className={`w-full px-4 py-2 rounded-lg text-white font-semibold mt-2 transition-colors ${uploadedImages[contest.id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5f30e2] hover:bg-[#4417de]'}`}
                disabled={!!uploadedImages[contest.id]}
                onClick={e => {
                  if (!uploadedImages[contest.id]) e.target.previousSibling.click();
                }}
              >
                {uploadedImages[contest.id] ? 'Uploaded' : 'Upload Image'}
              </button>
            </label>
          )}
        </>
      ) : (
        <p className="text-sm text-[#6c6d95]">Starts: {contest.start}</p>
      )}
    </div>
  );

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#02044a]">Contests</h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Participate in our latest photo contests. You can upload only one image per contest.
        </p>
        {loading ? (
          <div className="text-center text-lg text-[#5f30e2]">Loading contests...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <section className="mb-12 bg-[#f9f9fb] rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-[#5f30e2]">Current Running Contests</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {currentContests.length === 0 ? (
                  <div className="text-gray-500">No current contests.</div>
                ) : (
                  currentContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} isCurrent={true} />
                  ))
                )}
              </div>
            </section>

            <section className="bg-[#f9f9fb] rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-[#5f30e2]">Upcoming Contests</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {upcomingContests.length === 0 ? (
                  <div className="text-gray-500">No upcoming contests.</div>
                ) : (
                  upcomingContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} isCurrent={false} />
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Contests;
