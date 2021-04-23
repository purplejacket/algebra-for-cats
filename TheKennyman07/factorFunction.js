function factor(n) {
    let sqrt = Math.floor(Math.sqrt(n));
    let pToTry = sieve(sqrt);
    let rArray = [];
    for(let d of pToTry){
        while(Number.isInteger(n/d)){
          n = n/d;
          rArray.push(d);
        }
        if(n == 1){
          break;
        }
    }
    if(n > 1){
        rArray.push(n);
    }
    return rArray;
}
