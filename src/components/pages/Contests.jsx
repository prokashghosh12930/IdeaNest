import React, { useState } from 'react';
import Footer from './Footer';

const Contests = () => {
  const [uploadedImages, setUploadedImages] = useState({});

  const handleImageUpload = (contestId, file) => {
    setUploadedImages((prev) => ({
      ...prev,
      [contestId]: file,
    }));
  };

  const currentContests = [
    {
      id: 'current1',
      title: 'Spring Click Contest',
      description: 'Upload your best spring-themed photo.',
      image: require('../../assets/images/nature.jpg'),
      deadline: 'May 30, 2025',
    },
    {
      id: 'current2',
      title: 'Nature Wonders',
      description: 'Show the beauty of nature in a single image.',
      image: require('../../assets/images/mountain.jpg'),
      deadline: 'June 10, 2025',
    },
  ];

  const upcomingContests = [
    {
      id: 'upcoming1',
      title: 'Urban Vibes',
      description: 'Capture the life and vibe of your city.',
      image: require('../../assets/images/planet.png'),
      start: 'June 15, 2025',
    },
    {
      id: 'upcoming2',
      title: 'Pet Moments',
      description: 'Cute, funny, or majestic – show off your pet!',
      image: require('../../assets/images/art.jpg'),
      start: 'July 1, 2025',
    },
    {
      id: 'upcoming3',
      title: 'Monochrome Magic',
      description: 'Everything looks cooler in black and white.',
      image: require('../../assets/images/sky.jpg'),
      start: 'July 20, 2025',
    },
    {
      id: 'upcoming4',
      title: 'Foodie Delight',
      description: 'Present your favorite dish with style.',
      image: require('../../assets/images/space.jpg'),
      start: 'August 5, 2025',
    },
  ];

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

        <section className="mb-12 bg-[#f9f9fb] rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-[#5f30e2]">Current Running Contests</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {currentContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} isCurrent={true} />
            ))}
          </div>
        </section>

        <section className="bg-[#f9f9fb] rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-[#5f30e2]">Upcoming Contests</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {upcomingContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} isCurrent={false} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contests;
