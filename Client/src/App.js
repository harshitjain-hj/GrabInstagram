import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { fetchData } from "./api/fetchData";
import { saveData } from "./api/saveData";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [feed, setFeed] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchData(query);

      setFeed(data);
      setQuery("");
    }
  };

  const save = async (e) => {
    if (feed.video_link) {
      saveData(feed.video_link, "file.mp4");
    } else {
      saveData(feed.image_link, "file.jpg");
    }
  };

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-md-6 align-self-center">
          <div className="d-flex">
            <input
              type="url"
              id="keyword"
              className="flex-grow-1"
              placeholder="www.ig.com/reel/CJ-XlGRpgcP/"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
          </div>
          {feed.url && (
            <div>
              <div className="card bg-transparent rounded-0 my-3">
                <h5 className="">Download Feed :</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <span>
                      URL : &nbsp;
                      <a href={feed.url} target="_blank">
                        {feed.url}
                      </a>
                    </span>
                  </li>
                </ul>
                <button
                  for="file"
                  id="selector"
                  // href={feed.video_link}
                  onClick={save}
                >
                  Download : <span>{feed.file}</span>
                </button>
              </div>
              <div className="card bg-transparent rounded-0 my-3">
                <h5 className="">Others :</h5>

                <ul className="list-unstyled mb-0 text-monospace">
                  <li>
                    <span className="text-warning">Title - </span>
                    {feed.title}
                  </li>
                  <li>
                    <span className="text-warning">Description - </span>
                    {feed.description}
                  </li>
                  <li>
                    {" "}
                    <span className="text-warning">Feed - </span>
                    {feed.type}
                  </li>
                  <li>
                    {" "}
                    <span className="text-warning">Video Type - </span>
                    {feed.video_type}
                  </li>
                  <li>
                    <span className="text-warning">Dimensions - </span>
                    {feed.video_width + " X " + feed.video_height}
                  </li>
                  <li>
                    <span className="text-warning">Hastags Used - </span>
                    {feed.tags.map((el) => "#" + el).join(" ")}
                  </li>
                  {/* <li id="wordCount">fdg</li> */}
                  {/* <li id="charCount"></li> */}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6 align-self-center">
          <div className="card bg-transparent rounded-0 my-md-5 mt-3">
            <h3 id="fileName">Insta Feed</h3>
            <div className="card-body p-0 mb-4">
              {feed.image_link || feed.video_link ? (
                [
                  feed.video_link ? (
                    <video
                      autoPlay
                      src={feed.video_link}
                      className="rounded mx-auto d-block w-75"
                    ></video>
                  ) : (
                    <img
                      src={feed.image_link}
                      className="img-fluid rounded mx-auto d-block"
                      alt="Sorry not able to access"
                    />
                  ),
                ]
              ) : (
                <div className="displayBox scroll-box" id="fileContent">
                  Paste the url of instagram feed to view and download.
                </div>
              )}
            </div>
            {/* <div className="card-footer text-muted">
              <a href="https://github.com/harshitjain-hj" target="_blank">
                If you ❤️ it, do leave a ⭐.
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
