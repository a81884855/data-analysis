import React from 'react';
import Papa from 'papaparse';

class FileReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvfile: undefined
    };
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.props.updateData,
      header: true
    });
  };

  // updateData(result) {
  //   var data = result.data;
  //   console.log(data);
  // }

  render() {
    return (
      <div className="App">
        <h2>Import CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload now!</button>
      </div>
    );
  }
}

export default FileReader;