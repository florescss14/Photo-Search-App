const PhotoCard = ({photo}) => {
    return(
        
        <div className="photo-card" key={photo.id}>
            <img src={photo.src.medium} alt={photo.photographer} />
            <div className="photographer">{photo.photographer}</div>
            <div className="photographer-url">
            <a href={photo.photographer_url}>{photo.photographer_url}</a>
            </div>
        </div>
        )
}

export default PhotoCard;