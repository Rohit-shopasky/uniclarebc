'use strict';
const { Contract } = require('fabric-contract-api');
// const user = require("./common/user.js");
const College  = require("./methods/College.js");
// const Gdt = require("./methods/Gdt.js");
// const Insurance = require("./methods/Insurance.js");
// const Dealer = require("./methods/Dealer.js");
// const query = require("./common/query.js");

let errorResult = {"status":false,msg:"Un Authorize access","data":{}};
let exsistError = {"status":false,"msg":"Vehicle does not exsist","data":{}};

class Main extends Contract {

    async enrollStudentToCollege(ctx,studentName,sex,age,contactNumber,address,studentId)
    {
       
        let result = await College.enrollStudentToCollege(ctx,studentName,sex,age,contactNumber,address,studentId);
        return result;
    }

    async searchStudent(ctx,studentId)
    {
      let result = await College.searchStudent(ctx,studentId);
      return result; 
    }

    async issueDegree(ctx,studentId,degreeType,yop,semesterResult)
    {
        let result = await College.issueDegree(ctx,studentId,degreeType,yop,semesterResult);
        return result;
        
    }

    async getAllStudents(ctx)
    {
      let result = await College.getAllStudents(ctx);
      return result;
    }

   async showExtraCourses(ctx)
   {
     let result = await College.getExtraCourses(ctx);
     return result;
   }

   async assignExtraCourses(ctx,studentId,courseId)
   {
     let result =await College.assignExtraCourses(ctx,studentId,courseId);
     return result;
   }

   async insertExtraCourses(ctx)
   {
     let result = await College.insertExtraCourses(ctx);
   }

   async getAllStudentsByCourseType(ctx,courseId)
   {
     let result = await College.getAllStudentsByCourseType(ctx,courseId);
     return result;
   }

   async getAllStudentsByDegreeType(ctx,degree)
   {
     let result = await College.getAllStudentsByDegreeType(ctx,degree);
     return result;
   }

   async setLordshireApproved(ctx,studentId)
   {
     let result = await College.setLordshireApproved(ctx,studentId);
     return result;
   }


}

module.exports = Main;
