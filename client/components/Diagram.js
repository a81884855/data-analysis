import React from 'react';
import Cell from './Cell';

class Diagram extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
    }
  }

  saveRef = (ref) => this.containerNode = ref

  measure() {
    const {clientWidth, clientHeight} = this.containerNode

    this.setState({
      width: clientWidth ,
      height: clientHeight - 22,
    })
  }

  componentDidMount() {
    this.measure()
  }

  componentDidUpdate() {
    this.measure()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    )
  }

  render(){
    const { totalSize, groupName, groups, index, categorySize } = this.props;
    const {width, height} = this.state;
    let currWidth = width;
    let currHeight = height;
    const h = 100 * categorySize[index][1] / totalSize;
    const variable = 0.80 - (0.042 * index)
    const cells = groups.map(
      function(company, i) {
        if(stop) return
        let tempH = currHeight;
        let tempW = currWidth;
        let stop = false;
        if(i === groups.length - 1){
          tempH = currHeight;
          tempW = currWidth;
        } else {
          if (currWidth > currHeight){
            tempW = width * company[1] * height / currHeight / variable;
            if(tempW > currHeight){
              tempH = currHeight;
              tempW = currWidth;
              stop=true;
            } else {
              currWidth -= tempW;
            }
          } else {
            tempH = height * company[1] * height / currWidth / variable;
            if(tempH > currHeight){
              tempH = currHeight;
              tempW = currWidth;
              stop=true;
            } else {
              currHeight -= tempH
            }
          }
        }

        return <Cell 
          size={[tempW, tempH]}
          curr={[currWidth, currHeight]}
          boardSize={[width, height]}
          data={company}
          key={i}
        />
      })
    const boardStyle={
      height: h.toString()+"vh"
    }
    return(
      <div 
        ref={this.saveRef}
        style={boardStyle} 
        className="board">
        <h4 className="catogeryId">{groupName}</h4>
        <div>
          {cells}
        </div>
      </div>
    )
  }
}

export default Diagram