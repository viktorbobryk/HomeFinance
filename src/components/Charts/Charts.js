
import {Bar, Line, Pie} from 'react-chartjs-2';
import classes from './Charts.scss';
import Button from '../../components/UI/Button/Button';

import React, {Component} from 'react';

class Charts extends Component {

  state = {
    chooseChartData: false,
    chartType: false,
    chartData: {
      labels: ["Kyiv", "Lviv", "Rivne", "London"],
      datasets:[
          {
            label: 'Population',
            data:[
                3000000,
                700000,
                300000,
                10000000
            ],
              backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)'
              ]
          }
      ]
    }
  };

    chooseChartDataHandler = (val)=>{
        this.setState({
            chooseChartData: val
        })
    };
    toggleChartType = ()=>{
        this.setState({
          chartType: !this.state.chartType
        })
    };
    submitForm = (event)=>{
      event.preventDefault()
    };
  render() {
    return(
        <div className={classes.Charts}>
            <div className={classes.chartHeader}>
                <Button
                    type={!this.state.chooseChartData ? "activeHeader" : 'header'}
                    onClick={()=>this.chooseChartDataHandler(false)}
                    id='clicked'
                >
                    show earnings chart
                </Button>
                <Button
                    type={this.state.chooseChartData ? "activeHeader" : 'header'}
                    onClick={()=>this.chooseChartDataHandler(true)}
                >
                    show spending chart
                </Button>
            </div>
            <div className={classes.chartType} style={{transform: this.state.chartType ? 'translateX(0)' : 'translateX(204px)',
                zIndex: this.state.chartType ? 10 : 0
            }}
            >

                <form onSubmit={this.submitForm} style={{width: '100%'}}>
                    <input type="radio" name="chart" value="bar"/>Bar<br/>
                    <input type="radio" name="chart" value="line"/>Line<br/>
                    <input type="radio" name="chart" value="pie"/>Pie<br/>
                    <input type="submit" value="Submit"/>
                </form>
                <span  onClick={()=>this.toggleChartType()} className={classes.toggleView}>{this.state.chartType ? 'hide': 'chart type'}</span>
            </div>
            <Line
                data={this.state.chartData}
                width={100}
                height={50}
                options={{
                  title:{
                    display: true,
                    text: 'Largest Cities in the World',
                    fontSize: 25
                  },
                   legend:{
                    display: true,
                    position: 'right'
                   },
                   maintainAspectRatio: false
                }}
            />
        </div>
        )

  }
}

export default Charts;