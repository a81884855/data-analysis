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

  render(){
    const { groupName, groups, index, width, height } = this.props;

    let currWidth = width;
    let currHeight = height;

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
            if(tempW > currWidth || currWidth - tempW < 20){
              tempH = currHeight;
              tempW = currWidth;
              stop=true;
            } else {
              currWidth -= tempW;
            }
          } else {
            tempH = height * company[1] * height / currWidth / variable;
            if(tempH > currHeight || currHeight - tempH < 20){
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
      height: height,
      width: width,
      
    }

    return(
      <div 
        style={boardStyle} 
        className="board">
        <div>
          {cells}
        </div>
      </div>
    )
  }
}

export default Diagram