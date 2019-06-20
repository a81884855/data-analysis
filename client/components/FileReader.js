import React from 'react';

class FileReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
  }

  clickHandler(e){
    this.setState({
      display: false
    })
    this.props.importCSV()
  }

  render() {
    const { display } = this.state;

    const fileReaderStyle={
      display: display ? 'null' : 'none',
      textAlign: 'center',
      marginTop: '15vh'
    }
    return (
      <div className="fileReader" style={fileReaderStyle}>
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
        <button onClick={this.clickHandler.bind(this)}> Upload now!</button>
      </div>
    );
  }
}

export default FileReader;