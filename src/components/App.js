import React, { Component } from 'react'
import Header from './Header'
import Player from './Player'
import AddPlayerForm from './AddPlayerForm'

class App extends Component {

  state = {
    players: [
      {
        name: "Skyler",
        score: 0,
        id: 1
      },
      {
        name: "Treasure",
        score: 0,
        id: 2
      },
      {
        name: "Ashley",
        score: 0,
        id: 3
      },
      {
        name: "James",
        score: 0,
        id: 4
      }
    ]
  }

  // player id counter
  prevPlayerID = 4  

  handleScoreChange = (index, delta) => {
    this.setState( prevState => {
      return {
        score: prevState.players[index].score += delta
      }
    })
  }

  getHighestScore = () => {
    const scores = this.state.players.map(player => player.score)
    const highScore = Math.max(...scores)
      if (highScore) {
        return highScore
      }
      return null
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: this.prevPlayerID += 1
          }
        ]
      }
    })
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter( p => p.id !== id )
      }
    })
  }

  render() {
    const highScore = this.getHighestScore()

    return (
      <div className="scoreboard">
        <Header
          title=" My Scoreboard"
          players={this.state.players}
        />
  
        {/* Player List */}
        {this.state.players.map( (player, index) => {
          return (
            <Player
              name={player.name}
              score={player.score}
              id={player.id}
              key={player.id.toString()}
              index={index}
              changeScore={this.handleScoreChange}
              removePlayer={this.handleRemovePlayer}
              isHighScore={highScore === player.score}
            />
          )
        })}

        <AddPlayerForm addPlayer={this.handleAddPlayer} />
      </div>
    )
  }
}

export default App