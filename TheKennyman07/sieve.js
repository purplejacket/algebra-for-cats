function sieve(n) {
    let sqrt = Math.floor(Math.sqrt(n));
    let primes = [];
    let numbers = from2to(n);
    primes.push(numbers[0]);
    numbers.splice(0, 1)
    for(let i = 0; i<sqrt; i++){
        let prime = primes[i];
        for(let j = 0; j<numbers.length; j++){
            let number = numbers[j];
            let mod = number%prime;
            if(mod == 0){
                numbers.splice(j, 1);
            }
        }
        primes.push(numbers[0]);
        numbers.splice(0, 1);
    }
    let rArray = primes.concat(numbers);
    return rArray;
}
