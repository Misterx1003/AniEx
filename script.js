async function fetchPopularAnime() {
  const query = `
    query {
      Page(perPage: 12) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          title {
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  const animeList = data.data.Page.media;

  const container = document.getElementById("anime-list");
  animeList.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.coverImage.large}" alt="${anime.title.romaji}" />
      <h3>${anime.title.romaji}</h3>
    `;
    container.appendChild(card);
  });
}

fetchPopularAnime();
