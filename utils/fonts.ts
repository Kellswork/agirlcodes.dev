import { Pacifico, Roboto} from 'next/font/google'


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