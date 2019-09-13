"use strict";

const user = require("./user.js");
const college = require("./College.js");
const gdt = require("./gdt.js");
const insurance = require("./insurance.js");
const dealer = require("./dealer.js")
const wallet_store = require("./common/create_wallet.js");

module.exports = function(app) {



app.post("/enroll_user",async (req,res)=>{
    user.enrollUser(req,res);
})

app.post("/enrollStudentToCollege",async(req,res)=>{
    
   let wallet_data = await wallet_store.store_wallet(req);
   
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
        college.enrollStudentToCollege(req,res,wallet_data);
});

app.get("/getAllStudents",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
        college.getAllStudents(req,res,wallet_data);
   
})

app.post("/searchStudent",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
      college.searchStudent(req,res,wallet_data);
});

app.post("/issueDegree",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   college.issueDegree(req,res,wallet_data);
});

app.post("/assignExtraCourses",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
    if(wallet_data==-1)
    {
        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
        return;
    }
    college.assignExtraCourses(req,res,wallet_data);
});

app.get("/showExtraCourses",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
    if(wallet_data==-1)
    {
        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
    }
    college.showExtraCourses(req,res,wallet_data);
});

app.post("/getAllStudentsByDegreeType",async(req,res)=>{

    let wallet_data = await wallet_store.store_wallet(req);
    if(wallet_data==-1)
    {
        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
    }

    college.getAllStudentsByDegreeType(req,res,wallet_data);

});


app.post("/getAllStudentsByCourseType",async(req,res)=>{

    let wallet_data = await wallet_store.store_wallet(req);
    if(wallet_data==-1)
    {
        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
    }

    college.getAllStudentsByCourseType(req,res,wallet_data);

});

app.post("/setLordshireApproved",async(req,res)=>{

    let wallet_data = await wallet_store.store_wallet(req);
    if(wallet_data==-1)
    {
        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
    }

    college.setLordshireApproved(req,res,wallet_data);

});



}






