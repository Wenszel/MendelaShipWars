var selectedShip 
var selectedShipSize
var selectedShipDirection = 0
var shipsTable = []
var shipsOnPlayground = []
var playerPlayground = document.getElementById("playerPlayground")
var playerPlaygroundTable = []
var usedPlayerPlaygroundSquers = []
var canBePlaced = true
var mouseClickHandler = function(event) {
    var position = playerPlaygroundTable.findIndex(e => e==event.target)
    if(selectedShip!=null){
        if(selectedShipDirection==0){
            position = checkIsSizeSuitable(position, selectedShipDirection)
            checkCanBePlaced(position, 1)
            if(canBePlaced){   
                shipManager(selectedShipSize, position, selectedShipDirection, "usedPlayerSquers")
                //tworzymy tablice do ktorej zapisujemy divy skladajace sie na statek zeby potem mozna bylo go usunac z mapy => patrz else tego ifa
                var tablica = []
                for (i = 0; i<selectedShipSize;i++){
                    tablica.push(playerPlaygroundTable[position+i])
                }
                shipsOnPlayground.push(tablica)
                shipsMenu.removeChild(selectedShip)
                selectedShip = null
                changeColorOfShipsToblue()
            }
        }else{
            position = checkIsSizeSuitable(position, selectedShipDirection) 
            checkCanBePlaced(position, 10)
            if(canBePlaced){
                shipManager(selectedShipSize, position, selectedShipDirection, "usedPlayerSquers")
                var tablica = []
                for (i = 0; i<selectedShipSize;i++){
                    tablica.push(playerPlaygroundTable[position+(i*10)])
                }
                shipsOnPlayground.push(tablica)
                shipsMenu.removeChild(selectedShip)
                selectedShip = null
                changeColorOfShipsToblue()
            }
        }
       
        
    //jezeli nie ma zaznaczonego zadnego statku to mozna usuwac statek z planszy
    }else{
        //sprawdzamy dla wszystkich statkow ktory statek znajduje sie na kliknietej pozycji
        shipsOnPlayground.forEach(function(ship){
            if(ship.includes(playerPlaygroundTable[position])){
                counter= ship.length
                ship.forEach(function(shipSquer){
                    shipSquer.style.backgroundColor= "antiquewhite"
                })
                generatePlayerShipMenu(counter)
                //Ta czesc kodu odpowiada za usuniecie z usedSquers zajetych przez ten statek pozycji
                var generatedShipPosition = playerPlaygroundTable.indexOf(ship[0])
                var generatedShipDiretion 
                //kierunek generowanego statku okreslamy na podstawie tego czy o 10 pozycji na planszy jest ten sam squer co w drugim elemencie tablicy ship
                if(playerPlaygroundTable.indexOf(ship[0])+10==playerPlaygroundTable.indexOf(ship[1])){
                    generatedShipDiretion=1
                }else{
                    generatedShipDiretion=0
                }
                var generatedShipSize = counter
                //funkcja usuwajace usedSquery
                shipManager(generatedShipSize,generatedShipPosition,generatedShipDiretion, "releasePlayerSquers")
                //usuwa ze shipsOnPlayground wybrany statek
                shipsOnPlayground.splice(shipsOnPlayground.indexOf(ship),1)
            }
        })
}
//pojawienie sie przycisku jezeli wszystkie 10 statkow beda na mapie
if(shipsOnPlayground.length==10){
    document.getElementById("startGame").style.visibility="visible"
}else{
    document.getElementById("startGame").style.visibility="hidden" 
}
                    
}  
function generatePlayerPlayground(){
        //wygeneruj plansze
        shipsTable = []
        shipsOnPlayground = []
        playerPlaygroundTable = []
        usedPlayerPlaygroundSquers = []
        for(i = 0; i<sizeX; i++){
            for(j= 0;j<sizeY;j++){
                //dodajemy kwadraty na planszy
                var squer = document.createElement("div")
                squer.classList.add("squer")
                playerPlaygroundTable.push(squer)
                playerPlayground.appendChild(squer)
                //gdy mysza wjedzie kwadrat => kolorowanie kwadratu na czerwono/zielono
                
                squer.addEventListener("mouseenter",function(event){
                    if(selectedShip!=null){
                        //pozycja to miejsce na planszy na ktorym jest myszka
                        var position = playerPlaygroundTable.findIndex(e => e==event.currentTarget)
                        canBePlaced = true
                        if(selectedShipDirection==0){
                            //sprawdzamy czy sie zmiesci statek
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,1)
                            if(canBePlaced){
                                changeColorOfSquers(position, "green",1)  
                            }else{
                                changeColorOfSquers(position, "red",1)  
                            }
                        }else{
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,10)
                            if(canBePlaced){
                                changeColorOfSquers(position, "green",10)  
                            }else{
                                changeColorOfSquers(position, "red",10)  
                            }
                        }               
                    }
                })
                //gdy myszka wyjdzie z kwadratu => kolorowanie kwadratu na czerwono/zielono
                squer.addEventListener("mouseleave",function(event){
                    if(selectedShip!=null){
                        var position = playerPlaygroundTable.findIndex(e => e==event.currentTarget)
                        if(selectedShipDirection==0){
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            changeColorOfSquers(position, "antiquewhite", 1)
                        }else{
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            changeColorOfSquers(position, "antiquewhite", 10)
                        }  
                        changeColorOfShipsToblue()
                    }
                    
                })
                //gdy klikniete => postawienie statku, usuniecie statku 
                
                squer.addEventListener("click", mouseClickHandler)
                
                squer.addEventListener("contextmenu",function(event){
                    if(selectedShip!=null){
                        event.preventDefault()
                        
                        var position =  playerPlaygroundTable.findIndex(e => e==event.target)
                        canBePlaced = true
                        if(selectedShipDirection==0){
                                selectedShipDirection=1
                            //to jest kod ktory zamienia kwadraty wokol statku przy obrocie na bialy
                            if(position%10+selectedShipSize<9){
                                changeColorOfSquers(position, "antiquewhite", 1)
                            }else{
                                for(i=0; i<selectedShipSize;i++){
                                    playerPlaygroundTable[position-(position%10)+9-i].style.backgroundColor="antiquewhite"
                                }
                            }
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,10)
                            changeColorOfShipsToblue() 
                            if(canBePlaced){
                                changeColorOfSquers(position, "green", 10)
                            }else{
                                changeColorOfSquers(position, "red", 10)
                            }
                        }else{
                            selectedShipDirection=0
                            if(position+(((selectedShipSize-1)*10))<99){
                                changeColorOfSquers(position, "antiquewhite", 10)
                            }else{
                                for(i=0; i<selectedShipSize;i++){
                                    playerPlaygroundTable[((position%10)+90)-(i*10)].style.backgroundColor="antiquewhite"
                                }
                            }
                            
                            position = checkIsSizeSuitable(position, selectedShipDirection)
                            checkCanBePlaced(position,1)
                            changeColorOfShipsToblue() 
                            if(canBePlaced){
                                changeColorOfSquers(position, "green", 1)
                            }else{
                                changeColorOfSquers(position, "red", 1)
                            }
                        }
                        
                }
                })      
        }
        var clearBoth = document.createElement("div")
        clearBoth.style.clear = "both"
        playerPlayground.appendChild(clearBoth)
    }
    
    ships.forEach(function(shipSize){
        generatePlayerShipMenu(shipSize)
    }
    )
    //Ustawiamy pierwszy statek jako ten domyslny
    selectedShip = shipsTable[0]
    selectedShipSize=4
    selectedShip.style.backgroundColor="blue"


}
//funkcja ktora generuje menu statkow obok planszy
function generatePlayerShipMenu(shipSize){
    var shipsMenu = document.getElementById("shipsMenu")
    //dodajemy statek
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
    //dodajemy listener onclick
    ship.addEventListener("click",function(){
        //ten warunek odpowiada za odznaczenie wybranego statku 
        if(selectedShip == this){
            //pobierane sa divy skladajace sie na statek i ich background color zmienia sie na zwykly
            selectedSquers = selectedShip.childNodes
            selectedSquers.forEach(function(i,j){
                selectedSquers[j].style.backgroundColor="antiquewhite"
            })   
            //wybrany statek ustawiany jest na null co pozwala wybrac nowy statek
            selectedShip = null
            selectedShipSize=-1
        //jezeli wybrany statek to nie ten statek:
        }else{
            if(selectedShip!=null){
                //zmieniamy kolor wczesniej wybranego statku na zwykly
                selectedSquers = selectedShip.childNodes
                selectedSquers.forEach(function(i,j){
                    selectedSquers[j].style.backgroundColor="antiquewhite"
                })   
            }
            //nastepnie ustawiamy jako statek ten ktory wybralismy
            selectedShipSize = -1
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="blue"
                selectedShipSize++
            })
            selectedShip = this
    }
        })
    //najechanie na statek sprawia ze jego elementy swieca sie na czerwono chyba ze jest wybrany
    ship.addEventListener("mouseover",function(){
        if(selectedShip!=this){
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="red"
            })
        }
    })
    //zejscie ze statku sprawia ze zmienia sie kolor na zwykly
    ship.addEventListener("mouseleave",function(){
        if(selectedShip!=this){
            squers = ship.childNodes
            squers.forEach(function(i,j){
                squers[j].style.backgroundColor="antiquewhite"
            })
            
        }
    })
    //dodajemy do tablicy zawierajacej statki po lewej od playerplayground nasz statek
    shipsTable.push(ship)
    //i dodajemy do menu po lewej
    shipsMenu.appendChild(ship)
    //zwracamy nasz statek => jest to potrzebne do funkcji usuwajacej statek z planszy
    return ship;
}
//funkcja pomocnicza ktora na podstawie pozycji, koloru, mnoznika(ktory zalezy od kierunku statku poziom = 1 pion = 10) zmienia kolor na podany
function changeColorOfSquers(position, color, multiplier){
        for (i = 0; i<selectedShipSize;i++){
            playerPlaygroundTable[position+(i*multiplier)].style.backgroundColor=color;
        }     
}
//funkcja pomocnicza do okreslenia czy w danym miejscu dany statek nie bedzie zajmowal miejsc ktore zostaly juz uzyte
function checkCanBePlaced(position, multiplier){
    for(i=0;i <selectedShipSize;i++){
        if(usedPlayerPlaygroundSquers.includes(position+(i*multiplier))){
            canBePlaced = false
        }
    }
}
//funkcja pomocnicza do rozmieszczania na mapie statków => sprawdza czy dany statek pasuje na to miejsce czy bedzie wychodzil poza mape ze swoim rozmiarem
function checkIsSizeSuitable(position){
    if(selectedShipDirection==0){
        //jezeli jezeli reszta z dzielenia przez 10 pozycji + rozmiar statku jest mniejsza od samej pozycji to znaczy ze statek nie miesci sie w rzedzie
        if(((position+selectedShipSize)%10)<(position%10)){
            //w takim wypadku ustawiamy pozycje statku na ostatni pasujacy przez nia element w danym rzedzie
            position = (position%100)-(position%10)+10-(selectedShipSize)
        }
    }
    else{
        //jezeli pozycja statku + jego rozmiar jest wiekszy od 99 (czyli ostatniego indexu tablicy playerplayground) to zmieniamy pozycje na ostatnia pasujaca
        if(position+(selectedShipSize*10)>99){
            //ostatnia pasujaca pozycja jest 90+reszta dzielania z pozycji - rozmiar statku-1(-1 poniewaz pozycja juz jest pierwszym elementem statku)*10
            position = (90+(position%10))-((selectedShipSize-1)*10)
        }
    }
    return position
}
//funkcja pomocnicza do listenerów zmieniająca kolory squerów ze statkami na czarne
function changeColorOfShipsToblue(){
    shipsOnPlayground.forEach(function(ship){
        ship.forEach(function(k){
            k.style.backgroundColor="blue"
        })
        
    })
}
//funkcja pomocnicza do funkcji usuwania used squerów
function releaseUsedSquer(position){
    //pobiera index squeru który chcemy usunac z usedsquers
    var index = usedPlayerPlaygroundSquers.indexOf(position)
    //usuwa ten squer
    usedPlayerPlaygroundSquers.splice(index,1)
}