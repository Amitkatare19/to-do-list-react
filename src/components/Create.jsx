import { nanoid } from "nanoid";
import { useState } from "react";

const Create = (props) => {
  const tasks = props.tasks;
  const settasks = props.settasks;
  const [title, settitle] = useState("");
  const [filtered, setfiltered] = useState([]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      title: title,
    };
    const updatedTasks = [...tasks, newTask];
    settasks(updatedTasks);
    settitle("");
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const SearchHandler = (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      const filteredTasks = tasks.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      );
      setfiltered(filteredTasks);
    } else {
      setfiltered([]);
    }
  };

  const DeleteHandler = (i) => {
    const copytasks = [...tasks];
    copytasks.splice(i, 1);
    settasks(copytasks);
    localStorage.setItem("tasks", JSON.stringify(copytasks));
  };

  const renderTasks = (filtered.length > 0 ? filtered : tasks).map((t, i) => (
    <li
      className="ml-3 bg-gray-700 bg-opacity-50 rounded-xl p-4 hover:bg-opacity-70 transition-all duration-200 mb-3 justify-between flex"
      key={t.id}
    >
      <span>{t.title}</span>
      <i
        onClick={() => DeleteHandler(i)}
        className="fa-solid fa-trash hover:text-red-300"
      ></i>
    </li>
  ));

  return (
    <form
      onSubmit={SubmitHandler}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-8"
    >
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
        Aao Tasks likho or jao
      </h1>
      <div className="relative">
        <input
          className="w-full bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500 text-gray-100 placeholder-gray-400"
          type="text"
          placeholder="Search"
          onChange={SearchHandler}
        />
        <i className=" fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          className="w-full bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-full pl-6 pr-16 py-3 focus:outline-none focus:border-purple-500 text-gray-100 placeholder-gray-400"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <button className="text-white rounded-full ml-[-36.6px] rounded-s-none p-2.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <ol className="text-gray-100 text-[15px]">{renderTasks}</ol>
    </form>
  );
};

export default Create;
