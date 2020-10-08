var isGenerated = false
var computerPlaygroundTable = []
var computerPlayground = document.getElementById("computerPlayground")
var usedComputerPlaygroundSquers = []
function generateComputerPlayground(){
    if(isGenerated){}
    else{
        for(i = 0; i<sizeX; i++){
            for(j= 0;j<sizeY;j++){
                var squer = document.createElement("div")
                squer.classList.add("squer")
                computerPlaygroundTable.push(squer)
                computerPlayground.appendChild(squer)
            }
            var clearBoth = document.createElement("div")
            clearBoth.style.clear = "both"
            computerPlayground.appendChild(clearBoth)
        }
        ships.forEach(function(i) {
            generateShip(i, 0)
        });
        isGenerated = true
    }     
}
function generateShip(shipSize){
    var direction = Math.round(Math.random())
    var pos = generatePosition();
//dopóki nie znajdzie się taki start point ze zmiesci sie shipSize masztowiec
cokolwiek:
while(true){
    
    if(direction==0){
        for(i=0; i<shipSize;i++){
            if(usedComputerPlaygroundSquers.includes(pos+i)){
                pos = generatePosition();
                continue cokolwiek;
            }
        }
   
    }else{
        for(i=0; i<shipSize;i++){
            if(usedComputerPlaygroundSquers.includes(pos+(i*10))){
                pos = generatePosition();
                continue cokolwiek;
            }
        }
        
    }
    if((direction==1 && pos%100>(90-shipSize*10)) ||  
            (direction==0 && pos%10>9-shipSize)){
        pos = generatePosition();
        continue cokolwiek;
    }
    break;
}
if(direction==0){ //poziom
    //dla pierwszego rzedu
    if(pos%100<10){
        if(pos%10==0){
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i+10)
            }
            usedComputerPlaygroundSquers.push(pos+shipSize, pos+10+shipSize)
        }
        else if((pos+shipSize-1)%10==9){
            usedComputerPlaygroundSquers.push(pos-1, pos+10-1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i+10)
            }             
        }else{
            usedComputerPlaygroundSquers.push(pos-1, pos+10-1, pos+shipSize, pos+10+shipSize)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i+10)
            }
        }
    //dla ostatniego rzedu
    }else if(pos%100>90){
        if(pos%10==0){
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i-10)
            }
            usedComputerPlaygroundSquers.push(pos+shipSize, pos-10+shipSize)
            usedComputerPlaygroundSquers.push()
        }
        else if((pos+shipSize-1)%10==9){
            usedComputerPlaygroundSquers.push(pos-1, pos-10-1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i-10)
            }  
        }else{
            usedComputerPlaygroundSquers.push(pos-1, pos-10-1, pos+shipSize, pos-10+shipSize)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i-10)
            }
        }
    //dla srodkowych rzedow
    }else{
        if(pos%10==0){
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i-10)
                usedComputerPlaygroundSquers.push(pos+i+10)
            }
            usedComputerPlaygroundSquers.push(pos+shipSize)
            usedComputerPlaygroundSquers.push(pos-10+shipSize)
            usedComputerPlaygroundSquers.push(pos+10+shipSize)
        }
        else if((pos+shipSize-1)%10==9){
            usedComputerPlaygroundSquers.push(pos-1)
            usedComputerPlaygroundSquers.push(pos-10-1)
            usedComputerPlaygroundSquers.push(pos+10-1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i-10)
                usedComputerPlaygroundSquers.push(pos+i+10)
            }
            
        }else{
            usedComputerPlaygroundSquers.push(pos-1)
            usedComputerPlaygroundSquers.push(pos-10-1)
            usedComputerPlaygroundSquers.push(pos+10-1)
            usedComputerPlaygroundSquers.push(pos+shipSize)
            usedComputerPlaygroundSquers.push(pos-10+shipSize)
            usedComputerPlaygroundSquers.push(pos+10+shipSize)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+i-10)
                usedComputerPlaygroundSquers.push(pos+i+10)
            }
        }
    }
    
}
if(direction==1){ //pion
   if(pos%10==0){
        if(pos%100<10){
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)+1)
            }
            usedComputerPlaygroundSquers.push(pos+(shipSize*10)+1, pos+(10*shipSize))
        }
        else if((pos+shipSize)%100>=90){
            usedComputerPlaygroundSquers.push(pos-10, pos-10+1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)+1)
            }             
        }else{
            usedComputerPlaygroundSquers.push(pos-10, pos-10+1, pos+(10*shipSize), pos+(10*shipSize)+1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)+1)
            }
        }
    //dla ostatniego rzedu
    }else if(pos%10==9){
        if(pos%100<10){
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)-1)
            }
            usedComputerPlaygroundSquers.push(pos+(shipSize*10), pos-1+(shipSize*10))
        }
        else if((pos+shipSize)%100>=90){
            usedComputerPlaygroundSquers.push(pos-10, pos-10-1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)-1)
            }  
        }else{
            usedComputerPlaygroundSquers.push(pos-10, pos-10-1, pos+(shipSize*10), pos-1+(shipSize*10))
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)-1)
            }
        }
    //dla srodkowych rzedow
    }else{
        if(pos%100<10){
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)-1)
                usedComputerPlaygroundSquers.push(pos+(i*10)+1)
            }
            usedComputerPlaygroundSquers.push(pos+(shipSize*10)-1)
            usedComputerPlaygroundSquers.push(pos+(shipSize*10))
            usedComputerPlaygroundSquers.push(pos+(shipSize*10)+1)
        }
        else if((pos+shipSize)%100>=90){
            usedComputerPlaygroundSquers.push(pos-10-1)
            usedComputerPlaygroundSquers.push(pos-10)
            usedComputerPlaygroundSquers.push(pos-10+1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)-1)
                usedComputerPlaygroundSquers.push(pos+(i+10)+1)
            }                        
        }else{
            usedComputerPlaygroundSquers.push(pos-10-1)
            usedComputerPlaygroundSquers.push(pos-10)
            usedComputerPlaygroundSquers.push(pos-10+1)
            for(i=0;i<shipSize;i++){
                usedComputerPlaygroundSquers.push(pos+(i*10)-1)
                usedComputerPlaygroundSquers.push(pos+(i*10)+1)
            }
            usedComputerPlaygroundSquers.push(pos+(shipSize*10)-1)
            usedComputerPlaygroundSquers.push(pos+(shipSize*10))
            usedComputerPlaygroundSquers.push(pos+(shipSize*10)+1)
        }
    }
    
}            
if(direction==0){
    for(i = 0; i<shipSize;i++){
        usedComputerPlaygroundSquers.push(pos+i)
        computerPlaygroundTable[pos+i].style.backgroundColor= "black"
    }
}else{
    for(i = 0;i<shipSize;i++){
        usedComputerPlaygroundSquers.push(pos+(i*10))
        computerPlaygroundTable[pos+(i*10)].style.backgroundColor= "black"
    }
}


}
function generatePosition(){
    var position = Math.floor(Math.random() * (sizeX*sizeY))
    return position
}