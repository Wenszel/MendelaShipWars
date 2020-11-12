function shipManager(shipSize, position, direction, task){
    zadanie = task
    task = function(i){
        if(zadanie == "usedPlayerSquers"){
            usedPlayerPlaygroundSquers.push(i)
        }else if(zadanie == "usedComputerSquers"){
            usedComputerPlaygroundSquers.push(i)
        }else if(zadanie == "releasePlayerSquers"){
            releaseUsedSquer(i)
        }else if(zadanie =="squersShooted"){
            squersShotedByComputer.push(i)
        }
    
    }
// funkcja działa na tej samej zasadzie co generateComputerShip
    if(direction==0){ 
        var tablica = []
        for(i = 0;i<shipSize;i++){
            task(position+i)
            tablica.push(position+i)
        }
        if(zadanie == "usedPlayerSquers"){
            playerShipsCordinates.push(tablica)
        }else if( zadanie == "usedComputerSquers"){
            computerShipsCordinates.push(tablica)
            //odkomentuj do zmiany statkow przeciwnika na widoczny kolor
            /*tablica.forEach(function(i){
                computerPlaygroundTable[i].style.backgroundColor = "white"
            })*/
        }else if(zadanie =="releasePlayerSquers"){
            //TODO:   bot ktory sprawdza w ktorych miejscach na mapie znajdzie sie statek
            for(var i=0;i<playerShipsCordinates.length;i++){
                if (tablica[0] == playerShipsCordinates[i][0] ){
                    var index = i
                }
            }
            playerShipsCordinates.splice(index,1)
        }
        if(position%100<10){
            if(position%10==0){
                for(i=0;i<shipSize;i++){
                    task(position+i+10)
                }
                task(position+shipSize)
                task(position+10+shipSize)
            }
            else if((position+shipSize-1)%10==9){
                task(position-1)
                task(position+10-1)
                for(i=0;i<shipSize;i++){
                    task(position+i+10)
                }             
            }else{
                task(position-1)
                task(position+10-1)
                task(position+shipSize)
                task(position+10+shipSize)
                for(i=0;i<shipSize;i++){
                    task(position+i+10)
                }
            }
        }else if(position%100>90){
            if(position%10==0){
                for(i=0;i<shipSize;i++){
                    task(position+i-10)
                }
                task(position+shipSize)
                task(position-10+shipSize)
            }
            else if((position+shipSize-1)%10==9){
                task(position-1)
                task(position-10-1)
                for(i=0;i<shipSize;i++){
                    task(position+i-10)
                }  
            }else{
                task(position-1)
                task(position-10-1) 
                task(position+shipSize)
                task(position-10+shipSize)
                for(i=0;i<shipSize;i++){
                    task(position+i-10)
                }
            }
        }else{
            if(position%10==0){
                for(i=0;i<shipSize;i++){
                    task(position+i-10)
                    task(position+i+10)
                }
                task(position+shipSize)
                task(position-10+shipSize)
                task(position+10+shipSize)
            }
            else if((position+shipSize-1)%10==9){
                task(position-1)
                task(position-10-1)
                task(position+10-1)
                for(i=0;i<shipSize;i++){
                    task(position+i-10)
                    task(position+i+10)
                }
            }else{
                task(position-1)
                task(position-10-1)
                task(position+10-1)
                task(position+shipSize)
                task(position-10+shipSize)
                task(position+10+shipSize)
                for(i=0;i<shipSize;i++){
                    task(position+i-10)
                    task(position+i+10)
                }
            }
        }    
    }
    if(direction==1){ 
        var tablica = []
        for(i = 0; i<shipSize;i++){
            task(position+(i*10))
            tablica.push(position+(i*10))
        }
        if(zadanie == "usedPlayerSquers"){
            playerShipsCordinates.push(tablica)
        }else if(zadanie == "usedComputerSquers"){
            computerShipsCordinates.push(tablica)
            //odkomentuj do zmiany statkow przeciwnika na widoczny kolor
            /*
            tablica.forEach(function(i){
                computerPlaygroundTable[i].style.backgroundColor = "white"
            })*/
        }
        else if(zadanie =="releasePlayerSquers"){
            //TODO:   bot ktory sprawdza w ktorych miejscach na mapie znajdzie sie statek
            for(var i=0;i<playerShipsCordinates.length;i++){
                if (tablica[0] == playerShipsCordinates[i][0] ){
                    var index = i
                }
            }
            playerShipsCordinates.splice(index,1)
        }
        for(i = 0;i<shipSize;i++){
            task(position+(i*10))
        }
        if(position%10==0){
            if(position%100<10){
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)+1)
                }
                task(position+(shipSize*10)+1)
                task(position+(10*shipSize))
            }
            else if((position+shipSize)%100>=90){
                task(position-10)
                task(position-10+1)
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)+1)
                }             
            }else{
                task(position-10)
                task( position-10+1)
                task( position+(10*shipSize))
                task( position+(10*shipSize)+1)
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)+1)
                }
            }
        }else if(position%10==9){
            if(position%100<10){
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)-1)
                }
                task(position+(shipSize*10))
                task( position-1+(shipSize*10))
            }
            else if((position+shipSize)%100>=90){
                task(position-10)
                    task( position-10-1)
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)-1)
                }  
            }else{
                task(position-10)
                task(position-10-1)
                task(position+(shipSize*10))
                task(position-1+(shipSize*10))
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)-1)
                }
            }
        }else{
            if(position%100<10){
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)-1)
                    task(position+(i*10)+1)
                }
                task(position+(shipSize*10)-1)
                task(position+(shipSize*10))
                task(position+(shipSize*10)+1)
            }
            else if((position+shipSize)%100>=90){
                task(position-10-1)
                task(position-10)
                task(position-10+1)
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)-1)
                    task(position+(i+10)+1)
                }                        
            }else{
                task(position-10-1)
                task(position-10)
                task(position-10+1)
                for(i=0;i<shipSize;i++){
                    task(position+(i*10)-1)
                    task(position+(i*10)+1)
                }
                task(position+(shipSize*10)-1)
                task(position+(shipSize*10))
                task(position+(shipSize*10)+1)
            }
        }
    }            
}
