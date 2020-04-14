import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = () => {
  return (
    <div className="header row">
      
    </div>
  )
}

const BattleInfo = ({ disabled, battle, player, enemy }) => {
  return (
    <div className='row battle-info'>
      <div className='col-4'><h2>Player</h2><h3>{player.health}</h3></div>
      {disabled ? <div className='col-4'></div> : <Button handleClick={battle} cssClass="battle-btn col-4" text="Battle" />}
      <div className='col-4'><h2>Enemy</h2><h3>{enemy.health}</h3></div>
    </div>
  )
}

const Play = ({ player, enemy }) => {
  return (
    <div className="battle-field row">
      <Card cardStats={player} status={`card player-card ${player.isDamaged ? "damaged" : ""}`} />
      <div className='col-lg-2'><h1>VS</h1></div>
      <Card cardStats={enemy} status={`card enemy-card ${enemy.isDamaged ? "damaged" : ""}`} />
    </div>
  )
}

const Card = ({ cardStats, status }) => {
  return (
    <div className='col-lg-5'>
      <div className={status}>
        <div className={`portrait img-${cardStats.image}`}>
          <h2>{cardStats.name}</h2>
          <h3>{cardStats.attack}</h3>
        </div>
        <div className='flavor-textbox'>
          <p><b>{cardStats.text}</b></p>
        </div>
      </div>
    </div>
  )
}

const Log = ({ log }) => {
  return (
    <div className='log col-lg-12'>
      {log.map((msg, key) => <ol className='log-list' key={key}><b>Turn {key + 1}:</b> {msg}</ol>)}
    </div>
  )
}

const Button = ({ handleClick, cssClass, text }) =>  (
  <button onClick={handleClick} className={cssClass} >{text}</button>
)

const App = () => {
  const [ player, setPlayer ] = useState()
  const [ enemy, setEnemy ] = useState()
  const [ timeToBattle, setBattle ] = useState(false)
  const [ gameOver, setGameOver ] = useState(false)
  const [ battleLog, setBattleLog ] = useState([])
  const names = ['Murkgolem', 'Spirithood', 'Webstep', 'Thunderbeing', 'Dreadpest', 'Dawnthing', 
      'Soilserpent', 'Chaospaw', 'Gloomfang', 'Rotspawn']

  const battle = () => {
    if (player.attack > enemy.attack && enemy.health - (player.attack - enemy.attack) <= 0) {
      setEnemy({
        enemy,
        name: "Enemy",
        health: 0,
        attack: enemy.attack,
        image: enemy.image,
        text: enemy.text,
        isDamaged: false
      })
      setBattleLog(battleLog.concat(`You win! Your enemy went from ${enemy.health} health to ${0}.`))
      setBattle(false)
      setGameOver(true)
    } else if (player.attack < enemy.attack && player.health - (enemy.attack - player.attack) <= 0) {
      setPlayer({
        player,
        name: "Player",
        health: 0,
        attack: player.attack, 
        image: player.image,
        text: player.text,
        isDamaged: false
      })
      setBattleLog(battleLog.concat(`You lose... You went from ${player.health} health to ${0}.`))
      setBattle(false)
      setGameOver(true)
    } else if (player.attack > enemy.attack) {
      setBattleLog(battleLog.concat(`${player.text} attacked! Your enemy went from ${enemy.health} health to ${enemy.health - (player.attack - enemy.attack)}.`))
      setPlayer({
        player,
        name: "Player",
        health: player.health,
        attack: player.attack - enemy.attack, 
        image: player.image,
        text: player.text,
        isDamaged: true
      })
      setEnemy({
        enemy,
        name: "Enemy",
        health: enemy.health - (player.attack - enemy.attack),
        attack: Math.round(Math.random() * 9) + 1, 
        image: Math.round(Math.random() * 3) + 1,
        text: names[Math.round(Math.random() * 9)],
        isDamaged: false
      })
    } else if (enemy.attack > player.attack) {
      setBattleLog(battleLog.concat(`${enemy.text} attacked! You went from ${player.health} health to ${player.health - (enemy.attack - player.attack)}.`))
      setPlayer({
        player,
        name: "Player",
        health: player.health - (enemy.attack - player.attack),
        attack: Math.round(Math.random() * 9) + 1,
        image: Math.round(Math.random() * 3) + 1, 
        text: names[Math.round(Math.random() * 9)], 
        isDamaged: false
      })
      setEnemy({
        enemy,
        name: "Enemy",
        health: enemy.health,
        attack: enemy.attack - player.attack,
        image: enemy.image,
        text: enemy.text,
        isDamaged: true
      })
    } else {
      setPlayer({
        player,
        name: "Player",
        health: player.health,
        attack: Math.round(Math.random() * 9) + 1, 
        image: Math.round(Math.random() * 3) + 1, 
        text: names[Math.round(Math.random() * 9)],
        isDamaged: false
      })
      setEnemy({
        enemy,
        name: "Enemy",
        health: enemy.health,
        attack: Math.round(Math.random() * 9) + 1, 
        image: Math.round(Math.random() * 3) + 1,
        text: names[Math.round(Math.random() * 9)],
        isDamaged: false
      })
      setBattleLog(battleLog.concat('Tie...'))
    }

  }

  const startBattle = () => {
    setBattle(true)
    setGameOver(false)
    setBattleLog([])
    setPlayer({
      name: "Player",
      health: 20,
      attack: Math.round(Math.random() * 9) + 1,
      image: Math.round(Math.random() * 3) + 1,
      text: names[Math.round(Math.random() * 10)],
      isDamaged: false
    })
    setEnemy({
      name: "Enemy",
      health: 20,
      attack: Math.round(Math.random() * 9) + 1,
      image: Math.round(Math.random() * 3) + 1,
      text: names[Math.round(Math.random() * 10)],
      isDamaged: false
    })
  }

  if (gameOver) {
    return (
      <div className='container-fluid'>
        <Header />
        <BattleInfo disabled={true} battle={battle} player={player} enemy={enemy} />
        <div className="row">
          <div className='welcome-modal col-10 col-sm-10 col-lg-4'>
            <h2>Game Over,</h2>
            <p>{player.health === 0 ? 'You have lost...' : 'Congratulations, you win!!!'}</p>
            <Button handleClick={startBattle} cssClass="welcome-btn" text="Play Again?" />
          </div>
        </div>
        <Log log={battleLog} />
      </div>
    )
  }

  if (timeToBattle) {
    return (
      <div className="container-fluid">
        <Header />
        <BattleInfo disabled={false} battle={battle} player={player} enemy={enemy} />
        <Play player={player} enemy={enemy} />
        <Log log={battleLog} />
      </div>
    )
  } 
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className='welcome-modal col-10 col-sm-10 col-lg-4'>
          <h2>Welcome,</h2>
          <p>
            This app was developed by Joshua Kardell using React and Bootstrap. The purpose of This
            project was to use the knowledge gained from tutorials on React. Instead of 
            following tutorials I decided to create a game based loosely on Hearthstone.
          </p>
          <p>
            To play the game click the play button below and it will render a playing field
            that will consist of health pools and cards for each player along with a Battle 
            button to play out each turn. 
          </p>
          <p>
            You and your enemy will get
            randomized cards that will battle against each other, whichever card has the higher attack
            will be the winner of the battle and the remaining attack will be directed towards the player
            or enemy's health pool. Once either player's health pool reaches 0 the game will end.
          </p>
          <Button handleClick={startBattle} cssClass="welcome-btn" text="Play" />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App  />,
  document.getElementById('main')
);
