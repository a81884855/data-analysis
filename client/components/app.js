import React from 'react';
import Papa from 'papaparse';

import FileReader from './FileReader';
import Diagram from './Diagram';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      categories: {},
      categorySize: [],
      group: {},
    };
    this.updateData = this.updateData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.importCSV = this.importCSV.bind(this);
  }

  updateData(result) {
    var data = result.data;
    let categories = {};
    let categorySize = [];
    let group = {};
    let totalSize = 0;
    // Filter data by category_id
    data.forEach((row)=>{
      let { category_id, company_id, amount } = row;
      amount = Number(amount);
      if(category_id){
        categories[category_id] = categories[category_id] ? categories[category_id] : {};
        categories[category_id][company_id] = categories[category_id][company_id] ? categories[category_id][company_id] + amount : amount;  
      }
    });

    // Get the largest 30 company data from each category.
    for(let category in categories){
      let companies = [];
      for(let company in categories[category]){
        companies.push([company, categories[category][company]])
      }
      companies = companies.sort((a,b) => b[1] - a[1]).slice(0,30);
      categories[category]=companies
    }

    // Calculate the sum of each category of the largest 30 company data.
    for (let category in categories) {
      let sum = 0;
      for(let company_id in categories[category]){
        sum += categories[category][company_id][1]
      }
      totalSize += sum;
      categorySize.push([category, sum]);
    }

    categorySize.sort((a,b)=> b[1]-a[1])

    // create groups for each category
    for(let category of categorySize){
      let cat = categories[category[0]];
      let size = category[1]
      let accum = 0;
      let temp = [];
      let percentage = 0.12;
      for(let company of cat){
        accum += company[1]
        temp.push(company)
        if(accum > size * percentage || temp.length > 3){
          group[category[0]] = group[category[0]] ? group[category[0]] : []
          group[category[0]].push([temp, accum/size]);
          accum = 0
          temp = [];
          percentage *= 0.90
        }
      }
    }

    this.setState({
      totalSize,
      group,
      categories,
      categorySize
    })
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };


  render() {
    const { categorySize, categories, group, totalSize } = this.state;
    let topTwototalSize = 0;
    let threeToFiveTotalSize = 0;
    categorySize.slice(0,2).map((category)=> topTwototalSize+=category[1]);
    categorySize.slice(2,5).map((category)=> threeToFiveTotalSize+=category[1])
    
    let residualSize = totalSize - topTwototalSize - threeToFiveTotalSize;

    const topTwo = categorySize.slice(0,2).map((category, index)=>
      <Diagram 
        key={index}
        index={index}
        groupName={category[0]}
        totalSize={topTwototalSize}
        categorySize={categorySize}
        groups={group[category[0]]}
      />
    );

    const threeToFive = categorySize.slice(2,5).map((category, index)=>
    <Diagram 
      key={index}
      index={index+1}
      groupName={category[0]}
      totalSize={threeToFiveTotalSize}
      categorySize={categorySize}
      groups={group[category[0]]}
    />
    );

    const residual = categorySize.slice(5).map(
      function(category,index){
        residualSize -= category[1]
        if(residualSize < 0.2 * totalSize) return

        return <Diagram  
          key={index}
          index={index+1}
          groupName={category[0]}
          totalSize={threeToFiveTotalSize}
          categorySize={categorySize}
          groups={group[category[0]]}
        />
      }
    );

    return (
      <div className="App">
        <FileReader 
          updateData={this.updateData}
          handleChange={this.handleChange}
          importCSV={this.importCSV}/>
        <div className="Diagram">
          <div className="topTwo">
            {topTwo}
          </div>
          <div className="threeToFive">
            {threeToFive}
          </div>
          <div className="residual">
            {residual}
          </div>
        </div>
      </div>
    );
  }
}

export default App