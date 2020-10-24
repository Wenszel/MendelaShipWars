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
    shipManager(shipSize, pos, direction, "usedComputerSquers")
}
//funkcja pomocniczna która generuje pozycje 
function generatePosition(){
    var position = Math.floor(Math.random() * (sizeX*sizeY))
    return position
}