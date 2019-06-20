import React from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import FileReader from './FileReader';
import Board from './Board';

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
    this.demo = this.demo.bind(this);
  }

  updateData(result) {
    var data = result.data;
    let categories = {};
    let categorySize = [];
    let group = {};
    let totalSize = 0;
    let categoryGroup = [];
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
      companies = companies.sort((a,b) => b[1] - a[1]).slice(0,33);
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

    let groupSize = 0;
    let tempGroup = [];
    // create groups for each category
    for(let category of categorySize){
      let cat = categories[category[0]];
      let size = category[1]
      let accum = 0;
      let temp = [];
      let percentage = 0.12;
      groupSize += size;
      tempGroup.push(category);

      if(groupSize > 0.15 * totalSize){
        categoryGroup.push([tempGroup, groupSize/totalSize]);
        tempGroup = [];
        groupSize = 0;
      }

      for(let company of cat){
        accum += company[1]
        temp.push(company);
        if(accum > size * percentage || temp.length > 3){
          group[category[0]] = group[category[0]] ? group[category[0]] : []
          group[category[0]].push([temp, accum/size]);
          accum = 0
          temp = [];
          percentage *= 0.88
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

  demo(){
    axios.get('/test_data.csv')
      .then((demo)=>
        this.setState({
          csvfile: demo.data
        }, ()=> this.importCSV())
      )
  }

  render() {
    const { categorySize, categories, group, totalSize } = this.state;
    const board = categorySize.slice(0,1).map((index)=>
      <Board 
        key={index}
        categories={categorySize}
        totalSize={totalSize}
        groups={group}
      />
    )

    return (
      <div className="App" style={{maxWidth: '100vw', maxHeight: '100vh'}}>
        <FileReader 
          updateData={this.updateData}
          handleChange={this.handleChange}
          importCSV={this.importCSV}
          demo={this.demo}
          />
        {board}
      </div>
    );
  }
}

export default App