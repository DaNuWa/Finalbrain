import React, { Component } from 'react'
import Card from './Card'

export class Home extends Component {
    constructor(){
    super()       
    this.state= {
        iData:[{}]
    }
    
}

componentDidMount()
{
    fetch('https://morning-everglades-40719.herokuapp.com/')
      .then(response=>response.json())
      .then(data=>{
        console.log('dt are ',data)
            this.setState({iData:data})
      })
    .catch (error =>
      console.log('Error:', error));
  

}
    render() {
      console.log(this.state.iData)
      return (
            <div>
            {
              this.state.iData.map((u,i) => {
                return (
                  <Card
                    key={i}
                    id={this.state.iData[i].id}
                    name={this.state.iData[i].name}
                    rank={this.state.iData[i].rank}
                    />
                );
              })
            }
          </div>
        )
    }
}

export default Home;
