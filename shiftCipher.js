function reduce(n, max) {
    if (n < 0) {
        while (n < 0) {
            n = n + max;
        }
    } else {
        if (n > max-1) {
            while (n > max-1) {
                n = n - max;
            }
        }
    }
    return n;
}

function shift(str, n) {
    const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    str = str.toUpperCase();
    let result = "";
    n = reduce(n, 26);
    for (let i = 0; i < str.length; i++) {
        let new_index = n + alph.indexOf(str[i]);
        new_index = reduce(new_index, 26);
        result += alph[new_index];
    } 
    return result;
} 

console.log(shift('abcd', 52));
//console.log(process.argv);