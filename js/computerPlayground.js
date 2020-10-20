var isGeneratedComputerPlayground = false
var computerPlaygroundTable = [] //przechowuje divy squery 
var computerPlayground = document.getElementById("computerPlayground")
var usedComputerPlaygroundSquers = [] //przechowuje indexy squerów które zostały uzyte do 
//funkcja generująca mapę i statki na niej
function generateComputerPlayground(){
    if(isGeneratedComputerPlayground==false){
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
        //dla kazdego statku zdefiniowanego w tabeli ships generujemy statek na mapie
        ships.forEach(function(i) { // i = rozmiar statku
            generateComputerShip(i)
        });
        isGeneratedComputerPlayground = true //zmiana boolina podowuje ze mapa sie drugi raz po kliknieciu buttona nie uruchomi
    }     
}
//funckcja generujaca statki na podstawie rozmiaru 
function generateComputerShip(shipSize){
    var direction = Math.round(Math.random()) //math.random generuje wartosc z zakresu (0,1) a round zaokragla to do 0/1 ktore definiuje kierunek generowanego statku
    var pos = generatePosition();
    //dopóki nie znajdzie się taki start point ze zmiesci sie shipSize masztowiec
    checkIsPositionCorrect:
    while(true){
        //dla poziomego statku sprawdza czy pozycja startowa i wszystkie kolejne nie są juz uzyte
        if(direction==0){
            for(i=0; i<shipSize;i++){
                if(usedComputerPlaygroundSquers.includes(pos+i)){
                    pos = generatePosition();
                    //jezeli warunek sie spelnil to zaczynamy petle od poczatku
                    continue checkIsPositionCorrect;
                }
            }
        //dla pionu
        }else{
            for(i=0; i<shipSize;i++){
                if(usedComputerPlaygroundSquers.includes(pos+(i*10))){
                    pos = generatePosition();
                    continue checkIsPositionCorrect;
                }
            }
        }
        //warunek sprawdzajacy czy pozycja startowa pozwoli na wygenerowanie statku o danym rozmiarze
        if((direction==1 && pos%100>(90-shipSize*10)) ||  
                (direction==0 && pos%10>9-shipSize)){
            pos = generatePosition();
            continue checkIsPositionCorrect;
        }
        //jezeli algorytm przejdzie wszystkie wartunki bez generowanie nowej pozycji to konczymy petle
        break;
    }
    //gdy znalezlismy pozycje w ktorej mozemy umiescic statek to dodajemy jego pozycje i wokol niego do tablicy uzytych pozycji
    if(direction==0){ // dla poziomych statkow
        //dla pierwszego rzedu
        if(pos%100<10){
            //dla pierwszej kolumny
            if(pos%10==0){
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i+10)
                }
                usedComputerPlaygroundSquers.push(pos+shipSize, pos+10+shipSize)
            }
            //dla ostatniej kolumny
            else if((pos+shipSize-1)%10==9){
                usedComputerPlaygroundSquers.push(pos-1, pos+10-1)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i+10)
                }
            //dla srodkowych kolumn             
            }else{
                usedComputerPlaygroundSquers.push(pos-1, pos+10-1, pos+shipSize, pos+10+shipSize)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i+10)
                }
            }
        //dla ostatniego rzedu
        }else if(pos%100>90){
            //dla pierwszej kolumny
            if(pos%10==0){
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i-10)
                }
                usedComputerPlaygroundSquers.push(pos+shipSize, pos-10+shipSize)
            }
            //dla ostatniej kolumny
            else if((pos+shipSize-1)%10==9){
                usedComputerPlaygroundSquers.push(pos-1, pos-10-1)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i-10)
                } 
            //dla srodkowej kolumny 
            }else{
                usedComputerPlaygroundSquers.push(pos-1, pos-10-1, pos+shipSize, pos-10+shipSize)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i-10)
                }
            }
        //dla srodkowych rzedow
        }else{
            //dla pierwszej kolumny
            if(pos%10==0){
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i-10)
                    usedComputerPlaygroundSquers.push(pos+i+10)
                }
                usedComputerPlaygroundSquers.push(pos+shipSize, pos-10+shipSize, pos+10+shipSize)
            }
            //dla ostatniej kolumny
            else if((pos+shipSize-1)%10==9){
                usedComputerPlaygroundSquers.push(pos-1, pos-10-1, pos+10-1)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i-10)
                    usedComputerPlaygroundSquers.push(pos+i+10)
                }
            //dla srodkowej kolumny
            }else{
                usedComputerPlaygroundSquers.push(pos-1, pos-10-1, pos+10-1,pos+shipSize, pos-10+shipSize,pos+10+shipSize)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+i-10)
                    usedComputerPlaygroundSquers.push(pos+i+10)
                }
            }
        }
        //dla squerow na ktorych jest statek
        for(i = 0; i<shipSize;i++){
            usedComputerPlaygroundSquers.push(pos+i)
            //computerPlaygroundTable[pos+i].style.backgroundImage = "url(../images/cross.jpg)"
            shipsOnComputerPlayground.push(pos+i)
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
            }
            else{
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
                usedComputerPlaygroundSquers.push(pos+(shipSize*10)-1, pos+(shipSize*10), pos+(shipSize*10)+1)
            }
            else if((pos+shipSize)%100>=90){
                usedComputerPlaygroundSquers.push(pos-10-1, pos-10, pos-10+1)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+(i*10)-1)
                    usedComputerPlaygroundSquers.push(pos+(i+10)+1)
                }                        
            }else{
                usedComputerPlaygroundSquers.push(pos-10-1, pos-10, pos-10+1)
                for(i=0;i<shipSize;i++){
                    usedComputerPlaygroundSquers.push(pos+(i*10)-1)
                    usedComputerPlaygroundSquers.push(pos+(i*10)+1)
                }
                usedComputerPlaygroundSquers.push(pos+(shipSize*10)-1, pos+(shipSize*10), pos+(shipSize*10)+1)
            }
        }
        for(i = 0;i<shipSize;i++){
            usedComputerPlaygroundSquers.push(pos+(i*10))
            //computerPlaygroundTable[pos+(i*10)].style.backgroundColor= "black"
            shipsOnComputerPlayground.push(pos+(i*10))
        }
    }            
}
//funkcja pomocniczna która generuje pozycje 
function generatePosition(){
    var position = Math.floor(Math.random() * (sizeX*sizeY))
    return position
}