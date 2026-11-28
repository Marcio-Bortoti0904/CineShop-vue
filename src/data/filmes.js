const catalogo = [
    {
      id: 1,
      nome: 'Mestres do Universo',
      imagem: '/filmes/HE-MAN.png',
      lancamento: '2026',
      tipo: 'filme',
      genero: ['Ação', 'Comédia', 'Aventura', 'Fantasia', 'Ficção científica', 'Super-herói']
    },

    {
      id: 2,
      nome: 'Homem-Aranha: Um Novo Dia',
      imagem: '/filmes/Homem-aranha4.jpg',
      lancamento: '2026',
      tipo: 'filme',
      genero: ['Ação', 'Super-herói']
    },

    {
      id: 3,
      nome: 'Mad-Max: Estrada da Fúria',
      imagem: '/filmes/MADMAX-FR.jpg',
      lancamento: '2015',
      genero: ['Ação', 'Distopia', 'Aventura', 'Ficção Científica', 'Ficção pós-apocalíptica', 'Fantasia', 'Drama', 'Suspense'],
      tipo: 'filme'
    },

    {
      id: 4,
      nome: 'O Fim da Rua',
      imagem: '/filmes/o-fim-da-rua.png',
      lancamento: '2026',
      tipo: 'filme',
      genero: ['Terror', 'Ação']
    },

    {
      id: 5,
      nome: 'Street Fighter',
      lancamento: '2026',
      tipo: 'filme',
      imagem: '/filmes/Street_Fighter_2026.jpeg',
      genero: ['Ação', 'Comédia', 'Artes Marciais']
    }, 

    {
      id: 6,
      nome: 'A Terceira Guerra Mundial',
      imagem: '/filmes/3guerra.png',
      lancamento: '2026',
      tipo: 'filme',
      genero: ['Guerra','Paródia', 'Ação', 'Thriller Político'],
    },

    {
      id: 7,
      nome: 'Como Mágica',
      imagem: '/filmes/como-magica-2026.webp',
      lancamento: '2026',
      tipo: 'filme',
      genero: ['Infantil', 'Fantasia', 'Animação']
    },

    {
      id: 8,
      imagem: '/filmes/Spider-Noir.webp',
      lancamento: '2026',
      tipo: 'serie',
      genero: ['Super-heroi', 'Noir', 'Ação', 'Crime']
    },

    {
      id: 9,
      imagem: '/filmes/The_Boys.jpg',
      tipo: 'serie'
    },

    {
      id: 10,
      imagem: '/filmes/Wall-e.jpg',
      lancamento: '2008'
    },

    {
      id: 11,
      imagem: '/filmes/DK.jpg',
      genero: ['Ação', 'Mistério', 'Crime', 'Suspense'],
      tipo: 'filme',
    },

    {
      id: 12,
      imagem: '/filmes/incriveis.jpg',
      tipo: 'filme',
    },

    {
      id: 13,
      imagem: '/filmes/troia.jpeg',
      lancamento: '2004',
      tipo: 'filme'
    },

    {
      id: 14,
      imagem: '/filmes/BATMAN22.jpg',
      genero: ['Ação', 'Mistério', 'Crime'],
      tipo: 'filme'
    },

    {
      id: 15,
      imagem: '/filmes/Queda_espada.png',
      tipo: 'filme',
      genero: ['Ação'],
      lancamento: '2026'
    },

    {
      id: 16,
      imagem: '/filmes/Iron_Man_poster.jpg',
      tipo: 'filme',
      genero: ['Ação', 'Ficção Científica']
    },

    {
      id: 17,
      nome: 'Sonic - O filme',
      imagem: '/filmes/sonic1.jpg',
      tipo: 'filme',
      genero: ['Ação', 'Aventura', 'Comédia', 'Ficção Científica', 'Família', 'Infantil']
    },

    {
      id: 18,
      nome: 'Superman 1',
      imagem: '/filmes/Superman1(CR).jpg',
      tipo: 'filme',
      genero: ['Ação', 'Aventura', 'Ficção Científica', 'Família']
    },

    {
      id: 19,
      nome: 'Mandaloriano',
      imagem: '/filmes/mandaloriano-serie.jpg',
      tipo: 'serie',
      genero: ['Ficção Científica', 'Ação']
    },

    {
      id: 20,
      nome: 'Star Wars - Uma Nova Esperança',
      imagem: '/filmes/StarWars-ep4.jpg',
      tipo: 'filme',
      genero: ['Ação', 'Aventura', 'Ficção científica']
    },

    {
      id: 21,
      nome: 'Demolidor Renascido',
      imagem: '/filmes/Demolidor_-_Renascido.png',
      tipo: 'serie',
      lancamento: ['2025', '2026']
    },

    {
      id: 22,
      nome: 'X-Men 97',
      imagem: '/filmes/X-Men97.png',
      tipo: 'serie',
      lancamento: ['2024', '2026']
    },

    {
      id: 23,
      nome: 'Invencivel',
      imagem: '/filmes/invencivel-serie.png',
      tipo: 'serie',
      lancamento: '2026',
    },

    {
      id: 24,
      nome: 'Cavaleiro da Lua',
      imagem: '/filmes/cavaleiro-lua.jpg',
      tipo: 'serie'
    },

    {
      id: 25, 
      nome: 'Sombra do Esquecimento',
      imagem: '/filmes/Sombra_Esquecida.png',
      tipo: 'filme',
      genero: ['Terror', 'Mistério']
    },

    {
      id: 26,
      nome: 'Areias do Eterno',
      imagem: '/filmes/Areias_eterno.png',
      tipo: 'filme',
      genero: ['Aventura', 'Terror'],
      lancamento: '2026',
    },

    {
      id: 27,
      nome: 'Matrix',
      imagem: '/filmes/Matrix.png',
      tipo: 'filme',
      genero: ['Ficção científica', 'Ação']
    },

    {
      id: 28,
      nome: 'Michael',
      imagem: '/filmes/Michael.jpg',
      tipo: 'filme',
      lancamento: '2026',
      genero: ['Documentário', 'Musical']
    },

    {
      id: 29,
      nome: 'Devorador de Estrelas',
      imagem: '/filmes/devorador_estrelas.png',
      tipo: 'filme',
      lancamento: '2026',
      genero: ['Ficção Científica']
    },

    {
      id: 30,
      nome: 'Super Mario Galaxy',
      imagem: '/filmes/Mario2.png',
      tipo: 'filme',
      lancamento: '2026',
      genero: ['Infantil', 'Animação']
    },
    
    {
      id: 31,
      nome: 'O Máskara',
      imagem: '/filmes/Themaask.jpg',
      tipo: 'filme',
      genero: ['Comédia']
    },

    {
      id: 32,
      nome: 'Superman(2025)',
      imagem: '/filmes/superman2025.png',
      genero: ['Ficção Científica', 'Ação'],
      tipo: 'filme',
      lancamento: '2025'
    },

    {
      id: 33,
      nome: 'Senhor dos Anéis - A Sociedade do Anel',
      imagem: '/filmes/senhor_aneis_1.png',
      genero: ['Fantasia', 'Ação', 'Aventura'],
      tipo: 'filme',
      lancamento: '2025'
    },

    {
      id: 34,
      nome: 'Shin Godzilla',
      imagem: '/filmes/Shin_Godzilla.png',
      genero: ['Ficção Científica', 'Ação', 'Drama', 'Terror'],
      tipo: 'filme',
      lancamento: '2016'
    },

    {
      id: 35,
      nome: 'Jujutsu',
      imagem: '/filmes/jujutsu.jpeg',
      genero: ['Ficção Científica', 'Ação', 'Anime'],
      tipo: 'filme',
      lancamento: ['2020', '2023']
    },

    {
      id: 36,
      nome: 'Entre o destino e você',
      imagem: '/filmes/Entre-destino.png',
      genero: ['Romance'],
      tipo: 'filme',
      lancamento: '2026'
    },

    {
      id: 37,
      nome: 'Dragon-Ball - A Batalha dos deuses',
      genero: ['Anime', 'Ação','Infantil'],
      tipo: 'filme',
      imagem: '/filmes/Dragonball-bs.png'
    },

    {
      id: 38,
      nome: 'Vingadores - Doomsday',
      genero: ['Ação', 'Filme Marvel', 'Épicos'],
      tipo: 'filme',
      imagem: '/filmes/avengers_doomsday.png',
      lancamento: '2026',
    },

    {
      id: 39,
      nome: 'Thunderbolts*',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Thunderbolts_2025_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      lancamento: '2025',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO4OLz1tpZJ0qnJGC1kubDnN5-lXvEJHol1EEtGIX0aDiqldyqu2vHMM&s=10',
      tipo: 'filme',
      genero: ['Ação', 'Super-herói', 'Aventura'],
      archiveId: 'thunderbolts_202611',
    },

    {
      id: 40,
      nome: 'Angry Birds',
      tipo: 'filme',
      lancamento: '2016',
      diretor: 'Clay Kaytis, Fergal Reilly',
      sinopse: 'O estressado Red, o volátil Bomba e o veloz Chuck são três pássaros que não conseguem se encaixar na ilha em que vivem, pois ela é habitada por alegres e pacíficas aves. Mas, quando o local é invadido por misteriosos porquinhos verdes, esses três improváveis heróis precisam descobrir o que estes inesperados visitantes estão tramando.',
      imagem: 'https://br.web.img3.acsta.net/r_1280_720/pictures/16/04/27/19/27/443743.jpg',
      logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/The_Angry_Birds_Movie.svg/3840px-The_Angry_Birds_Movie.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail',
      archiveId: 'angry-birds_20261127',
      genero: ['Ação', 'Super-herói', 'Aventura'],
    }
]

export const filmes = catalogo.map((filme) => {

  return {
    ...filme,

    // Padroniza o título.
    titulo: filme.nome || 'Título não informado',

    // Padroniza o ano de lançamento.
    ano: Array.isArray(filme.lancamento)
      ? filme.lancamento.join(' – ')
      : filme.lancamento || 'Não informado',

    // Informações complementares.
    sinopse: filme.sinopse || 'Sinopse ainda não cadastrada.',

    duracao: filme.duracao || 'Não informada',

    diretor: filme.diretor || 'Não informado',

    // Identificação no Internet Archive.
    archiveId: filme.archiveId || null,

    // Disponibilidade para reprodução.
    disponivel: Boolean(
      filme.archiveId
    )
  }
})
