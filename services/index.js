import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
  query MyQuery {
    publicacionsConnection {
      edges {
        node {
          autor {
            id
            informacion
            nombre
            imagen {
              url
            }
          }
          createdAt
          slug
          titulo
          descripcion
          imagenpublicacion {
            url
          }
          categorias {
            slug
            nombre
          }
        }
      }
    }
  }
 `;

  const result = await request(graphqlAPI, query);

  return result.publicacionsConnection.edges;

}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      publicacion(where: {slug: $slug}) {
        titulo
        descripcion
        imagenpublicacion {
          url
        }
        autor{
          nombre
          informacion
          imagen {
            url
          }
        }
        createdAt
        slug
        contenido {
          raw
        }
        categorias {
          nombre
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.publicacion;
};

export const getRecentPosts = async () => {

  const query = gql`
  query GetPostDetails() {
    publicacions(
      orderBy: createdAt_ASC
      last: 3
      ) {
        titulo
        imagenpublicacion{
          url
        }
        createdAt
        slug
      }
  }
  `
  const result = await request(graphqlAPI, query);

  return result.publicacions;

}

export const getSimilarPosts = async (categorias, slug) => {
  const query = gql`
  query GetPostDetails($slug: String!, $categorias: [String!]){
    publicacions(
      where: {slug_not: $slug, AND: {categorias_some: {slug_in: $categorias}}}
      last: 3
    ) {
      titulo
      imagenpublicacion{
        url
      }
      createdAt
      slug
    }
  }
  `
  const result = await request(graphqlAPI, query, { categorias, slug });

  return result.publicacions;

}

export const getCategories = async () => {
  const query = gql`
  query GetCategories {
    categorias {
      slug
      nombre
    }
  }
  `
  const result = await request(graphqlAPI, query);

  return result.categorias;

}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  });

  return result.json();

}

export const getComments = async (slug) => {
  const query = gql`
  query GetComments($slug: String!) {
    comentarios(where: { publicacion: {slug: $slug}}){
      nombre
      createdAt
      descripcion
    }
  }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comentarios;

}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      publicacions(where: {destacada: true}) {
        autor {
          nombre
          imagen {
            url
          }
        }
        imagenpublicacion {
          url
        }
        titulo
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.publicacions;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      publicacionsConnection(where: {categorias_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            autor {
              informacion
              nombre
              id
              imagen {
                url
              }
            }
            createdAt
            slug
            titulo
            descripcion
            imagenpublicacion {
              url
            }
            categorias {
              nombre
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.publicacionsConnection.edges;
};

