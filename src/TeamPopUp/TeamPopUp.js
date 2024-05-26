import React, { useEffect, useState } from 'react'
import '../App.css';

export const TeamPopUp = ({selectedTeam, setSelectedTeam, selectedTriCode, setSelectedTriCode}) => {

    const [players, setPlayers] = useState([]);
    const [skaters, setSkaters] = useState([]);
    const [goalies, setGoalies] = useState([]);
    const [btnClicked, setBtnClicked] = useState('Skaters');

    useEffect(() => {
        fetch(`http://localhost:3001/clubStats/${selectedTriCode}`)
            .then(response => response.json())
            .then(data => {
                setPlayers(data.skaters);
                setSkaters(data.skaters);
                setGoalies(data.goalies);
            })
            .catch(err => {
                console.error("Error fetching club stats:", err);
            });
    }, [])

    return (
        <div style={{
            width:"100vw", height:'100vh', background:'rgba(255,255,255,.35)', 
            display:'flex', justifyContent:'center', alignItems:'center',
            position: 'fixed', top: 0, left: 0, zIndex: 1000
        }} onClick={() => {
            setSelectedTeam(null);
            setSelectedTriCode(null);
        }}>

            <div style={{
                width:"65vw", height:'80vh', background:'#252D3D', borderRadius:20,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.3)',
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{
                    width:"100%", height:'25%', background:'#39445B', 
                    borderTopLeftRadius:20, borderTopRightRadius:20,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    display:'flex', alignItems:'center', 
                }}>
                    <img src={`https://assets.nhle.com/logos/nhl/svg/${selectedTriCode}_light.svg`}
                        style={{width: 150, height: 150}}
                    />
                    <div style={{display:'flex', alignItems:'flex-start', flexDirection:'column', width: "40%", height:"100%"}}>
                        <div style={{color:'#fff', fontSize: 22, fontWeight:'bold', marginTop:30}}>{selectedTeam.teamFullName}</div>
                        <div style={{color:'#C2C0C0', fontSize: 18, fontWeight:'medium', marginTop:0}}>{selectedTriCode}</div>
                    </div>
                    <div style={{width: "60%", height:"100%", display:'flex'}}>

                        <div style={{width: "60%", height:"100%", display:'flex', marginTop:10}}>
                            <Stat name={"GP"} number={selectedTeam.gamesPlayed} fontColor={"#ffffff"}/>
                            <Stat name={"PTS"} number={selectedTeam.points} fontColor={"#ffffff"}/>
                            <Stat name={"GA"} number={selectedTeam.goalsAgainst} fontColor={"#ffffff"}/>
                            <Stat name={"GF"} number={selectedTeam.goalsFor} fontColor={"#ffffff"}/>
                            <Stat name={"W"} number={selectedTeam.wins} fontColor={"#0AEF81"}/>
                            <Stat name={"L"} number={selectedTeam.losses} fontColor={"#FF2929"}/>
                        </div>

                        <div style={{width: "40%", height:"100%", display:'flex', marginTop:20, flexDirection:'column'}}>
                            <div style={{width: "100%", height:"50%", display:'flex', justifyContent:'flex-end'}} >
                                <p style={{marginRight: 30, fontSize:20, fontWeight:'bold',color:'#fff', cursor:'pointer'}} onClick={() => {
                                    setSelectedTeam(null);
                                    setSelectedTriCode(null);
                                }}>X</p>
                            </div>
                            
                            <div style={{
                                width: "100%", display:'flex', justifyContent:'space-evenly'
                            }}>
                                <Button 
                                    name={"Skaters"} 
                                    btnClicked={btnClicked} 
                                    setBtnClicked={setBtnClicked}
                                    setPlayers={setPlayers}
                                    skaters={skaters} goalies={goalies}
                                />
                                <Button 
                                    name={"Goalies"}
                                    btnClicked={btnClicked} 
                                    setBtnClicked={setBtnClicked}
                                    setPlayers={setPlayers}
                                    skaters={skaters} goalies={goalies}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {players.length === 0 ? <p style={{color:"#fff", fontSize:20, fontWeight:'bold'}}>Loading</p> :
                    <div style={{
                        width:"100%", height:'75%',  overflow:'auto', 
                        borderBottomLeftRadius: 20,borderBottomRightRadius: 20
                    }}>
                        <StatsHeader isGoalie={btnClicked==="Goalies"}/>
                    
                        {players.map((player, index) => {
                            return (
                                <Player 
                                    index={index} key={index}
                                    player={player} isGoalie={btnClicked==="Goalies"}
                                />
                            )
                        })}
                    </div>
                }
            </div>

        </div>
  )
}

const Button = ({name, btnClicked, setBtnClicked, skaters, goalies, setPlayers}) => {
    return(
        <div style={{
            width: 90, height: 40, display:'flex', 
            justifyContent:'center', alignItems:'center',
            background:btnClicked === name ? '#252D3D' : '#4A5770', borderRadius:20, cursor:'pointer'
        }} onClick={() => {
            setBtnClicked(name);
            setPlayers(name === "Skaters" ? skaters : goalies)
        }}>
            <p style={{fontSize:16, fontWeight:'bold', color:'#fff'}}>{name}</p>
        </div>
    )
}

const StatsHeader = ({isGoalie}) => {
    if(!isGoalie) return(
        <div style={{width:"100%", height: 50, marginTop:2, display:'flex'}}>
            <div style={{width:"25%", height:'100%', justifyContent:'flex-start', display:'flex', marginLeft: 30,alignItems:'center'}}>
                <p style={{color:'#DDDDDD', fontSize: 18, fontWeight:'bold'}}>Player</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="PS" explanation="Position" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="GP" explanation="Games Played" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="G" explanation="Goals" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="P" explanation="Points" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="A" explanation="Assists" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="SH" explanation="Shots" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#DDDDDD', fontSize: 18, fontWeight:'bold'}}>+/-</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="F%" explanation="Faceoff Win %" />
            </div>
        </div>
    )

    return (
        <GoalieHeader />
    )
}

const Player = ({index, player, isGoalie}) => {
    if (!isGoalie) return(
        <div style={{
            width:"100%", height: 50, display:'flex',
            alignItems:'center',
            background: index % 2 === 0 ? '#4A5770' : '#353D4F'
        }}>
            <div style={{width:"25%", height:'100%', justifyContent:'flex-start', display:'flex', marginLeft: 30, alignItems:'center'}}>
                <img src={player.headshot} style={{height: 40, width:40, marginRight: 10}}/>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold', alignItems:'center', display:'flex'}}>{player.firstName.default.charAt(0)}. {player.lastName.default}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.positionCode}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.gamesPlayed}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.goals}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.points}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.assists}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.shots}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.plusMinus}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{(player.faceoffWinPctg*100).toFixed(0)}%</p>
            </div>
        </div>
    )

    return <Goalie index={index} player={player}/>
}
const Goalie = ({index, player}) => {
    return(
        <div style={{
            width:"100%", height: 50, display:'flex',
            alignItems:'center',
            background: index % 2 === 0 ? '#4A5770' : '#353D4F'
        }}>
            <div style={{width:"25%", height:'100%', justifyContent:'flex-start', display:'flex', marginLeft: 30, alignItems:'center'}}>
                <img src={player.headshot} style={{height: 40, width:40, marginRight: 10}}/>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold', alignItems:'center', display:'flex'}}>{player.firstName.default.charAt(0)}. {player.lastName.default}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.gamesPlayed}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.goalsAgainst}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.saves}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{(player.savePercentage*100).toFixed(0)}%</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.shutouts}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.assists}</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <p style={{color:'#fff', fontSize: 18, fontWeight:'bold'}}>{player.points}</p>
            </div>
        </div>
    )
}
const GoalieHeader = () => {
    return(
        <div style={{width:"100%", height: 50, marginTop:2, display:'flex'}}>
            <div style={{width:"25%", height:'100%', justifyContent:'flex-start', display:'flex', marginLeft: 30,alignItems:'center'}}>
                <p style={{color:'#DDDDDD', fontSize: 18, fontWeight:'bold'}}>Player</p>
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="GP" explanation="Games Played" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="GA" explanation="Goals Against" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="S" explanation="Saves" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="S%" explanation="Save %" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="SH" explanation="Shutouts" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="A" explanation="Assists" />
            </div>
            <div style={{width:"5%", height:'100%', alignItems:'center', display:'flex'}}>
                <Tooltip text="P" explanation="Points" />
            </div>
        </div>
    )
}

const Stat = ({name, number, fontColor}) => {
    return(
        <div style={{display:'flex', alignItems:'flex-end', height:30, width:90, marginTop:20, marginRight:10}}>
            <div style={{color:fontColor, fontSize: 25, fontWeight:'bold',}}>{name}</div>
            <div style={{color:'#FFFFFF', fontSize: 25, marginLeft: 5}}>{number}</div>
        </div>
    )
}

const Tooltip = ({ text, explanation }) => {
    return (
      <div className="tooltip-container">
        <span style={{color:'#DDDDDD', fontSize: 18, fontWeight:'bold'}}>{text}</span>
        <div className="tooltip-text">{explanation}</div>
      </div>
    );
}