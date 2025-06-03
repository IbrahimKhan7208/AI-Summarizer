import React from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { FaBolt } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { LuTextSearch } from "react-icons/lu";
import { LuNotebookText } from "react-icons/lu";
import '@fontsource/bebas-neue';
import { useState } from "react";
import Markdown from "react-markdown";
import axios from "axios";

const App = () => {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [summary, setSummary] = useState(``);
  const [loading, setLoading] = useState(false);

  const summaryHandler = async () => {
    setLoading(true);
    if (text.length == 0 && link.length != 0){
      let linkRes = await axios.post("http://localhost:3000/ai/link-response", {link});
      setSummary(linkRes.data);
    }
    else if(text.length != 0 && link.length == 0){
      let textRes = await axios.post("http://localhost:3000/ai/text-response", {text});
      setSummary(textRes.data);
    }
    else{
      setSummary("Please provide either a link or text - just one at a time.")
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full bg-zinc-100 p-4 flex gap-3">
      <div className="left h-full w-1/2">
        <div className="title text-5xl tracking-tighter font-semibold flex gap-1 items-center text-zinc-600">
          <LuBrainCircuit />
          BrieflyAI
        </div>

        <div className="mt-10 h-fit w-full p-4 rounded-xl bg-zinc-200 ">
          <p className="font-semibold tracking-tight flex gap-1 items-center">
            <FaLink /> Paste Link (YouTube or Article)
          </p>
          <input
            value={link}
            onChange={(e)=> setLink(e.target.value)}
            type="url"
            name="link"
            id="link"
            placeholder="e.g., https://www.youtube.com/watch?v=example"
            className="link w-full border-1 rounded-2xl mt-2 p-3 bg-zinc-100"
          />
        </div>

        <div className="mt-3 text-2xl font-semibold flex justify-center">
          OR
        </div>

        <div className="mt-3 h-fit w-full p-4 rounded-xl bg-zinc-200 ">
          <p className="font-semibold tracking-tight flex gap-1 items-center">
            <LuTextSearch />
            Paste Transcript or Article Text
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="text"
            id="text"
            rows="9"
            placeholder="Paste your text here..."
            className="border-1 w-full p-3 mt-2 rounded-lg bg-zinc-100 overflow-auto"
          ></textarea>
        </div>

        <button
          onClick={summaryHandler}
          className="mt-5 p-3 bg-zinc-500 hover:bg-zinc-600 hover:text-zinc-300 duration-300  text-zinc-100 rounded-2xl font-semibold text-xl border-zinc-900 border-1 flex m-auto w-1/2 justify-center items-center gap-1 cursor-pointer"
        >
          <FaBolt />
          Summarize
        </button>
      </div>

      <div className="right h-full w-1/2">
        <div className="mt-1 h-fit w-full p-4 rounded-xl bg-zinc-200 ">
          <p className="font-semibold tracking-tight text-2xl flex gap-1 items-center">
            <LuNotebookText />
            Summary
          </p>

          <div className="output h-150 w-full border-1 mt-2 rounded-xl bg-zinc-100 p-3 text-lg overflow-auto whitespace-pre-wrap leading-5">
            {summary.length == 0 ? (
              <div>
                {loading ? (
                  <p className="text-zinc-500 text-center animate-pulse text-md">
                    Analyzing...
                  </p>
                ) : (
                  <p className="text-zinc-500">
                    Your summary will appear here...
                  </p>
                )}
              </div>
            ) : (
              <div>
                {loading ? (
                  <p className="text-zinc-500 text-center animate-pulse text-md">
                    Analyzing...
                  </p>
                ) : (
                  <Markdown>{summary}</Markdown>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
