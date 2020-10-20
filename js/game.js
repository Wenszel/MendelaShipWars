var squersShotedByPlayer = []
var squersShotedByComputer = []
var computerShipsCordinates = [] //przechowuje numery tablicy computerPlaygroundTable w których znajduja sie statki
var playerShipsCordinates = []
var playerTurn = true
var winner = null
var winChecker = (playground, squersShoted) => playground.every(i => squersShoted.includes(i))
var sunkCkecker = (ship, squersShoted) => ship.every(i => squersShoted.includes(i))
function startGame(){
    //usuniecie wszystkich listenerow
    playerPlaygroundTable.forEach(function(squer){
        squer.style.cursor="none"
        squer.addEventListener("click",function(event){
            alert("To twoja plansza")
        })
    })
    computerPlaygroundTable.forEach(function(squer){
        squer.style.cursor = "pointer"
        squer.addEventListener("click",function(event){
            if(playerTurn){
                var position = computerPlaygroundTable.findIndex(e => e==event.target)
                console.log(position)
                if(squersShotedByPlayer.includes(position)){
                    alert("Tu juz strzelales")
                }
                squersShotedByPlayer.push(position)
                if(computerShipsCordinates.flat().includes(position)){
                    this.style.backgroundImage="url(images/cross.png)";
                    checkIsSunk(position, 0)
                }else{
                    this.style.backgroundImage = "url(images/dot.png)";
                    playerTurn=false
                    
                    setTimeout(computerShot, 1000)
                    
                    
                }
                if(winChecker(computerShipsCordinates.flat(),squersShotedByPlayer)){
                    setTimeout(function(){alert("Wygrałeś")},500)
                }
                
            }else{
                alert("Ruch Komputera")
            }
        })
    })
    playerPlaygroundTable.forEach(function(i){
        i.removeEventListener("click", mouseClickHandler)
    })

    document.getElementById("startGame").style.visibility="hidden"
    
}
//TODO: algorytm dobijania statkow
//TODO: algorytm szukajacy najwiekszego statku na mapie
function computerShot(){    
    do{
        var position = Math.floor(Math.random() * (sizeX*sizeY))
    }while(squersShotedByComputer.includes(position))
        squersShotedByComputer.push(position)
        if(playerShipsCordinates.flat().includes(position)){
            playerPlaygroundTable[position].style.backgroundImage = "url(images/cross.png)";
            if(winChecker(playerShipsCordinates.flat(),squersShotedByComputer)){
                var revange = confirm("Przegrałeś :( Rewanz?")
                if (revange){
                    isGeneratedPlayerPlayground = false
                    isGeneratedComputerPlayground = false
                    document.getElementById("playerPlayground").removeChild
                    document.getElementById("computerPlayground").removeChild
                    generatePlayerPlayground()
                    generateComputerPlayground()
                }
                
            }else{
                checkIsSunk(position, 1)
                setTimeout(computerShot,1000)
            }
        }else{
            playerPlaygroundTable[position].style.backgroundImage = "url(images/dot.png)";
            playerTurn=true
}

}
function checkIsSunk(position, player){
    if(player == 0){
        var ship = computerShipsCordinates.find(i => i.includes(position))
        if(sunkCkecker(ship,squersShotedByPlayer)){
            ship.forEach(function(i){
                computerPlaygroundTable[i].style.backgroundColor = "red"
            })   
        }
    }else{
        var ship = playerShipsCordinates.find(i => i.includes(position))
        if(sunkCkecker(ship,squersShotedByComputer)){
            ship.forEach(function(i){
                playerPlaygroundTable[i].style.backgroundColor = "red"
            }) 
            //TODO: mozna dodac do shotedByComputer punkty wokol statku => ten durny dlugi algorytm dodany po raz kolejny XD
        }
    }
}
