import React, {Component} from 'react';
import {connect} from "react-redux";
import {Bar, Line, Pie, Bubble, Doughnut, Polar} from 'react-chartjs-2';
import classes from './Charts.scss';
import _ from 'lodash';
import Button from '../../components/UI/Button/Button';
import {fetchSpending, fetchEarnings} from '../../store/actions/myCabinet';

class Charts extends Component {
    componentDidMount(){
        this.props.fetchEarnings();
        setTimeout(()=>{this.getChartData('earnings')});
        // document.getElementById('clicked').click();
        // console.log("CLICKED");
    }
    chartType = {
        bar: Bar,
        line: Line,
        pie: Pie,
        bubble: Bubble,
        doughnut: Doughnut,
        polar: Polar
    };

  state = {
    chooseChartData: "earnings",
    chartType: "bar",
    chartHeader: '',
    toggleType: false,
    chartData: {}
  };

    getChartData = (val)=>{
        const res = this.props.chartData || [];
        let data;
        let labels;
        let label;
        let chartHeader;
            if(val  === 'earnings'){
                data = res.map((item)=>{
                    return(
                        item.earningSum
                    )
                });
                labels = res.map((item)=>{
                    return(
                        item.earningDate
                    )
                });
                label = "Earnings";
                chartHeader = "Earnings"
            }
        if(val  === 'spending'){
            data = res.map((item)=>{
                return(
                    item.spendingSum
                )
            });
            labels = res.map((item)=>{
                return(
                    item.spendingDate
                )
            });
            label = "Spending";
            chartHeader = 'Spending';
        }
        const backgroundColors = [];
        for(let i=0; i<labels.length; i++){
            backgroundColors.push(this.dynamicColors());
        }
        const chartData = {

            labels: _.orderBy(labels),
            datasets:[
                {
                    label: label,
                    data:data,
                    backgroundColor: backgroundColors
                }
            ]
        };
        this.setState({
            chartData: chartData,
            chartHeader: chartHeader
        })
    };
     dynamicColors = ()=> {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const a = 0.7;
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    chooseChartData = (val)=>{
        this.setState({
            chooseChartData: val
        })
    };
    chooseChartType = (e)=>{
        this.setState({
            chartType: e.target.value
        })
    };
    toggleChartType = ()=>{
        this.setState({
          toggleType: !this.state.toggleType
        })
    };
    submitForm = (event)=>{
      event.preventDefault()
    };
  render() {
 const ChartType = this.chartType[this.state.chartType];
    return(
        <div className={classes.Charts}>
            <div className={classes.chartHeader}>
                <Button
                    type={(this.state.chooseChartData === 'earnings') ? "activeHeader" : 'header'}
                    onClick={()=>{this.chooseChartData("earnings"); this.props.fetchEarnings(); setTimeout(()=>{this.getChartData('earnings')}, 200)}}
                    id='clicked'
                >
                    earnings chart
                </Button>
                <Button
                    type={(this.state.chooseChartData === 'spending') ? "activeHeader" : 'header'}
                    onClick={()=>{this.chooseChartData("spending"); this.props.fetchSpending();  setTimeout(()=>{this.getChartData('spending')}, 200)}}
                >
                    spending chart
                </Button>
            </div>
            <div className={classes.chartType} style={{transform: this.state.toggleType ? 'translateX(0)' : 'translateX(120px)',
                zIndex: this.state.toggleType ? 10 : 0
            }}
            >

                <form onSubmit={this.submitForm} style={{width: '100%'}}>
                    <input type="radio" name="chart" value="bar"  onChange={this.chooseChartType}/>Bar<br/>
                    <input type="radio" name="chart" value="line" onChange={this.chooseChartType}/>Line<br/>
                    <input type="radio" name="chart" value="pie" onChange={this.chooseChartType}/>Pie<br/>
                    <input type="radio" name="chart" value="polar" onChange={this.chooseChartType}/>Polar<br/>
                    <input type="radio" name="chart" value="doughnut" onChange={this.chooseChartType}/>Doughnut<br/>
                </form>
                <span  onClick={()=>this.toggleChartType()} className={classes.toggleView}>{this.state.toggleType ? 'hide': 'chart type'}</span>
            </div>
            <ChartType
                data={this.state.chartData}
                width={100}
                height={50}
                options={{
                    title:{
                        display: true,
                        text: this.state.chartHeader,
                        fontSize: 25
                    },
                    // legend:{
                    //     display: true,
                    //     position: 'right'
                    // },
                    maintainAspectRatio: false
                }}
            />;
        </div>
        )

  }
}
function mapStateToProps(state){
    return{
        chartData: state.myCabinet.usersData
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchEarnings: ()=> dispatch(fetchEarnings()),
        fetchSpending: ()=> dispatch(fetchSpending())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Charts);