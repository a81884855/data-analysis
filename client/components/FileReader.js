import React from 'react';

class FileReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvfile: undefined
    };
  }

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
          onChange={this.props.handleChange}
        />
        <p />
        <button onClick={this.props.importCSV}> Upload now!</button>
      </div>
    );
  }
}

export default FileReader;