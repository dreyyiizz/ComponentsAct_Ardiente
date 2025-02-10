type Achievement = {
  id: number
  title: string
  img: string
  description: string
  category: string
}

export const Achievement: Achievement[] = [
  {
    id: 1,
    title: 'From Highschool',
    img: '/src/assets/img/Achievement1.jpg',
    description:
      'A top Notcher since High School.',
    category: 'Bracelet',
  },
  {
    id: 2,
    title: 'Polythenic',
    img: '/src/assets/img/Achievement2.jpg',
    description: 'I got an award for being a speaker at this school.',
    category: 'Brass Bracelet',
  },
  {
    id: 3,
    title: 'Journalism',
    img: '/src/assets/img/Achievement4.jpg',
    description: 'I won first splace on Sports Writing Journalism English.',
    category: 'Necklace',
  },
  {
    id: 4,
    title: 'College',
    img: '/src/assets/img/Achievement1.jpg',
    description: 'I was a Top Notcher and also achieved lots of awards while serving as a BM.',
    category: 'Bracelet',
  },
]
