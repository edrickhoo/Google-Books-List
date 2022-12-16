import { useState, useEffect } from "react";
import { fetchBooksApiSearch, BookType } from "./api/google-books-api";
import "./App.css";
import Header from "./components/Header/Header";
import Books from "./container/Books-container/Books";

function App() {
  const [booksData, setBooksData] = useState<BookType[]>([]);
  const [error, setError] = useState<string>("");

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
        setError("");
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
      setError("");
      setBooksData([]);
      const response = await fetchBooksApiSearch(searchInput);

      setBooksData(response);
    } catch (err: Error) {
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
