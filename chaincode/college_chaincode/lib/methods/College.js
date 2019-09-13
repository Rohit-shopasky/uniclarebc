
const query = require("../common/query.js");
const uuidv4 = require('uuid/v4');


module.exports={
    async enrollStudentToCollege(ctx,studentName,sex,age,contactNumber,address,studentId)
    {
           
         
         let studentData = {
            studentId  :studentId,
            studentName:studentName,
            sex        :sex,
            age        :age,
            contactNumber :contactNumber,
            address    :address,
            certificate:[],
            extraCourses:[],
            docType:"Student",
            LordshireApproved:false,
            
        }

        await ctx.stub.putState(studentId.toString(),Buffer.from(JSON.stringify(studentData)));
        let returnObj = {status:true,data:{studentId:studentId},"msg":"Student Added"};
        return returnObj; 
    },

    async searchStudent(ctx,studentId)
    {
        let queryString = {};
        queryString.selector = {
            "studentId":studentId
          };
          let allResults = await query.runQuery(ctx,queryString);
          let resultObj = {};
          resultObj.status = "true"
           resultObj.data = allResults;
           resultObj.msg = "";
           console.log(allResults)
          return resultObj;

    },



    async getAllStudents(ctx)
    {
        let queryString = {};
        queryString.selector = {
           "docType":"Student",
          };
        let allResults = await query.runQuery(ctx,queryString);
        let resultObj = {};
        resultObj.status = "true"
         resultObj.data = allResults;
         resultObj.msg = "";
         console.log(allResults)
        return resultObj;
    },



    async issueDegree(ctx,studentId,degreeType,yop,semesterResult)
    {
        let degreeId  = uuidv4();
        const studentData = await ctx.stub.getState(studentId); // get the car from chaincode state
        if (!studentData || studentData.length === 0) {
            let errorResult = {};
            errorResult.status=false;
            errorResult.data={};
            errorResult.msg = studentId + " does not exsist!";
            return errorResult;
        }

        try {            
        const data = JSON.parse(studentData.toString());
        let degreeObj = {};
        degreeObj.degreeType = degreeType;
        degreeObj.yop = yop;
        degreeObj.collegeName ="Example college of engineering";
        degreeObj.degreeId = degreeId;
        degreeObj.semesterResult = JSON.parse(semesterResult);

        console.log(degreeObj);

        data.certificate.push(degreeObj);
        console.log(data.certificate);
        
        await ctx.stub.putState(studentId, Buffer.from(JSON.stringify(data)));
        let resultObj = {};
        resultObj.status = true;
        resultObj.data = {};
        resultObj.msg = "Degree issued!";
         return resultObj;

        } catch (error) {
            console.log(error);
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = error;
             return resultObj;

        }
        
        
    },

    async getExtraCourses(ctx)
    {
        let queryString = {};
        queryString.selector = {
            "docType":"CourseType"
          };
        let allResults = await query.runQuery(ctx,queryString);
        let resultObj = {};
        resultObj.status = "true"
         resultObj.data = allResults;
         resultObj.msg = "";
        return resultObj;
    },

    async insertExtraCourses(ctx)
    {
        let extraCourses = [

            {
                courseId:0,
                courseName:"Programming"
            },

            {
                courseId:1,
                courseName:"Sports"
            },

            {
                courseId:2,
                courseName:"Art & craft"
            },

            {
                courseId:3,
                courseName:"Photography"
            },
        ];

        for (let i = 0; i < extraCourses.length; i++) {
            extraCourses[i].docType ="CourseType";
            await ctx.stub.putState('Course' + i, Buffer.from(JSON.stringify(extraCourses[i])));
            console.info('Added <--> ', extraCourses[i]);
        }
    },


    async assignExtraCourses(ctx,studentId,courseId)
    {
        const studentData = await ctx.stub.getState(studentId); // get the car from chaincode state
        if (!studentData || studentData.length === 0) {
            let errorResult = {};
            errorResult.status=false;
            errorResult.data={};
            errorResult.msg = studentId + " does not exsist!";
            return errorResult;
        }

        try {
        let data = JSON.parse(studentData.toString());

         let courseData = await ctx.stub.getState(courseId);
             

         if (!studentData || studentData.length === 0) {
            let errorResult = {};
            errorResult.status=false;
            errorResult.data={};
            errorResult.msg = courseId + " does not exsist!";
            return errorResult;
         }
         courseData = JSON.parse(courseData.toString());
        console.log(courseData);
        data.extraCourses.push(courseData);
        await ctx.stub.putState(studentId, Buffer.from(JSON.stringify(data)));
        let resultObj = {};
        resultObj.status = true;
        resultObj.data = {};
        resultObj.msg = "Course issued!";
        return resultObj;

        } catch (error) {

            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = error;
            return resultObj;
            
        }


    },


     async getAllStudentsByCourseType(ctx,courseId)
     {
         courseId = Number(courseId);
        let queryString = {};
        queryString.selector = {
            "$and": [
                {
                   "docType": "Student"
                },
                {
                   "extraCourses": {
                      "$elemMatch": {
                         "courseId": courseId
                      }
                   }
                }
             ]
          };
        let allResults = await query.runQuery(ctx,queryString);
        let resultObj = {};
        resultObj.status = "true"
        resultObj.data = allResults;
        resultObj.msg = "";
        console.log("search results",allResults);
        return resultObj;
     },


     async getAllStudentsByDegreeType(ctx,degree)
     {
         
        let queryString = {};
        queryString.selector = {
            "$and": [
                {
                   "docType": "Student"
                },
                {
                   "certificate": {
                      "$elemMatch": {
                         "degreeType": degree
                      }
                   }
                }
             ]
          };
        let allResults = await query.runQuery(ctx,queryString);
        let resultObj = {};
        resultObj.status = "true"
        resultObj.data = allResults;
        resultObj.msg = "";
        console.log("search results",allResults);
        return resultObj;
     },

     async setLordshireApproved(ctx,studentId)
     {
        const studentData = await ctx.stub.getState(studentId); // get the car from chaincode state
        if (!studentData || studentData.length === 0) {
            let errorResult = {};
            errorResult.status=false;
            errorResult.data={};
            errorResult.msg = studentId + " does not exsist!";
            return errorResult;
        }

        let data = JSON.parse(studentData.toString());
        data.LordshireApproved = true;
        await ctx.stub.putState(studentId, Buffer.from(JSON.stringify(data)));
        let resultObj = {};
        resultObj.status = true;
        resultObj.data = {};
        resultObj.msg = "Lordshire Approved!";
        return resultObj;

     }

}