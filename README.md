# BookTracker App

A simple Next.js app to manage your favorite books

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:jannomeister/book-tracker-test.git
cd book-tracker-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

Go to [http://localhost:3000](http://localhost:3000)

---

## 🎨 Why TailwindCSS?

- **Utility-first**: Makes it quick to build and iterate on styles without writing custom CSS files.
- **Consistency**: Ensures design consistency across components.
- **Speed**: Great developer experience with class-based styling and IntelliSense support.
- **Ecosystem**: Works smoothly with Next.js and Headless UI.

---

## ❌ Why Not React Query?

- Next.js 15 with **Server Components** already handles most data fetching on the server.
- This removes the need for an extra client-side data fetching library like React Query.
- Keeping the stack lighter means fewer dependencies and less complexity.

---

## ❌ Why Not Zustand?

- Global state management isn’t required in this app.
- The state is mostly **local (UI toggles, popover open/close)**, which React handles well.
- Zustand is great for larger apps, but here it would be **overkill**.

---

## 🚀 Features

- Can search books from OpenLibrary
- Can create a Library
- Can add a book to a library
- View all the books added to a library
- Can remove a library
- Can edit the saved book's information
- Can add a star rating to a book
- Support multiple libraries
- Clean UI

---

## 🛠️ Tech Stack

- **[OpenLibrary](https://openlibrary.org/developers/api)** - API for getting all the books
- **[Next.js](https://nextjs.org/)** – React framework for production
- **[TailwindCSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Headless UI](https://headlessui.dev/)** – Accessible UI components
