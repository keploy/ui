import React from "react"

interface ErrorProps {
  msg: string
}

export default function ErrorView(props: ErrorProps) {
  return (
    <p>{`Error! ${props.msg}`}</p>
  )
}