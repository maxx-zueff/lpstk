import { Manrope, Raleway } from 'next/font/google'

 
export const raleway = Raleway({
  subsets: ['cyrillic'],
  weight: ['300','600','800'],
  display: 'swap'
})

export const manrope = Manrope({
  subsets: ['cyrillic'],
  weight: ['700', '300'],
  display: 'swap'
})