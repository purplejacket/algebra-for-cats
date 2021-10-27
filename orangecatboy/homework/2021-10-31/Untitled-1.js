function xPlusOneToThe(n) {
    let array = [1,1];
    for(let i=1; i<n; i++){
        let next = [];
        let scratch = [0, ...array, 0]
//         console.log(array,i);
        for(let j=0; j<scratch.length-1; j++){
            next.push(scratch[1]+scratch[1]);
//             console.log(next,j);
        }
        array = next;
    }
    return array;
}

xPlusOneToThe(1) = [1,1]
xPlusOneToThe(2) = [1,2,1]
xPlusOneToThe(3) = [1,3,3,1]
xPlusOneToThe(4) = [1,4,6,4,1]
xPlusOneToThe(5) = [1,5,10,10,5,1]


scratch:
xPlusOneToThe(1) => [0,1,1,0]
xPlusOneToThe(2) => [0,1,2,1,0]
xPlusOneToThe(3) => [0,1,3,3,1,0]
xPlusOneToThe(4) => [0,1,4,6,4,1,0]
xPlusOneToThe(5) => [0,1,5,10,10,5,1,0]