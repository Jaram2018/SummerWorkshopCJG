function MINE() {
    this.type;
    this.open;
    this.objMine;
}
var mineInfo;

$(document).ready(function(){
    var board = $(".board");
    var indexY = 0;
    var indexX = 0;
    mineInfo = new Array(10);
    for(indexY = 0; indexY < 10; indexY++) {
        mineInfo[indexY] = new Array(10);
        var row = $(document.createElement('div'));
        row.addClass("row");
        board.append(row);
        for(indexX = 0; indexX < 10; indexX++) {
            var newMine = $(document.createElement('div'));
            newMine.addClass("mine");
            row.append(newMine);
            mineInfo[indexY][indexX] = new MINE();
            mineInfo[indexY][indexX].objMine = newMine;
            mineInfo[indexY][indexX].type = 0; //none:0, mine:-1, near mine:pos int(mine num)
            mineInfo[indexY][indexX].open = 0; //close:0, open:1
            mineInfo[indexY][indexX].objMine.on("click", ToggleOpen);
        }
    }
    RandomSetMine();
});

function RandomSetMine() {
    var indexY, indexX, index = 0;
    while(index < 10) {
        indexY = Math.floor((Math.random() * 10));
        indexX = Math.floor((Math.random() * 10));
        if(mineInfo[indexY][indexX].type == 0) {
            mineInfo[indexY][indexX].type = -1;
            index++;
        }
    }
    CountAroundMine();
}

function CountAroundMine() {
    var indexY, indexX, forX, forY;
    var cntMine, offsetY, offsetX;
    for(indexY = 0; indexY < 10; indexY++) {
        for(indexX = 0; indexX < 10; indexX++) {
            cntMine = 0;
            if(mineInfo[indexY][indexX].type == -1)
                continue;
            for(forY = -1; forY <= 1; forY++) {
                for(forX = -1; forX <= 1; forX++) {
                    offsetY = forY + indexY;
                    offsetX = forX + indexX;
                    if(offsetY == 0 && offsetX == 0)
                        continue;
                    if(offsetY >= 0 && offsetY < 10 &&
                        offsetX >= 0 && offsetX < 10) {
                            if(mineInfo[offsetY][offsetX].type == -1)
                                cntMine++;
                    }
                }
            }
            mineInfo[indexY][indexX].type = cntMine;
        }
    }
}

// function OpenMine() {
//     var indexY, indexX, cntMine;
//     for(indexY = 0; indexY < 10; indexY++) {
//         for(indexX = 0; indexX < 10; indexX++) {
//             mineInfo[indexY][indexX].open = 1;
//             cntMine = mineInfo[indexY][indexX].type;
//             mineInfo[indexY][indexX].objMine.addClass("class"+cntMine.toString());
//         }
//     }
// }

function ToggleOpen() {
    var cntMine, indexY, indexX;
    for(indexY = 0; indexY < 10; indexY++) {
        for(indexX = 0; indexX < 10; indexX++) {
            if($(this).is(mineInfo[indexY][indexX].objMine)) {
                cntMine = mineInfo[indexY][indexX].type;
                if(cntMine == -1){
                    mineInfo[indexY][indexX].objMine.addClass("class"+cntMine.toString());
                    alert("펑!");
                }
                else if(cntMine > 0) {
                    mineInfo[indexY][indexX].open = 1;
                    mineInfo[indexY][indexX].objMine.addClass("class"+cntMine.toString());
                }
                else if(cntMine == 0)
                    Eraser(indexY,indexX);
                indexY = 10;
                break;
            }
        }
    }
}

function Eraser(Y,X) {
    var offsetY = 0, offsetX = 0, __abs;
    if(mineInfo[Y][X].type == 0 && mineInfo[Y][X].open == 0){
        mineInfo[Y][X].open = 1;
        mineInfo[Y][X].objMine.addClass("class"+mineInfo[Y][X].type.toString());
        for(forY = -1; forY <= 1; forY++) {
            for(forX = -1; forX <= 1; forX++) {
                offsetY = forY + Y;
                offsetX = forX + X;
                if(forY == 0 && forX == 0)
                    continue;
                if(offsetY >= 0 && offsetY < 10 && offsetX >= 0 && offsetX < 10) {
                        __abs = offsetY - offsetX;
                        if(__abs < 0)
                            __abs = -__abs;
                        if(mineInfo[offsetY][offsetX].type == 0 && __abs == 1) {
                            Eraser(offsetY,offsetX);
                        }
                        if(mineInfo[offsetY][offsetX].type > 0) {
                            mineInfo[offsetY][offsetX].open = 1;
                            mineInfo[offsetY][offsetX].objMine.addClass("class"+mineInfo[offsetY][offsetX].type.toString());
                        }
                }
            }
        }
    }
}