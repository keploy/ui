import { useEffect } from "react"
import { navigate } from 'gatsby'
import '../css/main.css'

export default function Index() {
  useEffect(() => {
    navigate("/testlist")
  }, [])
  return null
}
