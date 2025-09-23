export interface Library {
  id: number;
  name: string;
  bookCount?: number;
}

export interface Book {
  id: number;
  book_key: string;
  cover_id: string;
  cover_edition_key: string;
  author_name: string;
  author_key: string;
  title: string;
  description: string;
  first_publish_year: number;
  edition_count: number;
  language: string;
  rating: number;
}

export interface SavedBook {
  id: number;
  library_id: number;
  book_id: number;
}

export interface SaveBookToLibraryParam {
  libraryId: number;
}
