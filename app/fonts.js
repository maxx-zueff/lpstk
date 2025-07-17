import { Manrope, Raleway } from 'next/font/google'
 
export const raleway = Raleway({
  subsets: ['cyrillic'],
  weight: ['300', '500', '600','800'],
  display: 'swap',
  variable: '--font-raleway',
})

export const manrope = Manrope({
  subsets: ['cyrillic'],
  weight: ['700', '600', '300'],
  display: 'swap',
  variable: '--font-manrope'
})