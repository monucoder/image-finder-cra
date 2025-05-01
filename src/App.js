import React, { useState } from "react";
import { createApi } from "unsplash-js";
import "./index.css";

const unsplash = createApi({
  accessKey: "AdywnEi1cHAHxOuOivIY57r6le_lkbhG70ZqPna9Rs0",
});

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [image, setImage] = useState(null);
  const [step, setStep] = useState(1);

  const fetchImage = async (query) => {
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 1,
    });
    const photo = result.response?.results[0];
    setImage(photo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = topic === "Other" ? customTopic : topic;
    fetchImage(query);
    setStep(2);
  };

  const handleReject = () => {
    const query = topic === "Other" ? customTopic : topic;
    fetchImage(query);
  };

  const handleAccept = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {step === 1 && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Image Finder</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select Topic</option>
            <option value="Travel">Travel</option>
            <option value="Cars">Cars</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Technology">Technology</option>
            <option value="Other">Other</option>
          </select>
          {topic === "Other" && (
            <input
              type="text"
              placeholder="Your topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              required
              className="w-full p-2 mb-2 border rounded"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      )}

      {step === 2 && image && (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <img
            src={image.urls.small}
            alt={image.alt_description || "Topic"}
            className="mb-4 rounded"
          />
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleAccept}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Your Selection</h2>
          <img
            src={image.urls.thumb}
            alt={image.alt_description || "Selected"}
            className="mx-auto mb-4 rounded"
          />
          <p className="text-lg">
            {name} {surname}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;