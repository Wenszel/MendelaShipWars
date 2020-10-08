var selectedShip 
var selectedShipSize
var selectedShipDirection = 0
var shipsTable = []
var shipsOnPlayground = []
var playerPlayground = document.getElementById("playerPlayground")
var playerPlaygroundTable = []
var usedPlayerPlaygroundSquers = []
var canBePlaced = true
var isGeneratedPlayerPlayground = false
function generatePlayerPlayground(){
    if(isGeneratedPlayerPlayground == false){
    var shipsMenu = document.getElementById("shipsMenu")
    for(i = 0; i<sizeX; i++){
        for(j= 0;j<sizeY;j++){
            var squer = document.createElement("div")
            squer.classList.add("squer")
            playerPlaygroundTable.push(squer)
            playerPlayground.appendChild(squer)
            squer.addEventListener("mouseenter",function(event){
                if(selectedShip!=null){
                    var position = playerPlaygroundTable.findIndex(e => e==event.currentTarget)
                    canBePlaced = true
                    for(i=0;i <selectedShipSize;i++){
                        if(usedPlayerPlaygroundSquers.includes(position+i)){
                            canBePlaced = false
                        }
                    }
                    if(canBePlaced){
                    for (i = 0; i<selectedShipSize;i++){
                        if(((position+selectedShipSize)%10)<(position%10)){
                            position = (position%100)-(position%10)+10-(selectedShipSize)
                             //console.log("niedobrze")
                         }
                         if(selectedShipDirection==0){
                            playerPlaygroundTable[position+i].style.backgroundColor="green";
                         }else{
                            playerPlaygroundTable[position+(i*10)].style.backgroundColor="green";
                         }
                            
                        }
                    }else{
                        for (i = 0; i<selectedShipSize;i++){
                            if(((position+selectedShipSize)%10)<(position%10)){
                                position = (position%100)-(position%10)+10-(selectedShipSize)
                                 //console.log("niedobrze")
                             }
                             if(selectedShipDirection==0){
                                playerPlaygroundTable[position+i].style.backgroundColor="red";
                             }else{
                                playerPlaygroundTable[position+(i*10)].style.backgroundColor="red";
                             }
                    
                            
                        }
                        
                    }
                  }
                
            })
            squer.addEventListener("mouseleave",function(event){
                if(selectedShip!=null){
                var position = playerPlaygroundTable.findIndex(e => e==event.currentTarget)
                for (i = 0; i<selectedShipSize;i++){
                    if(((position+selectedShipSize)%10)<(position%10)){
                        position = (position%100)-(position%10)+10-(selectedShipSize)
                         //console.log("niedobrze")
                     }
                     if(selectedShipDirection==0){
                    playerPlaygroundTable[position+i].style.backgroundColor="antiquewhite";
                     }else{
                        playerPlaygroundTable[position+(i*10)].style.backgroundColor="antiquewhite";
                     }
               }
            }
               shipsOnPlayground.forEach(function(i,j){
                shipsOnPlayground[j].style.backgroundColor="black"
               })
             })
            squer.addEventListener("click",function(event) {
                if(selectedShip!=null){
                    if(canBePlaced){
                        var position = playerPlaygroundTable.findIndex(e => e==event.target)
                        if(((position+selectedShipSize)%10)<(position%10)){
                          position = (position%100)-(position%10)+10-(selectedShipSize)
                           //console.log("niedobrze")
                       }
                        placeShip(position, selectedShipSize, selectedShipDirection)
                        for (i = 0; i<selectedShipSize;i++){
                            if(selectedShipDirection==0){
                                shipsOnPlayground.push(playerPlaygroundTable[position+i])
                            }else{
                                shipsOnPlayground.push(playerPlaygroundTable[position+(i*10)])
                            }
                        }
                        shipsMenu.removeChild(selectedShip)
                        selectedShip = null
                }
            }
                
            }) 
            squer.addEventListener("contextmenu",function(event){
                event.preventDefault()
                if(selectedShipDirection==0){
                    selectedShipDirection=1
                }else{
                    selectedShipDirection=0
                }
            })              
        }
        var clearBoth = document.createElement("div")
        clearBoth.style.clear = "both"
        playerPlayground.appendChild(clearBoth)
    }
    ships.forEach(function(shipSize){
        var ship = document.createElement("div")
        ship.classList.add("ship")
            for(i = 0; i<shipSize; i++){
                var squer = document.createElement("div")
                squer.classList.add("squer")
                ship.appendChild(squer)
            }
        var clearBoth = document.createElement("div")
        clearBoth.style.clear = "both"
        ship.appendChild(clearBoth)
        
        ship.addEventListener("click",function(){
            if(selectedShip!=null){
            
            selectedSquers = selectedShip.childNodes
            selectedSquers.forEach(function(i,j){
                selectedSquers[j].style.backgroundColor="antiquewhite"
            })   
        }
        selectedShipSize = -1
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="blue"
                selectedShipSize++
            })
            selectedShip = this
            //ship.childNodes.style.backgroundColor= "blue";
            })
        ship.addEventListener("mouseover",function(){
            if(selectedShip!=this){
                squers = ship.childNodes
                squers.forEach(function(i,j){
                    squers[j].style.backgroundColor="red"
                })
            }
        })
        ship.addEventListener("mouseleave",function(){
            if(selectedShip!=this){
                squers = ship.childNodes
                squers.forEach(function(i,j){
                    squers[j].style.backgroundColor="antiquewhite"
                })
                
            }
        })
        shipsTable.push(ship)
        shipsMenu.appendChild(ship)
        
    })
    selectedShip = shipsTable[0]
    selectedShipSize=4
    selectedShip.style.backgroundColor="blue"
    isGeneratedPlayerPlayground = true
}

}
function placeShip(position, shipSize, direction){
    var pos = position
  //  for(i = 0; i<shipSize;i++){
  //      if(direction == 0){
  //      playerPlaygroundTable[position+i].style.backgroundColor= "black"
  //      }else{
  //          playerPlaygroundTable[position+(i*10)].style.backgroundColor= "black"
  //      }
  //  }
//dopóki nie znajdzie się taki start point ze zmiesci sie shipSize masztowiec

if(direction==0){ //poziom
    //dla pierwszego rzedu
    if(pos%100<10){
        if(pos%10==0){
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i+10)
            }
            usedPlayerPlaygroundSquers.push(pos+shipSize, pos+10+shipSize)
        }
        else if((pos+shipSize-1)%10==9){
            usedPlayerPlaygroundSquers.push(pos-1, pos+10-1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i+10)
            }             
        }else{
            usedPlayerPlaygroundSquers.push(pos-1, pos+10-1, pos+shipSize, pos+10+shipSize)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i+10)
            }
        }
    //dla ostatniego rzedu
    }else if(pos%100>90){
        if(pos%10==0){
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i-10)
            }
            usedPlayerPlaygroundSquers.push(pos+shipSize, pos-10+shipSize)
            usedPlayerPlaygroundSquers.push()
        }
        else if((pos+shipSize-1)%10==9){
            usedPlayerPlaygroundSquers.push(pos-1, pos-10-1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i-10)
            }  
        }else{
            usedPlayerPlaygroundSquers.push(pos-1, pos-10-1, pos+shipSize, pos-10+shipSize)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i-10)
            }
        }
    //dla srodkowych rzedow
    }else{
        if(pos%10==0){
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i-10)
                usedPlayerPlaygroundSquers.push(pos+i+10)
            }
            usedPlayerPlaygroundSquers.push(pos+shipSize)
            usedPlayerPlaygroundSquers.push(pos-10+shipSize)
            usedPlayerPlaygroundSquers.push(pos+10+shipSize)
        }
        else if((pos+shipSize-1)%10==9){
            usedPlayerPlaygroundSquers.push(pos-1)
            usedPlayerPlaygroundSquers.push(pos-10-1)
            usedPlayerPlaygroundSquers.push(pos+10-1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i-10)
                usedPlayerPlaygroundSquers.push(pos+i+10)
            }
            
        }else{
            usedPlayerPlaygroundSquers.push(pos-1)
            usedPlayerPlaygroundSquers.push(pos-10-1)
            usedPlayerPlaygroundSquers.push(pos+10-1)
            usedPlayerPlaygroundSquers.push(pos+shipSize)
            usedPlayerPlaygroundSquers.push(pos-10+shipSize)
            usedPlayerPlaygroundSquers.push(pos+10+shipSize)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+i-10)
                usedPlayerPlaygroundSquers.push(pos+i+10)
            }
        }
    }
    
}
if(direction==1){ //pion
   if(pos%10==0){
        if(pos%100<10){
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
            }
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10)+1, pos+(10*shipSize))
        }
        else if((pos+shipSize)%100>=90){
            usedPlayerPlaygroundSquers.push(pos-10, pos-10+1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
            }             
        }else{
            usedPlayerPlaygroundSquers.push(pos-10, pos-10+1, pos+(10*shipSize), pos+(10*shipSize)+1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
            }
        }
    //dla ostatniego rzedu
    }else if(pos%10==9){
        if(pos%100<10){
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
            }
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10), pos-1+(shipSize*10))
        }
        else if((pos+shipSize)%100>=90){
            usedPlayerPlaygroundSquers.push(pos-10, pos-10-1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
            }  
        }else{
            usedPlayerPlaygroundSquers.push(pos-10, pos-10-1, pos+(shipSize*10), pos-1+(shipSize*10))
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
            }
        }
    //dla srodkowych rzedow
    }else{
        if(pos%100<10){
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
            }
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10)-1)
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10))
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10)+1)
        }
        else if((pos+shipSize)%100>=90){
            usedPlayerPlaygroundSquers.push(pos-10-1)
            usedPlayerPlaygroundSquers.push(pos-10)
            usedPlayerPlaygroundSquers.push(pos-10+1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                usedPlayerPlaygroundSquers.push(pos+(i+10)+1)
            }                        
        }else{
            usedPlayerPlaygroundSquers.push(pos-10-1)
            usedPlayerPlaygroundSquers.push(pos-10)
            usedPlayerPlaygroundSquers.push(pos-10+1)
            for(i=0;i<shipSize;i++){
                usedPlayerPlaygroundSquers.push(pos+(i*10)-1)
                usedPlayerPlaygroundSquers.push(pos+(i*10)+1)
            }
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10)-1)
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10))
            usedPlayerPlaygroundSquers.push(pos+(shipSize*10)+1)
        }
    }
    
}            
if(direction==0){
    for(i = 0; i<shipSize;i++){
        usedPlayerPlaygroundSquers.push(pos+i)
        playerPlaygroundTable[pos+i].style.backgroundColor= "black"
    }
}else{
    for(i = 0;i<shipSize;i++){
        usedPlayerPlaygroundSquers.push(pos+(i*10))
        playerPlaygroundTable[pos+(i*10)].style.backgroundColor= "black"
    }
}

}
