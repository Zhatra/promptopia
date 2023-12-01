/**
 * `components/Feed.jsx`: Define el componente Feed que muestra una lista de prompts y proporciona funcionalidad de búsqueda.
 *
 * Uso del cliente:
 * - Utiliza la directiva `"use client"` para asegurar que se ejecute solo en el lado del cliente.
 *
 * Importaciones:
 * - Hooks `useState` y `useEffect` de React para manejo de estado y efectos secundarios.
 * - Componente `PromptCard` para mostrar individualmente cada prompt.
 *
 * Componente `PromptCardList`:
 * - Presenta una lista de prompts utilizando el componente `PromptCard`.
 * - Recibe `data` y `handleTagClick` como props.
 * - Renderiza cada prompt en un `PromptCard`, pasando propiedades relevantes.
 *
 * Componente `Feed`:
 * - Gestiona el estado de los prompts (`allPosts`) y resultados de búsqueda (`searchedResults`).
 * - Implementa una función de búsqueda con debounce para filtrar prompts.
 * - Utiliza `fetchPosts` para obtener los prompts desde la API al cargar el componente.
 *
 * Funciones:
 * - `fetchPosts`: Obtiene los prompts de `/api/prompt` y actualiza el estado `allPosts`.
 * - `filterPrompts`: Filtra los prompts según el texto de búsqueda en varias propiedades del prompt.
 * - `handleSearchChange`: Maneja el cambio en el campo de búsqueda y filtra los resultados con un retraso (debounce).
 * - `handleTagClick`: Filtra prompts basados en un tag seleccionado.
 *
 * Renderizado:
 * - Campo de búsqueda para filtrar prompts.
 * - Muestra `PromptCardList` con los resultados filtrados si hay texto de búsqueda, de lo contrario muestra todos los prompts.
 *
 * Exportación:
 * - Exporta `Feed` como componente predeterminado.
 */

"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;