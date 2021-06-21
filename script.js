const { count } = require('console');
const fs = require('fs');

let rawdata = fs.readFileSync('response(2).json');
let bugData = fs.readFileSync('bug.json');
let story_taskData =fs.readFileSync('story_task.json');
let issues = JSON.parse(rawdata);
let bug = JSON.parse(bugData)
let story_task = JSON.parse(story_taskData)
let description 
let bug_description = ''
let story_task_description = ''
let myObj 
headersArray = []
let template = {
    followTemplate:false,
    headerCount:null,
    defaulttextChenged:null,
    defaulttextNotChenged:null,
    contentLength:null
}
async function getDefaultBugTemplate(responseData,issue_type){
    await responseData.fields.description.content.forEach((element)=>{
        element.content.forEach((data)=>{
            if(data.text){
                if(issue_type == 'bug'){
                    if(data.marks){
                        // console.log(data)
                        headersArray.push(data.text)
                    }
                    bug_description = data.text
                }else if(issue_type == 'story_task'){
                    if(data.marks){
                        // console.log(data)
                        headersArray.push(data.text)
                    }
                    
                    story_task_description += data.text
                }    
            }
        })
    })
    getDescription()
}

async function getDescription(){  
    let obj = ''
   
    await issues.issues.map((data)=>{
        if(data.fields.description){
            let headerCount = 0
            if(JSON.stringify(story_task.fields.description) == 
            JSON.stringify(data.fields.description)){
                data.fields.description.content.map((element)=>{
                    if(element.marks){
                        headersArray.push(data.text)
                    }
                    if(element.type == 'paragraph'){
                        element.content.map((data1)=>{ 
                            if(data1.text){
                                obj += data1.text   
                            }               
                        }) 
                    }else
                    if(element.type == 'bulletList') {
                        element.content.map((data1)=>{ 
                            // console.log(data1)
                            if(data1.type == 'listItem'){
                                data1.content.map((list)=>{
                                        list.content.map((list1)=>{
                                            // console.log(list1)
                                            obj += list1.text
                                        })
                                })
                            }
                        })
                    }    
          
                })
                template.followTemplate = true,
                
                headersArray.forEach((data)=>{
                if(description.includes(data)){
                    headerCount += 1
                }
            })
            template.headerCount = headerCount
            }else{
                template.followTemplate = false
                template.headerCount = null
            }
            console.log(template)
           
            description = obj
            template.contentLength = description.length
             
        }
        
    })
}

getDefaultBugTemplate(story_task,'story_task')