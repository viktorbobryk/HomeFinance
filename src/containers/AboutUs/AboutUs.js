import React, {Component} from 'react';
import {databaseRef} from "../../config/firebase";
class AboutAs extends Component {

  state = {

  };

   createUser=function(){
       console.log(databaseRef);
      var a= databaseRef.ref("users");
              a.push().set({
    username: "asd",
    email: "email@mail.com"
    
  });
       
   };
    

  render() {
    return (
            <div>
      <h2>About Us</h2>
      <button onClick={this.createUser}>Create user</button>
      </div>
    );
  }
}

export default AboutAs;