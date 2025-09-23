export interface SearchBooksResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: null;
  docs: SearchBooksResult[];
}

export interface SearchBooksResult {
  author_key: string[];
  author_name: string[];
  cover_edition_key?: string;
  cover_i: number;
  ebook_access: EbookAccess;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia?: string[];
  ia_collection_s?: string;
  key: string;
  language: string[];
  lending_edition_s?: string;
  lending_identifier_s?: string;
  public_scan_b: boolean;
  title: string;
  id_standard_ebooks?: string[];
  id_project_gutenberg?: string[];
  id_librivox?: string[];
  subtitle?: string;
  id_wikisource?: string[];
}

export enum EbookAccess {
  Borrowable = "borrowable",
  NoEbook = "no_ebook",
  Printdisabled = "printdisabled",
  Public = "public",
}

export interface BookCoverDetails {
  id: number;
  category_id: number;
  olid: string;
  filename: string;
  author: string;
  ip: string;
  source_url: string;
  source: null;
  isbn: null;
  created: Date;
  last_modified: Date;
  archived: boolean;
  failed: boolean;
  width: number;
  height: number;
  filename_s: string;
  filename_m: string;
  filename_l: string;
  isbn13: null;
  uploaded: boolean;
  deleted: boolean;
  filename_old: null;
}
