"use client";

import { useCreateLibrary } from "@/hooks/useCreateLibrary";
import { useRemoveLibrary } from "@/hooks/useRemoveLibrary";
import { Library } from "@/services/database/db.interface";
import Link from "next/link";
import { useState } from "react";

export default function LibraryList(props: { libraries: Library[] }) {
  const [openCreateLibrary, setOpenCreateLibrary] = useState(false);
  const [newLibraryName, setNewLibraryName] = useState("");
  const { isCreating, create } = useCreateLibrary();
  const { isRemoving, remove } = useRemoveLibrary();

  const handleCreateLibrary = async () => {
    if (!newLibraryName) return;

    await create(newLibraryName);

    setNewLibraryName("");
    setOpenCreateLibrary(false);
    window.location.reload();
  };

  const handleRemoveLibrary = async (libraryId: number) => {
    await remove(libraryId);
    window.location.reload();
  };

  const handleCancel = () => {
    setNewLibraryName("");
    setOpenCreateLibrary(false);
  };

  if (props.libraries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">📚</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No custom libraries yet
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Create your first custom library to organize your books by genre,
          reading goals, or any category you prefer.
        </p>
        <button
          onClick={() => setOpenCreateLibrary(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          + Create Library
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Create Library Form */}
      {openCreateLibrary && (
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-dashed border-indigo-300">
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">📚</div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={handleCancel}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter library name..."
              value={newLibraryName}
              onChange={(e) => setNewLibraryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateLibrary();
                } else if (e.key === "Escape") {
                  handleCancel();
                }
              }}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCreateLibrary}
              disabled={!newLibraryName || isCreating}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Creating..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isCreating}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Library Button */}
      {!openCreateLibrary && (
        <div
          onClick={() => setOpenCreateLibrary(true)}
          className="bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-dashed border-gray-300 hover:border-indigo-400 cursor-pointer group"
        >
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
              ➕
            </div>
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
              Create New Library
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Add a new custom library
            </p>
          </div>
        </div>
      )}

      {props.libraries.map((library) => (
        <div
          key={library.id}
          className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">📚</div>
            <div className="flex space-x-2">
              <button
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                onClick={() => alert("Work in progress")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                disabled={isRemoving}
                onClick={() => handleRemoveLibrary(library.id)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {library.name}
          </h3>

          <p className="text-gray-600 mb-4 text-sm">
            Custom library for organizing your books
          </p>

          <div className="text-sm text-gray-500 mb-4">
            {library.bookCount || 0} books
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/libraries/${library.id}`}
              className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center"
            >
              View Books
            </Link>
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              onClick={() => alert("Work in progress")}
            >
              Manage
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
