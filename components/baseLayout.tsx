import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[];
  spacing?: string

}

const BaseLayout = ({children, spacing}: Props) => {
  return (
    <div className={`max-w-5xl my-0 mx-auto ${spacing|| ''}`} >{children}</div>
  )
}

export default BaseLayout

// set the max-width of the base layout to 1024px, that is what I will be using to wrap all other content