import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Icon, List, Menu, Breadcrumb, Segment, Label, Grid, Card,Container, Statistic,Rail,Header,Item} from 'semantic-ui-react';

var LineChart = require("react-chartjs").Line;

function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount(){
        this.timerID = setInterval(
            ()=> this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }
    render(){

            return <div>{this.state.date.toLocaleTimeString()}</div>
    }
}


class ButtonSemantic extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        alert("Oh you dun fuked up son");
    }

    render(){
        return(
            <Button onClick={this.handleClick}>Idjit </Button>
        );
    }
    
}

function PressList(props){
    const pressEvents = props.pressEvents;
    const listItems = pressEvents.map((data, index)=> <EventItem icon={data.Icon}  description={data.Description} header={data.Header} iconColor={data.IconColor} key={index}/>);
    return <List>{listItems}</List>
}

function EventItem(props){
    
    return (
        <List.Item>
            <List.Icon name = {props.icon} size='large' verticalAlign='bottom' color={props.iconColor}/>
            <List.Content>
                <List.Header>
                    {props.header}
                </List.Header>
                <List.Description>
                    {props.description}
                </List.Description>
            </List.Content>
        </List.Item>
    )


}

function NumberList(props){
    const numbers = props.numbers;

    const listItems = numbers.map((number, index) => <ListItem value={number} key={index} />);

    return <List bulleted>{listItems}</List>;
}

function ListItem(props){
    return <List.Item>{props.value}</List.Item>
}

function DowntimeCard(props){
    var lastCard = props.lastCard;

    return(
        <Card raised link color='red'> 
            <Card.Content>
                <Card.Header className='dt_cardHeader'>
                {lastCard && <Label color='grey' floating size='tiny'> +7 </Label>}
                    E-FAULT - ALM_OVR
                </Card.Header>
            </Card.Content >
            <Card.Content >

                <Card.Description>
                    Start: 10:15:00 <br />
                    End: 10:18:09<br />
                    Duration: 3m 9s
                </Card.Description>
            </Card.Content>
        </Card>
    )    
}


function SiteMenu(props){
    return (
        <Menu fluid>
            <Menu.Item header>Whirlpool Clyde</Menu.Item>
            <Menu.Item name='breadCrumb'>
            <Breadcrumb>
                <Breadcrumb.Section link>Press</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section link>Lower</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>P_108</Breadcrumb.Section>
            </Breadcrumb>
            </Menu.Item>

            <Menu.Menu position='right'>

            <Menu.Item name='user'>
                <Label>
                    Bryan&nbsp; Mohr
                    <Label.Detail>mohrb</Label.Detail>
                    </Label>

            </Menu.Item>

            <Menu.Item name='clock'>
                <Clock />
            </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

function App(){

    const numbers = [2,4,9,8];
    const pressEvents = {
        "PressEvents": [
          {
            "Icon": "warning sign",
            "IconColor": "yellow",
            "Header": "P_108",
            "Description": "Slow for 15min"
          },
          {
            "Icon": "checkmark",
            "IconColor": "green",
            "Header": "P_145",
            "Description": "W1056354 (2 Coil) run complete."
          },
          {
            "Icon": "remove",
            "IconColor": "red",
            "Header": "P_101",
            "Description": "Down for 35min"
          }
        ]
      };

      const chartData = {
        labels: ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM"],
        datasets: [{
            data: [65.68,72.53, 80.95, 95.5, 97.3, 98],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
      const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

    return (
        <div>
            <SiteMenu/>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column width={13}>

                    <Container fluid>
                        <h2>Operation Status</h2>
                        <Segment.Group horizontal>
                        <Segment textAlign='center'>
                        <Label attached='top left'>Status</Label>
                            <Statistic size='huge'>
                            <Statistic.Value>
                            <Icon name='arrow circle up' color='green'/>
                            </Statistic.Value>
                            <Statistic.Label>23min</Statistic.Label>
                            </Statistic>
                        </Segment>
                        <Segment textAlign='center'>
                        <Label attached='top left'>OEE</Label>
                        <Statistic size='huge' value='92.3%' />
                        </Segment>
                        <Segment textAlign = 'center'>
                        <Label attached='top left'>OEE by Hour</Label>
                        <LineChart data={chartData} width='600' height='100' options={chartOptions}/>
                        </Segment>
                        </Segment.Group>
<Header as='h2'>Process Information</Header>
                        <Segment.Group horizontal>
                            <Segment>
                                    <Container>
                                    <Label attached='top left'>Part Numbers</Label>
                                    <h3>W10199989</h3>
                                    </Container>
                                    <Container>
                                    <Label attached='top left'>Die</Label>
                                    <h3>D1-509A-93A</h3>
                                    </Container>
                            </Segment>
                            <Segment textAlign='center'>
                        <Statistic size='huge' label='Produced' value='5359' />
                        </Segment>
                        <Segment textAlign='center'>
                        <Statistic size='huge' label='Scrap' value='23' />
                        </Segment>
                            </Segment.Group>

<h2>Open Downtime Events</h2>
                        <Card.Group itemsPerRow='5'>
                        <DowntimeCard />
                        <DowntimeCard lastCard/>
                        </Card.Group>
                        <NumberList numbers ={numbers} />
                        </Container>
                    </Grid.Column>

                    <Grid.Column>
                    <PressList pressEvents = {pressEvents.PressEvents} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>


            
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();



