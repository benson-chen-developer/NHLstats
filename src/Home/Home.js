import React, { useEffect, useState } from 'react'
import { TeamPopUp } from '../TeamPopUp/TeamPopUp';

export const Home = ({teamData, shownTeam, setShownTeam, teamTriCodes}) => {
  const [selectedStat, setSelectedStat] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTriCode, setSelectedTriCode] = useState(null);

  const setShownTeamFunc = (selectedStat) => {
    
    let sortedData = [...teamData];
    if(selectedStat === "Wup"){
      sortedData = sortedData.sort((a, b) => b.wins - a.wins);
    } 
    else if(selectedStat === "Wdown"){
      sortedData = sortedData.sort((a, b) => a.wins - b.wins);
    }
    if(selectedStat === "Lup"){
      sortedData = sortedData.sort((a, b) => b.losses - a.losses);
    } 
    else if(selectedStat === "Ldown"){
      sortedData = sortedData.sort((a, b) => a.losses - b.losses);
    }
    if(selectedStat === "PTSdown"){
      sortedData = sortedData.sort((a, b) => a.points - b.points);
    } 
    else if(selectedStat === "PTSup"){
      sortedData = sortedData.sort((a, b) => b.points - a.points);
    }
    if(selectedStat === "GFdown"){
      sortedData = sortedData.sort((a, b) => a.goalsFor - b.goalsFor);
    } 
    else if(selectedStat === "GFup"){
      sortedData = sortedData.sort((a, b) => b.goalsFor - a.goalsFor);
    }
    if(selectedStat === "GAdown"){
      sortedData = sortedData.sort((a, b) => a.goalsAgainst - b.goalsAgainst);
    } 
    else if(selectedStat === "GAup"){
      sortedData = sortedData.sort((a, b) => b.goalsAgainst - a.goalsAgainst);
    }
    
    setSelectedStat(selectedStat);
    setShownTeam(sortedData);
  }

  return (
    <div style={{
        minHeight: '100vh', minWidth:"100vw", background:'#040616', display:'flex',
        flexDirection:'column',
        position: 'relative', justifyItems:'center', alignItems:'center'
    }}>
      <div style={{maxHeight:'30vh'}}>
        <img 
          src='https://media.d3.nhle.com/image/private/t_q-best/prd/assets/nhl/logos/nhl_shield_wm_on_dark_fqkbph'
          style={{width: 200, height:150}}
        />

        <Header selectedStat={selectedStat} setShownTeamFunc={setShownTeamFunc}/>
      </div>

      <div style={{
          overflowY: 'auto', flex: 1, paddingRight: 10, paddingLeft: 10, 
          display: 'flex', alignItems: 'center', flexDirection: 'column',
          maxHeight: '70vh'  
      }}>
          {shownTeam.map((team, index) => {
              const triCode = teamTriCodes.find(t => t.fullName === team.teamFullName).triCode;

              return <Bar 
                  key={index} index={index} 
                  triCode={triCode} setSelectedTriCode={setSelectedTriCode}
                  team={team} setSelectedTeam={setSelectedTeam}
              />
          })}
      </div>

      {selectedTeam && selectedTriCode ?
        <TeamPopUp 
          selectedTeam={selectedTeam} 
          setSelectedTeam={setSelectedTeam} 
          selectedTriCode={selectedTriCode}
          setSelectedTriCode={setSelectedTriCode}
        /> : null
      }
    </div>
  )
}

const Header = ({selectedStat,setShownTeamFunc}) => {
  return(
    <div style={{
      width: '80vw', height: 30, background:'#040616',
      borderRadius: 10, margin: 10, display:'flex',
    }}>
      {/* Rank */}
      <div style={{userSelect:'none',width:'10%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22, fontWeight: 'bold'}}>#</p>
      </div>

      {/* Team */}
      <div style={{userSelect:'none',width:'25%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22, fontWeight: 'bold'}}>Team</p>
      </div>

      {/* GP */}
      <div style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>GP</p>
      </div>

      {/* W */}
      <div 
        style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center', cursor:"pointer"}}
        onClick={() => {
          if(selectedStat==="Wup"){
            setShownTeamFunc("Wdown");
          } else if(selectedStat==="Wdown"){
            setShownTeamFunc("");
          } else {
            setShownTeamFunc("Wup")
          }
        }}
        aria-label="Toggle win stat sorting"
      >
        <p style={{color:'#fff'}}>{selectedStat === 'Wup' && '▲'}</p>
        <p style={{color:'#fff'}}>{selectedStat === 'Wdown' && '▼'}</p>
        <p style={{color:'#fff', fontSize: 22}}>W</p>
      </div>

      {/* L */}
      <div 
        style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center', cursor:"pointer"}}
        onClick={() => {
          if(selectedStat==="Lup"){
            setShownTeamFunc("Ldown");
          } else if(selectedStat==="Ldown"){
            setShownTeamFunc("");
          } else {
            setShownTeamFunc("Lup")
          }
        }}
        aria-label="Toggle loss stat sorting"
      >
        <p style={{color:'#fff'}}>{selectedStat === 'Lup' && '▲'}</p>
        <p style={{color:'#fff'}}>{selectedStat === 'Ldown' && '▼'}</p>
        <p style={{color:'#fff', fontSize: 22}}>L</p>
      </div>

      {/* TIE */}
      <div style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>TIE</p>
      </div>

      {/* PTS */}
      <div 
        style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center', cursor:"pointer"}}
        onClick={() => {
          if(selectedStat==="PTSup"){
            setShownTeamFunc("PTSdown");
          } else if(selectedStat==="PTSdown"){
            setShownTeamFunc("");
          } else {
            setShownTeamFunc("PTSup")
          }
        }}
        aria-label="Toggle PTS stat sorting"
        >
          <p style={{color:'#fff'}}>{selectedStat === 'PTSup' && '▲'}</p>
          <p style={{color:'#fff'}}>{selectedStat === 'PTSdown' && '▼'}</p>
          <p style={{color:'#fff', fontSize: 22}}>PTS</p>
        </div>

      {/* GA */}
      <div 
        style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center', cursor:"pointer"}}
        onClick={() => {
          if(selectedStat==="GAup"){
            setShownTeamFunc("GAdown");
          } else if(selectedStat==="GAdown"){
            setShownTeamFunc("");
          } else {
            setShownTeamFunc("GAup")
          }
        }}
        >
          <p style={{color:'#fff'}}>{selectedStat === 'GAup' && '▲'}</p>
          <p style={{color:'#fff'}}>{selectedStat === 'GAdown' && '▼'}</p>
          <p style={{color:'#fff', fontSize: 22}}>GA</p>
        </div>

      {/* GF */}
      <div 
        style={{userSelect:'none',width:'5%', display:'flex', justifyContent:'center', alignItems:'center', cursor:"pointer"}}
        onClick={() => {
          if(selectedStat==="GFup"){
            setShownTeamFunc("GFdown");
          } else if(selectedStat==="GFdown"){
            setShownTeamFunc("");
          } else {
            setShownTeamFunc("GFup")
          }
        }}
      >
          <p style={{color:'#fff'}}>{selectedStat === 'GFup' && '▲'}</p>
          <p style={{color:'#fff'}}>{selectedStat === 'GFdown' && '▼'}</p>
          <p style={{color:'#fff', fontSize: 22}}>GF</p>
        </div>

        <div 
          style={{userSelect:'none',width:'30%', display:'flex', justifyContent:'flex-end', alignItems:'center'}}
        >
          <i style={{color:'#C6C6C6', fontSize: 15}}>Click On The Stats To Sort By</i>
        </div>
    </div>
  )
}

const Bar = ({index, team, setSelectedTeam, setSelectedTriCode, triCode}) => {
  return (
    <div style={{
      width: '80vw', height: 70, background:'#343C4F',
      border: index % 2 === 0 ? '3px solid #8FFFA1' : '3px solid #1AEAC2', 
      borderRadius: 10, margin: 5, display:'flex', cursor:'pointer'
    }} onClick={() => {
      setSelectedTeam(team);
      setSelectedTriCode(triCode);
    }}>
      <div style={{width:'10%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 25, fontWeight: 'bold'}}>{index+1}</p>
      </div>
      <div style={{width:'25%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
        <img 
          src={`https://assets.nhle.com/logos/nhl/svg/${triCode}_light.svg`} 
          style={{width:50, height: 50, marginRight: 10}}
        />
        <p style={{color:'#fff', fontSize: 20, fontWeight: 'bold'}}>{team.teamFullName}</p>
      </div>

      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.gamesPlayed}</p>
      </div>
      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.wins ? team.wins : 0}</p>
      </div>
      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.losses ? team.losses : 0}</p>
      </div>
      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.ties ? team.ties : 0}</p>
      </div>
      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.points ? team.points : 0}</p>
      </div>
      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.goalsAgainst ? team.goalsAgainst : 0}</p>
      </div>
      <div style={{width:'5%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <p style={{color:'#fff', fontSize: 22}}>{team.goalsFor ? team.goalsFor : 0}</p>
      </div>
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