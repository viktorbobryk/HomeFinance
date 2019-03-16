import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import  classes from './Home.scss';

class Home extends Component {

  state = {

  };
  render() {
      let links = [
          {to: '/registration', label: 'Signup', exact: false},
          {to: '/faq', label: 'Questions? We Can Help', exact: false}
      ];
      let renderLinks=()=>{
          return links.map((link, index)=>{
              return(
                  <li key={index} className={link.className}>
                      <NavLink
                          to={link.to}
                          exact={link.exact}
                          className={links.className}
                          activeClassName={classes.active}
                          onClick={this.clickHandler}
                      >
                          {link.label}
                      </NavLink>
                  </li>
              )
          })
      };
    return (
        <div className={classes.Home}>
            <div className={classes.header}>
                <h2>HIt’s all coming together</h2>
                <p>When you’re on top of your money, life is good.<br/>
                    We help you effortlessly manage your finances in one place.</p>
                <nav>
                    <ul>
                        {renderLinks()}
                    </ul>
                </nav>
            </div>
            <div className={classes.content}>
                <div className={classes.cards}>
                    <div className={classes.cardItem}>
                        <i className="fas fa-tasks fa-2x"></i>
                        <h3>Budgets? You betcha</h3>
                        <p>Easily create budgets, and see our suggestions based on your spending.</p>
                    </div>
                    <div className={classes.cardItem}>
                        <i className="far fa-calendar fa-2x"></i>
                        <h3>Bills? Done</h3>
                        <p>Track your bills like never before. Get alerts when it's time to pay so you never miss one.</p>
                    </div>
                    <div className={classes.cardItem}>
                        <i className="fas fa-chart-bar fa-2x"></i>
                        <h3>Credit? Check</h3>
                        <p>Find out yours for free and get tips to help improve it, no credit card required.</p>
                    </div>
                </div>
                <div className={classes.contentItem}>
                    <div className={classes.itemText}>
                        <h2>Effortlessly stay on top of bills</h2>
                        <p>At last, your bills and money are together
                            in one place and easier than ever to track.
                            Just add your bills to see how helpful we
                            can be.</p>
                        <ul>
                            <li>See bills and money in one place.</li>
                            <li>Get alerts about upcoming bills.</li>
                            <li>Say goodbye to late fees.</li>
                        </ul>
                    </div>
                    <div className={classes.itemImg}>
                        <img src={require("./images/bills.jpg")} alt="bills"/>
                    </div>
                </div>
                <div className={classes.contentItem}>
                    <div className={classes.itemImg}>
                        <img src={require("./images/personalized.jpg")} alt="personalized"/>
                    </div>
                    <div className={classes.itemText}>
                        <h2>Personalized for you</h2>
                        <ul>
                            <li>Create budgets that make sense today and set you up for success tomorrow.</li>
                            <li>See bills and money together, so you know what’s due, when it’s due and what you can pay.</li>
                            <li>Receive alerts for unusual account charges, and get custom tips for reducing fees and saving money.</li>
                            <li>Get your free credit score and learn how you can improve it now to get the things you want later.</li>
                        </ul>
                    </div>
                </div>
                <div className={classes.cards}>
                    <div className={classes.cardItem}>
                        <img src={require('./images/girl.jpg')} alt="girl"/>
                        <h3>Budgets that work</h3>
                        <p>Create budgets you can actually stick to, and see how you’re spending your money.</p>
                    </div>
                    <div className={classes.cardItem}>
                        <img src={require("./images/money-go.jpg")} alt="money-go"/>
                        <h3>Money on the go</h3>
                        <p>Phone & tablet apps to manage your money from wherever you are.</p>
                    </div>
                    <div className={classes.cardItem}>
                        <img src={require("./images/one-step.jpg")} alt="one-step"/>
                        <h3>One step at a time</h3>
                        <p>Get personalized tips and advice for maximizing your money every day.</p>
                    </div>
                </div>
            </div>
        </div>

    );
  }
}

export default Home;