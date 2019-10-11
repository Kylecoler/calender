import React, {Component} from 'react'

class Calender extends Component{
    constructor(){
        super()
        this.state={
            month:((new Date(Date())).getMonth()),
            year:((new Date(Date())).getFullYear()),
            day:((new Date(Date())).getDay())
        }
    }
    rows = []
    monthArr = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    monthChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    addEvent = (num)=>{
        return()=>{
            alert(this.monthArr[this.state.month]+" "+num+" "+this.state.year)
        }
    }

    body = (year, month)=>{
        const start = (new Date(year, month)).getDay()
        const end = 32 - new Date(year, month, 32).getDate()
        let date = 1
        for(let i = 0;i<6;i++){
            const dates = []
            for(let j=0;j<7;j++){
                if(i===0 && j<start){
                    dates.push(<td key={i+j}> </td>)
                } else if(date > end){
                    break
                } else {
                    dates.push(<td key={i+j} onClick={this.addEvent(date)}>{date}</td>)
                    date++
                }
            }
            this.rows.push(<tr key={i}>{
                dates.map(day=>{
                    return(day)
                })
            }</tr>)
        }
    }

    render(){
        this.body(this.state.year, this.state.month)
        const display = ()=>{
            const tr = (this.rows.map(row=>row))
            this.rows=[]
            return tr
        }
        return(
            <div>
                <h1>{this.monthArr[this.state.month]} {this.state.year}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thur</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display()}
                    </tbody>
                </table>
                <form action="" onChange={this.monthChange}>
                    <span>Jump To:</span>
                    <input type="number" name="year" id="year" defaultValue={this.state.year}/>
                    <select name="month" id="month" defaultValue={this.state.month}>
                        <option value={0}>January</option>
                        <option value={1}>Febuary</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>September</option>
                        <option value={9}>October</option>
                        <option value={10}>November</option>
                        <option value={11}>December</option>
                    </select>
                </form>
            </div>
        )
    }
}

export default Calender