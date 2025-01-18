export function HoverDifficulty({lang, ref, isOpen = false}){
  return(
    <>
      {isOpen &&
        <ul id="hover-difficulty" ref={ref}>
          <li>All Books</li>
          <li>Beginner</li>
          <li>Intermediate</li>
          <li>Conversational</li>
          <li>Native</li>
        </ul>
      }
    </>
  )
}
