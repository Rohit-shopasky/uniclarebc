

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
const ccpPath = './connection.json';
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


module.exports = {
    async store_wallet(req){
        
        if(req.body.type)
        var {certificate,privatekey,type,mspid,orgname,username}=req.body;
        if(req.query.type)
        var {certificate,privatekey,type,mspid,orgname,username} = req.query;
       
      
        
       

        certificate = certificate.replace(/\\n/g,"\n");
        certificate = certificate.replace(/\\r/g,"\r");
        certificate = certificate.replace(/⏎/g,"\n")
        privatekey = privatekey.replace(/\\n/g,"\n");
        privatekey = privatekey.replace(/\\r/g,"\r");
        privatekey = privatekey.replace(/⏎/g,"\n");
        //console.log("header_data");
        
        let wallet_data = {};
        wallet_data.type = type;
        wallet_data.mspId= mspid;
        wallet_data.certificate = certificate;
        wallet_data.privateKey = privatekey;
        wallet_data.orgName = orgname;
        wallet_data.userName = username;

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
  
         // delete wallet if exisit
         
         await module.exports.remove_wallet(wallet_data.userName);
        try{
       await wallet.import(wallet_data.userName,wallet_data);
        }
        catch(error) {console.log("Error in user certificates or private key"); return -1;}
        console.log("wallet imported");
       return wallet_data; 
    },

    async remove_wallet(directory_name)
    {
        rimraf.sync("./wallet/" +directory_name);
        return 1;
    }
}