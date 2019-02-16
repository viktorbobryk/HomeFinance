/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {databaseRef} from "../config/firebase";

function generateDb(){
    var emails=["gumail.com", "mail.ua"];
    var names=["Vasyl", "Petro"];
    var surnames=["Ivanov", "Pupkin", "Mokin"];
    var categories = ["food", "clothes"];
    
    function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

    var generateExpenses = function(count){
        var exp=[];
        for(var i=0; i<count; i++){
            var item ={};
            item.amount=Math.floor((Math.random()*10000))/100;
            item.date = randomDate(new Date(2018, 0, 1), new Date()).toString();
            exp.push(item);
        }
        
        return exp;
    };
    var db={
        users:[]
    };
    for(var m=0; m< emails.length; m++)
    {
         for(var i=0;i<names.length;i++)
         {
             for(var j=0;j<surnames.length;j++)
             {
                 var name = names[i]+"." + surnames[j] + "@"+ emails[m];
                 
                 var user ={
                     name:name,
                     password:"window",
                     expenses: generateExpenses(111)
                 };
             db.users.push(user);
            }
        }
    }
    
    databaseRef.ref().set(db);
}

export default generateDb;