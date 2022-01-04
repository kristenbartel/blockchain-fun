const SHA256 = require('crypto-js/sha256');
// this connects the library crypto-js and the supported hashes within.
// I believe that this is one of many hash options in the lib.

class block{
    // a class is a blueprint for creating objects
    constructor(index, timestamp, data, previousHash = ``){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + JSON.stringify(this.data)).toString();
        // this line passes long the parameters above into the calculation in string form
        // it is then passed above to the this.hash which will provide the calculation for any given hash. 
    }
}

class blockchain{
    constructor(){
            this.chain = [this.createGenesisBlock()];
            // This initializes the chain as a array
    }

    createGenesisBlock(){
        return new block(0, "01/01/2021", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }



    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let kristenCoin = new blockchain();
kristenCoin.addBlock(new block(1, "10/01/21", { amount: 4}));
kristenCoin.addBlock(new block(2, "12/01/21", { amount: 10}));

console.log(JSON.stringify(kristenCoin, null, 4));
console.log(`Is chain valid? ` +  kristenCoin.isChainValid());
