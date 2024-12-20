function CollectionCard({collection}){
  return(
    <div className="collection-card" style={{backgroundColor:"white"}}>
      <button>X</button>
      <img />
      <button>Edit</button>
      <p>{collection.name}</p>
      <p>{collection.lang}</p>
    </div>
  )
}

export default CollectionCard
