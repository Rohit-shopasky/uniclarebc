
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const ccpPath = './connection.json';
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);



module.exports = {



    async enrollUser(req, res) {
       
        if(req.body.orgname )
        var header_data=req.body;
        if(req.query.orgname)
        var header_data = req.query;
           
        
        
        
        let orgName = header_data.orgname;
        let userName= header_data.username;
        let gender  = header_data.gender;
        let contact = header_data.contact;
        let address = header_data.address;
        let dob     = header_data.dob;
        let wallet_type = header_data.wallet_type;
       

        
        if(orgName===undefined || userName===undefined || orgName.length==0 || userName.length==0) 
        {
            console.log("Aya");
            res.json({status:false,data:"",msg:"orgName and userName both are required!"});
            return;
        } 

        let orgMSP = ""; let ca_url = ""; let admin_identity_name =""; let dept = "";

        if (orgName.localeCompare("Lordshire") == 0) {
            orgMSP = "LordshireMSP"; ca_url = "ca1.example.com" ; admin_identity_name = "Lordshire_admin";
        
        }
        else if (orgName.localeCompare("Student") == 0) {
            orgMSP = "StudentMSP"; ca_url = "ca2.example.com";  admin_identity_name = "Student_admin";
           
        }
        else if (orgName.localeCompare("College") == 0) {
            orgMSP = "CollegeMSP"; ca_url = "ca3.example.com"; admin_identity_name = "College_admin"
        }
        else if (orgName.localeCompare("Employer") == 0) { 
            orgMSP = "EmployerMSP"; ca_url = "ca4.example.com"; admin_identity_name = "Employer_admin" 
        }
        else
        {
            console.log("Error orgname");
            res.json({stauts:false,data:"",msg:"orgName is not supplied or it is incorrect. Supported orgName are Lordshire, Student, College, Employer"});
        }

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
         const gateway = new Gateway();
         await gateway.connect(ccp, { wallet, identity: admin_identity_name, discovery: { enabled: false } });

         const ca = gateway.getClient().getCertificateAuthority();
         const adminIdentity = gateway.getCurrentIdentity();
 
         try{
            const secret = await ca.register({ affiliation:'org1.department1', enrollmentID: userName, role: 'client' }, adminIdentity);
            const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: secret });
            let userIdentity = X509WalletMixin.createIdentity(orgMSP, enrollment.certificate, enrollment.key.toBytes());
            // console.log(userIdentity);
            // console.log(typeof userIdentity);
            wallet.import(userName, userIdentity);
            // add orgname and userName
            userIdentity.orgName = orgName;
            userIdentity.userName= userName;
            userIdentity.gender = gender;
            userIdentity.contact =contact  ;         
            userIdentity.address = address;
            userIdentity.dob = dob;
            userIdentity.wallet_type = wallet_type;
            //userIdentity = JSON.stringify(userIdentity);
            res.json({status:true,data:userIdentity});
         }
         catch(error){
             console.log(error);
             res.json({status:false,data:"",msg:error});
         }
         
    }

};