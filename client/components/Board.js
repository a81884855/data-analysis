import React from 'react';
import Cell from './Cell';
import Diagram from './Diagram';

class Board extends React.Component{
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
      width: clientWidth,
      height: clientHeight,
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
    const { width, height } = this.state;
    const { categories, groups } = this.props;
    let currWidth = width - 2;
    let currHeight = height - 2;
    let top = 0
    let left = 0
    const categoryGroup = [];
    let totalSize = 0;
    let groupSize = 0;
    let tempGroup = [];
    categories.map((category) => totalSize += category[1]);
    categories.map(
      function(category, index){
        let size = category[1];
        groupSize += size;
        tempGroup.push(category);
        if(groupSize > 0.15 * totalSize / (1-index*0.04) || 
          tempGroup.length > 2 || index === categories.length-1){
          categoryGroup.push([tempGroup, groupSize/totalSize]);
          tempGroup = [];
          groupSize = 0;
        }
      }
    )

    const diagram = categoryGroup.map(
      function(group, i) {
        let tempH = currHeight;
        let tempW = currWidth;
        let stop = false;
        if(currHeight > currWidth){
          tempH = height * group[1] * width / currWidth;
          currHeight -= tempH
        } else {
          tempW = width * group[1] * height / currHeight;
          currWidth -= tempW
        }

        const catogeryStyle={
          width: tempW,
          height: tempH,
          marginTop: top,
          marginLeft: left,
          border: '1px white solid',
          position: 'absolute',
          display: tempW > tempH ? 'flex' : null
        }

        tempW > tempH ? top += tempH : left += tempW
        let landscape= tempH>tempW ? false : true
        // 
        return <div style={catogeryStyle} key={i}>
          {group[0].map((company, index)=>
          <div key={index}>
            <h4 className="catogeryId">{company[0]}</h4>
            <Diagram 
              index={index}
              width={landscape ? tempW * company[1] / (totalSize * group[1]) : tempW}
              height={landscape ? tempH - 23: tempH * company[1] / (totalSize * group[1]) -23}
              categorySize={categories}
              groups={groups[company[0]]}
              landscape={landscape}
              categoryGroup={categoryGroup}
            />
          </div>

            )}
        </div>
      })

    return(
      <div
      className='board'
      ref={this.saveRef}
      style={{height: '100vh', width:'100vw', display:'absolute'}}
      >
        {diagram}
      </div>
    )
  }
}

export default Board