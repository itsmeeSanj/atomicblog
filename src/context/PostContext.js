import { faker } from "@faker-js/faker";
import React, { createContext, useCallback, useContext, useState } from "react";

const PostContextCreate = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function PostContext({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;
  const handleAddPost = useCallback(function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }, []);

  function handleClearPosts() {
    setPosts([]);
  }
  return (
    <PostContextCreate.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
      }}
    >
      {children}
    </PostContextCreate.Provider>
  );
}

function useContextData() {
  const value = useContext(PostContextCreate);

  if (value === undefined)
    throw new Error("Post contex was used outside of the citiesProvider");

  return value;
}

export { PostContext, useContextData };
