export const categorias = []

for (let i = 1; i <= 24; i++) {
  categorias.push({
    id: i,
    imagem: `/Categorias/${i}.png`,
    titulo: `Categoria ${i}`
  })
}