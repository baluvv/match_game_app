import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, checkImageMatching} = props
  const {id, thumbnailUrl} = imageDetails

  const onClickCompare = () => {
    checkImageMatching(id)
  }

  return (
    <li>
      <button type="button" className="thumbnail-button">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="thumbnail"
          onClick={onClickCompare}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
