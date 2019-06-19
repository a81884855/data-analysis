import React from 'react';

const Cell = props => {
  const { size, curr, boardSize, data } = props
  const [ cellWidth, cellHeight ] = size;
  let [ currWidth, currHeight] = curr;
  const [ width, height ] = boardSize;
  const [ companies, groupSize ] = data;
  if(cellWidth !== currWidth) currWidth += cellWidth;
  if(cellHeight !== currHeight) currHeight += cellHeight;

  const companyStyle={

  }

  const span = companies.map((company, index)=>
    <div style={{
      width: cellWidth > cellHeight ? cellWidth/companies.length - 2: cellWidth - 2,
      height: cellHeight > cellWidth ? cellHeight/companies.length -2 : cellHeight - 2,
      display: 'inline-block',
      background: 'yellow',
      border: '1px white solid',
    }}>
        <p style={{
          // marginTop: cellWidth > cellHeight? (0.0025*cellWidth).toString() + 'vw' : (0.02*cellHeight).toString() + 'vh',
          fontSize: cellWidth > cellHeight? (0.008*cellWidth).toString() + 'vw' : (0.015*cellHeight).toString() + 'vh',
          margin: 0,
          display: 'inline-block',
          }}>
          {company[0]}
        </p>
    </div>  
  )

  const cellStyle={
    width: cellWidth,
    height: cellHeight,
    background: 'red',
    border: '1px white solid',
    marginTop: height - currHeight,
    marginLeft: width - currWidth,
    position: 'absolute'
  }
  return(
    <div style={cellStyle}>
      {span}
    </div>
  )
}

export default Cell;