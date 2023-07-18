export const COLORS = [
  "#32533d",
  "#25283D",
  "#07BEB8",
  "#eb5e28",
  "#2274A5",
  "#131B23",
  "#507DBC",
  "#A50104",
  "#590004",
  "#250001",
  "#4B543B",
  "#F44174",
  "#4C1E4F",
  "#F7606B",
  "#3772FF",
  "#EF709D",
  "#D1603D",
  "#221D23",
  "#09BC8A",
  "#172A3A",
  "#004346",
  "#111D4A",
  "#F45D01",
]

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}