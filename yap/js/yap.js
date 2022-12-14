//default nhl api address
const nhlapi = {
  baseUrl: 'https://statsapi.web.nhl.com/api/v1'
};

const yapapi = {
  baseUrl: 'https://yapapi.thebeau.dev'
}

//my roster, opponent roster, HAS member array of [player, gamesLeft, avgStats]
let myRoster = new Object(), opponentRoster = new Object();
myRoster = {
  member: []
};
opponentRoster = {
  member: []
};

//simply averages out the stats given by the number of games they're based on...as of now, it's limited to the season being selected
const averageOutStats = async(stats) => {
  let avgStats = {
    games: 0,
    goals: 0,
    assists: 0,
    points: 0,
   	plusMinus: 0,
   	pim: 0,
    powerPlayPoints: 0,
    shortHandedPoints: 0,
    gameWinningGoals: 0,
    shots: 0,
    faceOffPct: 0, //no faceoff wins here
    hits: 0,
    blocked: 0,
    wins: 0,
    goalAgainstAverage: 0,
    saves: 0,
    shotsAgainst: 0,
    savePercentage: 0,
    shutouts: 0
  };

  if(isNaN(stats.games)){avgStats.games = 0}else{avgStats.games = stats.games}
  if(isNaN(stats.goals)){avgStats.goals = 0}else{avgStats.goals = stats.goals/stats.games}
  if(isNaN(stats.assists)){avgStats.assists = 0}else{avgStats.assists = stats.assists/stats.games}
  if(isNaN(stats.points)){avgStats.points = 0}else{avgStats.points = stats.points/stats.games}
  if(isNaN(stats.plusMinus)){avgStats.plusMinus = 0}else{avgStats.plusMinus = stats.plusMinus/stats.games}
  if(isNaN(stats.pim)){avgStats.pim = 0}else{avgStats.pim = stats.pim/stats.games}
  if(isNaN(stats.powerPlayPoints)){avgStats.powerPlayPoints = 0}else{avgStats.powerPlayPoints = stats.powerPlayPoints/stats.games}
  if(isNaN(stats.shortHandedPoints)){avgStats.shortHandedPoints = 0}else{avgStats.shortHandedPoints = stats.shortHandedPoints/stats.games}
  if(isNaN(stats.gameWinningGoals)){avgStats.gameWinningGoals = 0}else{avgStats.gameWinningGoals = stats.gameWinningGoals/stats.games}
  if(isNaN(stats.shots)){avgStats.shots = 0}else{avgStats.shots = stats.shots/stats.games}
  if(isNaN(stats.faceOffPct)){avgStats.faceOffPct = 0}else{avgStats.faceOffPct = stats.faceOffPct/stats.games}
  if(isNaN(stats.hits)){avgStats.hits = 0}else{avgStats.hits = stats.hits/stats.games}
  if(isNaN(stats.blocked)){avgStats.blocked = 0}else{avgStats.blocked = stats.blocked/stats.games}
  if(isNaN(stats.wins)){avgStats.wins = 0}else{avgStats.wins = stats.wins/stats.games}
  if(isNaN(stats.goalAgainstAverage)){avgStats.goalAgainstAverage = 0}else{avgStats.goalAgainstAverage = stats.goalAgainstAverage}
  if(isNaN(stats.saves)){avgStats.saves = 0}else{avgStats.saves = stats.saves/stats.games}
  if(isNaN(stats.shotsAgainst)){avgStats.shotsAgainst = 0}else{avgStats.shotsAgainst = stats.shotsAgainst/stats.games}
  if(isNaN(stats.savePercentage)){avgStats.savePercentage = 0}else{avgStats.savePercentage = stats.savePercentage}
  if(isNaN(stats.shutouts)){avgStats.shutouts = 0}else{avgStats.shutouts = stats.shutouts/stats.games}

  return avgStats
};

//updateScoreboard will calculate all the stats from both rosters and update the totals on the scoreboard by ID
//should update the score as well
const updateScoreboard = async(e) => {
  
  let myRow = document.getElementById("trMyScore");
  let opponentRow = document.getElementById("trVSScore");


    let myGoals=0, myAssists=0, myPoints=0, myPlusMinus=0, myPims=0, myPPP=0, mySHP=0, myGWG=0, mySOG=0, myFW=0, myHits=0, myBlocks=0, myWins=0, myGAA=0, mySaves=0, mySA=0, mySVP=0, mySHT=0;
    let goalieGamesLeft=0;
    for(let j=0;j<=myRoster.member.length-1;j++){
      myGoals += (myRoster.member[j].avgStats.goals)*myRoster.member[j].gamesLeft;
      myAssists += (myRoster.member[j].avgStats.assists)*myRoster.member[j].gamesLeft;
      myPoints += (myRoster.member[j].avgStats.points)*myRoster.member[j].gamesLeft;
      myPlusMinus += (myRoster.member[j].avgStats.plusMinus)*myRoster.member[j].gamesLeft;
      myPims += (myRoster.member[j].avgStats.pim)*myRoster.member[j].gamesLeft;
      myPPP += (myRoster.member[j].avgStats.powerPlayPoints)*myRoster.member[j].gamesLeft;
      mySHP += (myRoster.member[j].avgStats.shortHandedPoints)*myRoster.member[j].gamesLeft;
      myGWG += (myRoster.member[j].avgStats.gameWinningGoals)*myRoster.member[j].gamesLeft;
      mySOG += (myRoster.member[j].avgStats.shots)*myRoster.member[j].gamesLeft;
      myFW += (myRoster.member[j].avgStats.faceOffPct)*myRoster.member[j].gamesLeft;
      myHits += (myRoster.member[j].avgStats.hits)*myRoster.member[j].gamesLeft;
      myBlocks += (myRoster.member[j].avgStats.blocked)*myRoster.member[j].gamesLeft;
      myWins += (myRoster.member[j].avgStats.wins)*myRoster.member[j].gamesLeft;
      myGAA += myRoster.member[j].avgStats.goalAgainstAverage*myRoster.member[j].gamesLeft; //I have to multiple by games left, then divided by total goalie games left
      mySaves += (myRoster.member[j].avgStats.saves)*myRoster.member[j].gamesLeft;
      mySA += (myRoster.member[j].avgStats.shotsAgainst)*myRoster.member[j].gamesLeft;
      mySHT += (myRoster.member[j].avgStats.shutouts)*myRoster.member[j].gamesLeft;
      if (myRoster.member[j].avgStats.saves > 0){
        goalieGamesLeft+=myRoster.member[j].gamesLeft;
      }
    }
    myGAA = myGAA/goalieGamesLeft;
    mySVP=mySaves/mySA;
    if(isNaN(myGAA)){myGAA=0.00};
    if(isNaN(mySVP)){mySVP=0.00};

    myRow.cells[2].innerHTML = myGoals.toFixed(2);
    myRow.cells[3].innerHTML = myAssists.toFixed(2);
    myRow.cells[4].innerHTML = myPoints.toFixed(2);
    myRow.cells[5].innerHTML = myPlusMinus.toFixed(2);
    myRow.cells[6].innerHTML = myPims.toFixed(2);
    myRow.cells[7].innerHTML = myPPP.toFixed(2);
    myRow.cells[8].innerHTML = mySHP.toFixed(2);
    myRow.cells[9].innerHTML = myGWG.toFixed(2);
    myRow.cells[10].innerHTML = mySOG.toFixed(2);
    myRow.cells[11].innerHTML = myFW.toFixed(2);
    myRow.cells[12].innerHTML = myHits.toFixed(2);
    myRow.cells[13].innerHTML = myBlocks.toFixed(2);
    myRow.cells[14].innerHTML = myWins.toFixed(2);
    myRow.cells[15].innerHTML = myGAA.toFixed(2); 
    myRow.cells[16].innerHTML = mySaves.toFixed(2);
    myRow.cells[17].innerHTML = mySVP.toFixed(3);
    myRow.cells[18].innerHTML = mySHT.toFixed(2);
  


    let opponentGoals=0, opponentAssists=0, opponentPoints=0, opponentPlusMinus=0, opponentPims=0, opponentPPP=0, opponentSHP=0, opponentGWG=0, opponentSOG=0, opponentFW=0, opponentHits=0, opponentBlocks=0, opponentWins=0, opponentGAA=0, opponentSaves=0, opponentSA=0, opponentSVP=0, opponentSHT=0;
    goalieGamesLeft=0;
    for(let j=0;j<=opponentRoster.member.length-1;j++){
      opponentGoals += (opponentRoster.member[j].avgStats.goals)*opponentRoster.member[j].gamesLeft;
      opponentAssists += (opponentRoster.member[j].avgStats.assists)*opponentRoster.member[j].gamesLeft;
      opponentPoints += (opponentRoster.member[j].avgStats.points)*opponentRoster.member[j].gamesLeft;
      opponentPlusMinus += (opponentRoster.member[j].avgStats.plusMinus)*opponentRoster.member[j].gamesLeft;
      opponentPims += (opponentRoster.member[j].avgStats.pim)*opponentRoster.member[j].gamesLeft;
      opponentPPP += (opponentRoster.member[j].avgStats.powerPlayPoints)*opponentRoster.member[j].gamesLeft;
      opponentSHP += (opponentRoster.member[j].avgStats.shortHandedPoints)*opponentRoster.member[j].gamesLeft;
      opponentGWG += (opponentRoster.member[j].avgStats.gameWinningGoals)*opponentRoster.member[j].gamesLeft;
      opponentSOG += (opponentRoster.member[j].avgStats.shots)*opponentRoster.member[j].gamesLeft;
      opponentFW += (opponentRoster.member[j].avgStats.faceOffPct)*opponentRoster.member[j].gamesLeft;
      opponentHits += (opponentRoster.member[j].avgStats.hits)*opponentRoster.member[j].gamesLeft;
      opponentBlocks += (opponentRoster.member[j].avgStats.blocked)*opponentRoster.member[j].gamesLeft;
      opponentWins += (opponentRoster.member[j].avgStats.wins)*opponentRoster.member[j].gamesLeft;
      opponentGAA += opponentRoster.member[j].avgStats.goalAgainstAverage*opponentRoster.member[j].gamesLeft;
      opponentSaves += (opponentRoster.member[j].avgStats.saves)*opponentRoster.member[j].gamesLeft;
      opponentSA += (opponentRoster.member[j].avgStats.shotsAgainst)*opponentRoster.member[j].gamesLeft;
      opponentSHT += (opponentRoster.member[j].avgStats.shutouts)*opponentRoster.member[j].gamesLeft;
      if (opponentRoster.member[j].avgStats.saves > 0){
        goalieGamesLeft+=opponentRoster.member[j].gamesLeft;
      }
    }
    opponentGAA = opponentGAA/goalieGamesLeft;
    opponentSVP = opponentSaves/opponentSA;
    if(isNaN(opponentGAA)){opponentGAA=0.00};
    if(isNaN(opponentSVP)){opponentSVP=0.00};

    opponentRow.cells[2].innerHTML = opponentGoals.toFixed(2);
    opponentRow.cells[3].innerHTML = opponentAssists.toFixed(2);
    opponentRow.cells[4].innerHTML = opponentPoints.toFixed(2);
    opponentRow.cells[5].innerHTML = opponentPlusMinus.toFixed(2);
    opponentRow.cells[6].innerHTML = opponentPims.toFixed(2);
    opponentRow.cells[7].innerHTML = opponentPPP.toFixed(2);
    opponentRow.cells[8].innerHTML = opponentSHP.toFixed(2);
    opponentRow.cells[9].innerHTML = opponentGWG.toFixed(2);
    opponentRow.cells[10].innerHTML = opponentSOG.toFixed(2);
    opponentRow.cells[11].innerHTML = opponentFW.toFixed(2);
    opponentRow.cells[12].innerHTML = opponentHits.toFixed(2);
    opponentRow.cells[13].innerHTML = opponentBlocks.toFixed(2);
    opponentRow.cells[14].innerHTML = opponentWins.toFixed(2);
    opponentRow.cells[15].innerHTML = opponentGAA.toFixed(2);
    opponentRow.cells[16].innerHTML = opponentSaves.toFixed(2);
    opponentRow.cells[17].innerHTML = opponentSVP.toFixed(3);
    opponentRow.cells[18].innerHTML = opponentSHT.toFixed(2);
  
    let myScore=0, opponentScore=0;
    for(let i=2;i<=myRow.cells.length-1;i++){
      myRow.cells[i].setAttribute('style', 'background-color: white');
      opponentRow.cells[i].setAttribute('style', 'background-color: white');
      if(Number(myRow.cells[i].innerHTML)>Number(opponentRow.cells[i].innerHTML)){
        myScore++;
        myRow.cells[i].setAttribute('style', 'background-color: green !important');
        opponentRow.cells[i].setAttribute('style', 'background-color: white');
      }
      else if(Number(myRow.cells[i].innerHTML)<Number(opponentRow.cells[i].innerHTML)){
        opponentScore++;
        myRow.cells[i].setAttribute('style', 'background-color: white');
        opponentRow.cells[i].setAttribute('style', 'background-color: green !important');
      }
    }
    //special case GAA
    if(Number(myRow.cells[15].innerHTML)>Number(opponentRow.cells[15].innerHTML)){
      myScore--;opponentScore++;
      myRow.cells[15].setAttribute('style', 'background-color: black');
      opponentRow.cells[15].setAttribute('style', 'background-color: green !important');
    }
    else if(Number(myRow.cells[15].innerHTML)<Number(opponentRow.cells[15].innerHTML)){
      myScore++;opponentScore--;
      myRow.cells[15].setAttribute('style', 'background-color: green !important');
      opponentRow.cells[15].setAttribute('style', 'background-color: white');
    }
    myRow.cells[0].innerHTML=myScore;
    opponentRow.cells[0].innerHTML=opponentScore;
};

const triggerEvent = (el, eventName) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, false);
  el.dispatchEvent(event);
};

const emptySelect = (select) => {
  for (let i = select.options.length - 1; i >= 0; i--) {
    select.remove(i);
  }
};

//requires redesign to accept new parameters, we can keep the nhl api call or see if yahoo can provide the info
const fetchSchedule = async (teamId) => {
  let startDate = document.getElementById('startDate').value;
  let endDate = document.getElementById('endDate').value;
  
	let response = await fetch(`${nhlapi.baseUrl}/schedule?teamId=${teamId}&startDate=${startDate}&endDate=${endDate}`);
  let json = await response.json();

  let counter = json.totalGames;
  //now we need to scan the json to find the games that already happened or are post poned, which happens in detailedState
  /*
  for (let i=0; i<counter-1;i++){
    console.log(json.dates[counter].games[0].status.detailedState);
    if(json.dates[counter].games[0].status.detailedState!='Scheduled'){
      counter--;
    }
  }*/
  return counter;
};

//redesign needed but this can be used for the player search function
const fetchPlayer = async (playerId) => {
  let response = await fetch(`${nhlapi.baseUrl}/people/${playerId}`);
  let json = await response.json();
  let [player] = json.people;
  return player;
};

const fetchStats = async (playerId, seasonId) => {
  const response = await fetch(`${nhlapi.baseUrl}/people/${playerId}/stats?stats=statsSingleSeason&season=${seasonId}`);
  const json = await response.json();
  let seasonStats;
  try {
    const {
      stats: [{
        splits: [{
          stat
        }]
      }]
    } = json;
    seasonStats = stat;
  } catch (e) {
    seasonStats = {};
  }
  const season = seasonId.match(/^(\d{4})(\d{4})$/).slice(1).join(' – ');
  const {
  	games,
    goals,
    assists,
    points,
   	plusMinus,
   	pim,
    powerPlayPoints,
    shortHandedPoints,
    gameWinningGoals,
    shots,
    faceOffPct, //no faceoff wins here
    hits,
    blocked,
    wins,
    goalAgainstAverage,
    saves,
    shotsAgainst,
    savePercentage,
    shutouts
  } = seasonStats;
  return {
    games,
    goals,
    assists,
    points,
   	plusMinus,
   	pim,
    powerPlayPoints,
    shortHandedPoints,
    gameWinningGoals,
    shots,
    faceOffPct, //no faceoff wins here
    hits,
    blocked,
    wins,
    goalAgainstAverage,
    saves,
    shotsAgainst,
    savePercentage,
    shutouts
  };
};

const onPlayerGamesChange = async (select) => {
  //grab info from row, modify the gamesLeft property, update the scoreboard
  let row = select.parentNode.parentNode;
  let tbl = row.parentNode.parentNode;
  let playerName = row.cells[0].innerHTML;
  if(tbl.id == "tblMyTeam"){
    for(let i=0;i<=myRoster.member.length-1;i++){
      if(myRoster.member[i].player.fullName == playerName){
        myRoster.member[i].gamesLeft = select.value;
        i=myRoster.member.length;
      }
    }
  }
  if(tbl.id == "tblVSTeam"){
    for(let i=0;i<=opponentRoster.member.length-1;i++){
      if(opponentRoster.member[i].player.fullName == playerName){
        opponentRoster.member[i].gamesLeft = select.value;
        i=opponentRoster.member.length;
      }
    }
  }
  updateScoreboard();
}

const addPlayer = async (manager) => {
  const playerSelect = document.querySelector('select[name="roster"]');
  const seasonSelect = document.querySelector('select[name="season"]');
  const teamSelect = document.querySelector('select[name="teams"]');
  const player = await fetchPlayer(playerSelect.value);

  //player error trapping
  let playerConflict = false;
  for(let i=0; (i<=myRoster.member.length-1 && !playerConflict); i++){
    if(myRoster.member[i].player.id == player.id){
        playerConflict = true;
        alert("The player you are trying to add is already on your roster.");
    }
  }
  for(let i=0; i<=opponentRoster.member.length-1 && !playerConflict;i++){
    if(opponentRoster.member[i].player.id == player.id){
      playerConflict = true;
      alert("The player you are trying to add is already on your opponent's roster.");
    }
  }
 
  //if no conflict, get games, stats and avgstats, add player to the appropriate roster object, create the select to modify games left, add player to view and slap an eventlistener on the select, at the end, update the scoreboard
  if (!playerConflict){
    const playerGames = await fetchSchedule(teamSelect.value);
    const stats = await fetchStats(playerSelect.value, seasonSelect.value);
    const avgStats = await averageOutStats(stats);
    let tbl;
    if(manager==0){
      myRoster.member.push({player:player,gamesLeft:playerGames,avgStats:avgStats});
      tbl = document.getElementById('tblMyTeam');
    }
    if(manager==1){
      opponentRoster.member.push({player:player,gamesLeft:playerGames,avgStats:avgStats});
      tbl = document.getElementById('tblVSTeam');
    };
    
    row = tbl.insertRow(tbl.rows.lentgh);
    var cell1 = row.insertCell(0), cell2 = row.insertCell(1), cell3 = row.insertCell(2);
    let playerName = document.createTextNode(player.fullName);
    cell1.appendChild(playerName);
    //to set the select properly
    let x = [0,1,2,3,4,5,6];
    for(let i=0;i<x.length-1;i++){
      if(playerGames==x[i]){
        x[0]=playerGames;
        x[i]=0;
      }
    }
    //add the selects for gamesLeft and add event listener
    if(manager==0){
      cell2.innerHTML= '<select id="myRosterGamesSelect'+myRoster.member.length+'" onchange="onPlayerGamesChange(this)"><option value='+x[0]+'>'+x[0]+'</option><option value='+x[1]+'>'+x[1]+'</option><option value='+x[2]+'>'+x[2]+'</option><option value='+x[3]+'>'+x[3]+'</option><option value='+x[4]+'>'+x[4]+'</option><option value='+x[5]+'>'+x[5]+'</option><option value='+x[6]+'>'+x[6]+'</option></select>';
      let thisSelect = document.querySelector('select[id="myRosterGamesSelect'+myRoster.member.length+'"]');
      //thisSelect.addEventListener('change', onPlayerGamesChange(thisSelect));
    }
    if(manager==1){
      //the onchange isn't working
      cell2.innerHTML= '<select id="myRosterGamesSelect'+opponentRoster.member.length+'" onchange="onPlayerGamesChange(this)"><option value='+x[0]+'>'+x[0]+'</option><option value='+x[1]+'>'+x[1]+'</option><option value='+x[2]+'>'+x[2]+'</option><option value='+x[3]+'>'+x[3]+'</option><option value='+x[4]+'>'+x[4]+'</option><option value='+x[5]+'>'+x[5]+'</option><option value='+x[6]+'>'+x[6]+'</option></select>';
      let thisSelect = document.querySelector('select[id="opponentRosterGamesSelect'+opponentRoster.member.length+'"]');
      //thisSelect.addEventListener('change', onPlayerGamesChange(thisSelect));
    }
    //remove button
    cell3.innerHTML='<input type="button" value="Remove" onclick="removePlayer('+manager+',this)"/>';
    
    updateScoreboard();
  }
};

const removePlayer = async(manager, btn) => {
  let row = btn.parentNode.parentNode;
  let playerName = row.cells[0].innerHTML;

  if(manager==0){
    for(let i=0; i<=myRoster.member.length-1;i++){
      if(myRoster.member[i].player.fullName===playerName){
        myRoster.member.splice(i,1);
        row.parentNode.removeChild(row);
      }
    }
  }
  if(manager==1){
    for(let i=0; i<=opponentRoster.member.length-1;i++){
      if(opponentRoster.member[i].player.fullName===playerName){
        opponentRoster.member.splice(i, 1);
        row.parentNode.removeChild(row);
      }
    }
  }
  
  updateScoreboard();
}

async function loadYahoo() {
  let response = await fetch(yapapi.baseUrl+'/appcreds', {method: 'GET'});
  let data = await response.json();
  window.location.href = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${data.clientid}&redirect_uri=${data.redirect_uri}&response_type=code&language=en-us`;
}

async function getToken(){
  let code = window.location.pathname.split('code=')
  code = code[1];
  console.log(yapapi.baseUrl+'/get_token?code='+code);
  let response = await fetch(yapapi.baseUrl+'/get_token?code='+code, {method:'GET'});
  let data = await response.json();
  return data
}

const main = async () => {
  if(window.location.pathname == 'https://thebeau.dev/yap/yap.html'){
    if (window.confirm("Would you like YAP to use Yahoo Fantasy Data?")){
      loadYahoo();
    }
  }
  if(window.confirm("Would you like YAP to get Token?")){
      console.log(getToken())
  }

};
main();