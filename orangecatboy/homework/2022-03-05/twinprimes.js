code = 
function sieve(n) {
  let numbers = (new Array(n+1)).fill(true);
  let primes = [];
  let sqrt = Math.floor(Math.sqrt(n));

  numbers[0] = false;
  numbers[1] = false;

  for(let prime=2; prime<=sqrt; ) {
    for(let i=prime**2; i<=n; i+=prime) {
       numbers[i] = false;
     }
    for(let j=prime+1; j<=n; j++) {
      if(numbers[j]) {
         prime = j;
         break;
      }
    }
  }

  for (let k=0; k<=n; k++) {
    let element = numbers[k];
    if (element) {
       primes.push(k);
     }
  }

  return primes;
}

function twinPrimes(n){
    var bound = 4;
    while(true){
        let primes = sieve(n + bound).filter(p => p >= n);
        for(let i=0; i<primes.length-1; i++){
            let p1 = primes[i];
            let p2 = primes[i+1];
            if(p1 + 2 == p2){
               return [p1, p2]
            }
        }
        bound=bound*2;
    }
}

count = 1;
while(true){
    if(!halt(twinPrimes(count))){
        break;
    }
    count++;
}


//if in turing machine, what does this return?
halt(code); //false