import React from 'react';
import colorGenerate from '../../helper/colorGenerate';

const Cell = props => {
  const { size, curr, boardSize, data } = props
  const [ cellWidth, cellHeight ] = size;
  let [ currWidth, currHeight] = curr;
  const [ width, height ] = boardSize;
  const [ companies, groupSize ] = data;
  const colors = colors;
  if(cellWidth !== currWidth) currWidth += cellWidth;
  if(cellHeight !== currHeight) currHeight += cellHeight;
  const span = companies.map((company, index)=>
    <div className="company"
    style={{  
      width: cellWidth > cellHeight ? cellWidth/companies.length - 2: cellWidth - 2,
      height: cellHeight > cellWidth ? cellHeight/companies.length -2 : cellHeight - 2,
      background: colorGenerate(),
    }}>
        <p style={{
          // marginTop: cellWidth > cellHeight? (0.0025*cellWidth).toString() + 'vw' : (0.02*cellHeight).toString() + 'vh',
          fontSize: cellWidth > cellHeight? (0.0055*cellWidth).toString() + 'vw' : (0.02*cellHeight).toString() + 'vh',
          margin: 0,
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          }}>
          {company[0]}
        </p>
        <span className="tooltiptext">{company[1]}</span>
    </div>  
  )

  const cellStyle={
    width: cellWidth,
    height: cellHeight,
    marginTop: height - currHeight,
    marginLeft: width - currWidth,
  }
  return(
    <div className="cell" style={cellStyle}>
      {span}
    </div>
  )
}

export default Cell;