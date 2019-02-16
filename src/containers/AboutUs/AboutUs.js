import React, {Component} from 'react';
import generateDb from "../../utils/dbGenerator";
class AboutAs extends Component {

  state = {

  };

   createDb=function(){
      generateDb();
              
       
   };
    

  render() {
    return (
            <div>
      <h2>About Us</h2>
      <button onClick={this.createDb}>Create DB</button>
      </div>
    );
  }
}

export default AboutAs;