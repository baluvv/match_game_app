import {Component} from 'react'

import './index.css'

import ThumbnailItem from '../ThumbnailItem'

const Button = props => {
  const {tabDetails, onChangeTabId, isActiveTab} = props
  const {tabId, displayText} = tabDetails
  const onClickChangeTabId = () => {
    onChangeTabId(tabId)
  }
  const selectedClassName = isActiveTab ? 'selected-tab' : 'tab-button'
  return (
    <li>
      <button
        type="button"
        className={selectedClassName}
        onClick={onClickChangeTabId}
      >
        {displayText}
      </button>
    </li>
  )
}

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      activeTabId: tabsList[0].tabId,
      tabsList,
      imagesList,
      activeImage: imagesList[0],
      seconds: 60,
      score: 0,
      gameOver: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tikTik, 1000)
  }

  tikTik = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  onChangeTabId = id => {
    this.setState({activeTabId: id})
  }

  checkImageMatching = id => {
    const {activeImage, imagesList} = this.state
    if (id === activeImage.id) {
      const index = Math.floor(Math.random() * 30)
      this.setState(prevState => ({
        score: prevState.score + 1,
        activeImage: imagesList[index],
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    }
  }

  playAgain = () => {
    const {tabsList, imagesList} = this.state
    this.setState({
      activeTabId: tabsList[0].tabId,
      activeImage: imagesList[0],
      seconds: 60,
      score: 0,
      gameOver: false,
    })
    this.componentDidMount()
  }

  render() {
    const {
      activeTabId,
      imagesList,
      activeImage,
      tabsList,
      seconds,
      score,
      gameOver,
    } = this.state
    const filteredImagesList = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )
    return (
      <div>
        <ul className="navbar">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
          </li>
          <li className="container">
            <li className="score-and-timer-container">
              <p className="score">
                Score:<span className="span">{score}</span>
              </p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer"
              />
            </li>
            <li>
              <p className="span">{seconds} secs</p>
            </li>
          </li>
        </ul>
        {gameOver === true ? (
          <div className="bottom-container">
            <div className="trophy-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy"
              />
              <p className="your-score">YOUR SCORE</p>
              <h1 className="score-digit">{score}</h1>
              <button
                type="button"
                className="reset-button"
                onClick={this.playAgain}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                />
                PLAY AGAIN
              </button>
            </div>
          </div>
        ) : (
          <div className="bottom-container">
            <img
              src={activeImage.imageUrl}
              alt="match"
              className="active-image"
            />
            <ul className="buttons-container">
              {tabsList.map(eachTab => (
                <Button
                  tabDetails={eachTab}
                  key={eachTab.tabId}
                  onChangeTabId={this.onChangeTabId}
                  isActiveTab={activeTabId === eachTab.tabId}
                />
              ))}
            </ul>
            <ul className="thumbnails-container">
              {filteredImagesList.map(imageDetails => (
                <ThumbnailItem
                  imageDetails={imageDetails}
                  key={imageDetails.id}
                  checkImageMatching={this.checkImageMatching}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default MatchGame
