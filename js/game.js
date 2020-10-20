var squersShotedByPlayer = []
var squersShotedByComputer = []
var shipsOnComputerPlayground = []
var shipsOnPlayerPlayground = []
var playerTurn = true
var winner = null
var winChecker = (playground, squersShoted) => playground.every(i => squersShoted.includes(i))
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
                if(shipsOnComputerPlayground.includes(position)){
                    this.style.backgroundImage="url(images/cross.png)";
                }else{
                    this.style.backgroundImage = "url(images/dot.png)";
                    playerTurn=false
                    
                    setTimeout(computerShot, 1000)
                   
                    
                }
                if(winChecker(shipsOnComputerPlayground,squersShotedByPlayer)){
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
var inCharge
var lastShooted
//TODO: algorytm dobijania statkow
//TODO: algorytm szukajacy najwiekszego statku na mapie
//TODO: po dobiciu statku ma sie zaczerwienic
function computerShot(){    
    do{
        if(inCharge){
        var position= lastShooted+10
        }
        var position = Math.floor(Math.random() * (sizeX*sizeY))
    }while(squersShotedByComputer.includes(position))
        squersShotedByComputer.push(position)
        if(shipsOnPlayerPlayground.includes(position)){
            inCharge = true
            lastShooted = position
            playerPlaygroundTable[position].style.backgroundImage = "url(images/cross.png)";
            if(winChecker(shipsOnPlayerPlayground,squersShotedByComputer)){
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
                setTimeout(computerShot,1000)
            }
        }else{
            inCharge = false
            playerPlaygroundTable[position].style.backgroundImage = "url(images/dot.png)";
            playerTurn=true
}

}