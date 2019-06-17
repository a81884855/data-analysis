import React from 'react';
import FileReader from './FileReader';
import Diagram from './Diagram';

class App extends React.Component{
  constructor() {
    super();
    this.state = {};
    this.updateData = this.updateData.bind(this);
  }

  updateData(result) {
    var data = result.data;
    data.forEach((row)=>{
      let { category_id, company_id, amount } = row;
      let category = this.state[category_id] ? this.state[category_id] : [0];
      category[0] += Number(amount);
      this.setState({
        [category_id]: category
      })
    })
    let arr = Object.keys(this.state).sort((a,b)=>a[0]-b[0])
    console.log(this.state["1"]);
  }

  render() {
    return (
      <div className="App">
        <FileReader updateData={this.updateData}/>
        <Diagram />
      </div>
    );
  }
}

export default App