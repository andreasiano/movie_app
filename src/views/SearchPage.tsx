import { useLocation } from "react-router-dom"

export default function SearchPage() {
  const location = useLocation()
  console.log('location', location)
  return (
    <div>
      SearchPage
    </div>
  )
}


