import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const [posts, setPosts] = useState([]);  // Estado para los posts
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando
  const [error, setError] = useState(null); // Estado para manejar posibles errores

  useEffect(() => {
    axios
      .get("http://localhost:1337/articles") // Asegúrate de que esta URL sea la correcta
      .then((response) => {
        const data = response?.data || []; // Asegúrate de que recibes la estructura correcta
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Hubo un error al cargar los artículos.");
      })
      .finally(() => {
        setLoading(false); // Deja de cargar una vez que los datos se obtienen
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mensaje mientras cargamos
  }

  if (error) {
    return <div>{error}</div>; // Mensaje si hubo un error
  }

  return (
    <div>
      <h1>Mi Blog</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            <h2>{post.Titulo}</h2>
             {post.Portada && post.Portada.url && (
                
              <img
                src={`http://localhost:1337${post.Portada.url}`}
                alt={post.Titulo}
                style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              />
            )}
            <p>{post.Contenido}</p>
           
          </div>
        ))
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </div>
  );
}
