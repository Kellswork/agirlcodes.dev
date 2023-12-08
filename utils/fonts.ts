import { Pacifico, Roboto, Space_Mono} from 'next/font/google'


export const pacifico = Pacifico({
  variable: '--font-pacifico',
  weight: '400',
  subsets: ['latin']
})

export const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const spaceMono = Space_Mono({
  variable: '--font-spaceMono',
  weight: ['400',  '700'],
  subsets: ['latin'],
})