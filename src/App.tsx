import { useState, useEffect } from "react";
import { fetchBooksApiSearch, bookType } from "./api/google-books-api";
import "./App.css";
import Header from "./components/Header/Header";

import Books from "./container/Books-container/Books";

function App() {
  const [booksData, setBooksData] = useState<bookType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRandomTitle = (): string => {
    const titles = [
      "Lord of the rings",
      "Harry Potter",
      "Javascript",
      "React",
      "twilight",
    ];
    const random = Math.floor(Math.random() * titles.length);
    return titles[random];
  };

  useEffect(() => {
    fetchBooksApiSearch(getRandomTitle())
      .then((data) => {
        setError(null);
        setBooksData(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const fetchWithSearchInput = async (
    searchInput: string,
    e: React.SyntheticEvent
  ) => {
    try {
      e.preventDefault();
      setError(null);
      setBooksData(null);
      const response = await fetchBooksApiSearch(searchInput);

      setBooksData(response);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <Header />
      <Books
        error={error}
        fetchWithSearchInput={fetchWithSearchInput}
        booksData={booksData}
      />
    </div>
  );
}

export default App;
