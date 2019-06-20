import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class FileReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
  }

  clickHandler(){
    this.setState({
      display: false
    })
    this.props.importCSV()
  }

  demoClick(){
    this.setState({
      display: false
    })
    this.props.demo()
  }
  render() {
    const { display } = this.state;

    const fileReaderStyle={
      display: display ? 'null' : 'none',
      textAlign: 'center',
      marginTop: '20vh',
      fontSize: '1.5vw',
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
        <Button variant="contained" component="span" onClick={this.clickHandler.bind(this)}>Upload now!</Button>
        <div style={{ marginTop: '20vh'}}>
          <Button variant="contained" color="primary" onClick={this.demoClick.bind(this)}>See Demo!</Button>
        </div>
      </div>
    );
  }
}

export default FileReader;