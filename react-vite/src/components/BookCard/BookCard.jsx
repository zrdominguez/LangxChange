function BookCard({book}){
  <div>
    <img src={`${book.imgUrl}`}/>
    <button>X</button>
    <ul>
      <li>{`${book.name}  Score: ${book.avgRating}`}</li>
      <li>{`${book.author}`}</li>
    </ul>
  </div>
}

export default BookCard
