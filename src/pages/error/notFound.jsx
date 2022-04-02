import { setDocumentTitle } from "utilities"

export function NotFound(){
  setDocumentTitle("Not found")
  return(
    <main>
      <h1>Error 404: Not found</h1>
    </main>
  )
}