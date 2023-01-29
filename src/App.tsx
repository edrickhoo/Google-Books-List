import { useState, useEffect } from "react";
import {
  fetchBooksApiSearch,
  BookType,
  fetchBooksFromIndex,
} from "./api/google-books-api";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Books from "./container/Books-container/Books";

function App() {
  const [booksData, setBooksData] = useState<BookType[]>([]);
  const [error, setError] = useState<string>("");
  const [bookIndex, setBookIndex] = useState<number>(10);
  const [searchInput, setSearchInput] = useState("");
  const [currentSeacrh, setCurrentSearch] = useState<string>("");

  const getRandomTitle = (): string => {
    const titles = [
      "Lord of the rings",
      "Harry Potter",
      "Javascript",
      "React",
      "Twilight",
      "Pokemon",
    ];
    const random = Math.floor(Math.random() * titles.length);
    return titles[random];
  };

  useEffect(() => {
    const randomTitle = getRandomTitle();
    setSearchInput(randomTitle);
    setCurrentSearch(randomTitle);
    fetchBooksApiSearch(randomTitle)
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
      setCurrentSearch(searchInput);
      setError("");
      setBooksData([]);
      const response = await fetchBooksApiSearch(searchInput);

      setBooksData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const fetchMore = async () => {
    let newIndex = bookIndex + 10;
    setBookIndex((prev) => prev + 10);
    const data = await fetchBooksFromIndex(currentSeacrh, newIndex);
    setBooksData([...booksData, ...data]);
  };

  return (
    <div className="App">
      <Header />
      <Books
        error={error}
        fetchWithSearchInput={fetchWithSearchInput}
        booksData={booksData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className={styles.FetchMoreBtnContainer}>
        <button onClick={() => fetchMore()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
