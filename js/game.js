var squersShotedByPlayer = []
var squersShotedByComputer = []
var shipsOnComputerPlayground = []
var shipsOnPlayerPlayground = []
var playerTurn = true
var winner = null
var winChecker = (playground, squersShoted) => playground.every(i => squersShoted.includes(i))
function startGame(){
    //usuniecie wszystkich listenerow
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
                    this.style.backgroundColor="url(images/cross.png)";
                }else{
                    this.style.backgroundImage = "url(images/dot.png)";
                    playerTurn=false
                    
                    computerShot()
                
                    if(winChecker(shipsOnPlayerPlayground,squersShotedByComputer)){
                        alert("przegrales")
                    }
                }
                if(winChecker(shipsOnComputerPlayground,squersShotedByPlayer)){
                    setTimeout(function(){alert("wygrales")},500)
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
function computerShot(){
    setTimeout(function(){
    do{
        var position = Math.floor(Math.random() * (sizeX*sizeY))
    }while(squersShotedByComputer.includes(position))
    
        squersShotedByComputer.push(position)
        if(shipsOnPlayerPlayground.includes(position)){
            playerPlaygroundTable[position].style.backgroundImage = "url(images/cross.png)";
            playerTurn=true
        }else{
            playerPlaygroundTable[position].style.backgroundImage = "url(images/dot.png)";
            playerTurn=true
        }
},1000)

}