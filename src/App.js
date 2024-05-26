import './App.css';
import { Home } from './Home/Home';
import { useEffect, useState } from 'react';

function App() {
  const [teamData, setTeamData] = useState(null);
  const [shownTeam, setShownTeam] = useState([]);  
  const [teamTriCodes, setTeamTriCodes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/teams")
      .then(res => res.json())
      .then(data => {
        let cleanData = [...data.data];
        cleanData = cleanData.filter(item => item.teamFullName !== 'New York Americans');
        cleanData = cleanData.filter(item => item.teamFullName !== 'Winnipeg Jets (1979)');
        cleanData = cleanData.filter(item => item.teamFullName !== 'Minnesota North Stars');
        cleanData = cleanData.filter(item => item.teamFullName !== 'Montreal Maroons');
        cleanData = cleanData.filter(item => item.teamFullName !== 'Ottawa Senators (1917)');
        cleanData = cleanData.filter(item => item.teamFullName !== 'Colorado Rockies');
        cleanData = cleanData.filter(item => item.teamFullName !== 'Philadelphia Quakers');
        const seenTeamNames = new Set();
        const filteredData = [];

        cleanData.forEach(item => {
          if (!seenTeamNames.has(item.teamFullName)) {
            seenTeamNames.add(item.teamFullName);
            filteredData.push(item);
          }
        });

        console.log(filteredData)

        setTeamData(filteredData);
        setShownTeam(filteredData);
      })
      .catch(err => {
        console.log("Error with team data", err);
      });
    fetch("http://localhost:3001/triCodes")
      .then(res => res.json())
      .then(data => {
        setTeamTriCodes(data);
      })
      .catch(err => {
        console.log("Error with team data", err);
      });
  }, []);

  return (
    <div className="App">
      {teamData && teamTriCodes ? 
        <Home 
          teamData={teamData}
          shownTeam={shownTeam}
          teamTriCodes={teamTriCodes}
          setShownTeam={setShownTeam}
        /> 
          :
        <div style={{
            minHeight: '100vh', minWidth:"100vw", background:'#040616', display:'flex',
            flexDirection:'column',
            position: 'relative', justifyItems:'center', alignItems:'center'
        }}>
          <p style={{fontSize:50, color:'#fff', fontWeight:'bold'}}>Loading</p>
        </div>
      }
    </div>
  );
}

export default App;
