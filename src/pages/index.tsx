import { useEffect } from "react"
import { navigate } from 'gatsby'

export default function Index() {
  useEffect(() => {
    navigate("/testlist")
  }, [])
  return null
}
