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
                    setTimeout(function(){alert("Wygrałeś")
                    reloadGame()
                    },500)
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
            var shootedShipSize = 0
            ship.forEach(function(i){
                playerPlaygroundTable[i].style.backgroundColor = "red"
                shootedShipSize+=1
            })
            var shootedShipPosition = ship[0]
            var shootedShipDiretion 
                //kierunek generowanego statku okreslamy na podstawie tego czy o 10 pozycji na planszy jest ten sam squer co w drugim elemencie tablicy ship
                if(playerPlaygroundTable.indexOf(ship[0])+10==playerPlaygroundTable.indexOf(ship[1])){
                    shootedShipDiretion=1
                }else{
                    shootedShipDiretion=0
                }
                shipManager(shootedShipSize,shootedShipPosition, shootedShipDiretion, "squersShooted")

                directionOfShootingCounter=0
                isLastShootedShipSunked=true
                return true
        }else{
                isLastShootedShipSunked=false
                return false
        }
    }
}
function reloadGame(){
    squersShotedByPlayer = []
    squersShotedByComputer = []
    computerShipsCordinates = [] 
    playerShipsCordinates = []
    playerTurn = true
    winner = null
    document.getElementById("playerPlayground").innerHTML = "<h1>PLAYER</h1>"
    document.getElementById("computerPlayground").innerHTML = "<h1>COMPUTER</h1>"
    generatePlayerPlayground()
    generateComputerPlayground()
}
var isLastShootedShipSunked = true
var lastShootedPosition 
var firstShootedPosition 
var shootedShipDirection
var directionOfShooting = [1,-1,10,-10]

var directionOfShootingCounter = 0
function isShootingSuitable(position){
    if(position<0||position>99){
        directionOfShootingCounter++
        return false
    }
    else if(((position-(position%10)<firstShootedPosition-(firstShootedPosition%10))||(position-(position%10)>firstShootedPosition-(firstShootedPosition%10)))
    &&(directionOfShootingCounter==0||directionOfShootingCounter==1)){
        directionOfShootingCounter++
        return false
    }else{
        return true
    }
}
function computerShot(){    
    //w tej petli rozgrywa sie algorytm dobijania
    var position
    
    do{
        if(isLastShootedShipSunked){
            position = generatePosition()  
            lastShootedPosition = position
            firstShootedPosition = position
        }else{
            position = lastShootedPosition+directionOfShooting[directionOfShootingCounter]
            while(!isShootingSuitable(position)){
                position = lastShootedPosition+directionOfShooting[directionOfShootingCounter]
            }
            lastShootedPosition = position
            if(playerShipsCordinates.flat().includes(position)){
                
            }else{
                directionOfShootingCounter++
                lastShootedPosition=firstShootedPosition
            }
        }
    }while(squersShotedByComputer.includes(position))
        squersShotedByComputer.push(position)
        if(playerShipsCordinates.flat().includes(position)){
            playerPlaygroundTable[position].style.backgroundImage = "url(images/cross.png)";
            checkIsSunk(position, 1)
            if(winChecker(playerShipsCordinates.flat(),squersShotedByComputer)){
                setTimeout(function(){

                
                var revange = confirm("Przegrałeś :( Rewanz?")
                if (revange) reloadGame() 
            },500)   
            }else{
                setTimeout(computerShot,1000)
            }
        }else{
            playerPlaygroundTable[position].style.backgroundImage = "url(images/dot.png)";
            playerTurn=true
}

}