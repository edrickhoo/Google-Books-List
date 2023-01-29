const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export interface BookType {
  img: string;
  author: [];
  description: string;
  title: string;
  publishedDate: string;
  languages: string;
  rating: string;
  ratingCount: string;
  shortDescription: string;
  pageCount: string;
}

export const fetchBooksApiSearch = async (
  searchInput: string
): Promise<BookType[]> => {
  if (searchInput === "") {
    throw new Error(`Please enter a title in search input.`);
  }

  const response = await fetch(`${BASE_URL}${searchInput}`);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!data.items) {
    throw new Error(
      `Sorry, no books were found searching with "${searchInput}"`
    );
  }

  const organisedData = data.items.map((item: any) => {
    const descCopy = item.volumeInfo.description ?? item.volumeInfo.description;

    let shortDescription = descCopy;
    // Checking if description is more than 25 words long if so get 21 words and add "..."
    if (descCopy && descCopy.split(" ").length > 25) {
      shortDescription = descCopy?.split(" ").slice(0, 21).join(" ") + "...";
    }

    const author = item.volumeInfo.authors;
    const authorData =
      Array.isArray(author) && author?.length > 1
        ? `Authors: ${author.join(", ")}`
        : `Author: ${author}`;

    return {
      img:
        item.volumeInfo?.imageLinks?.thumbnail ||
        "https://hazlitt.net/sites/default/files/default-book.png",
      author: authorData || "No authors avaliable",
      description: item.volumeInfo.description || "No description avaliable",
      shortDescription: shortDescription || "No description avaliable",
      title: item.volumeInfo.title,
      publishedDate: item.volumeInfo.publishedDate,
      pageCount: item.volumeInfo.pageCount,
      languages: item.volumeInfo.language,
      rating: item.volumeInfo.averageRating,
      ratingCount: item.volumeInfo.ratingsCount,
    };
  });

  return organisedData;
};

export const fetchBooksFromIndex = async (
  searchInput: string,
  idx: number
): Promise<BookType[]> => {
  if (searchInput === "") {
    throw new Error(`Please enter a title in search input.`);
  }

  const response = await fetch(`${BASE_URL}${searchInput}&startIndex=${idx}`);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!data.items) {
    throw new Error(
      `Sorry, no books were found searching with "${searchInput}"`
    );
  }

  const organisedData = data.items.map((item: any) => {
    const descCopy = item.volumeInfo.description ?? item.volumeInfo.description;

    let shortDescription = descCopy;
    // Checking if description is more than 25 words long if so get 21 words and add "..."
    if (descCopy && descCopy.split(" ").length > 25) {
      shortDescription = descCopy?.split(" ").slice(0, 21).join(" ") + "...";
    }

    const author = item.volumeInfo.authors;
    const authorData =
      Array.isArray(author) && author?.length > 1
        ? `Authors: ${author.join(", ")}`
        : `Author: ${author}`;

    return {
      img:
        item.volumeInfo?.imageLinks?.thumbnail ||
        "https://hazlitt.net/sites/default/files/default-book.png",
      author: authorData || "No authors avaliable",
      description: item.volumeInfo.description || "No description avaliable",
      shortDescription: shortDescription || "No description avaliable",
      title: item.volumeInfo.title,
      publishedDate: item.volumeInfo.publishedDate,
      pageCount: item.volumeInfo.pageCount,
      languages: item.volumeInfo.language,
      rating: item.volumeInfo.averageRating,
      ratingCount: item.volumeInfo.ratingsCount,
    };
  });

  return organisedData;
};
