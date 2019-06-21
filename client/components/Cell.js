import React from 'react';
import colorGenerate from '../../helper/colorGenerate';
import { Textfit } from 'react-textfit';

const Cell = props => {
  const { size, curr, boardSize, data } = props
  const [ cellWidth, cellHeight ] = size;
  let [ currWidth, currHeight] = curr;
  const [ width, height ] = boardSize;
  const [ companies ] = data;
  const colors = colors;
  if(cellWidth !== currWidth) currWidth += cellWidth;
  if(cellHeight !== currHeight) currHeight += cellHeight;
  const span = companies.map((company, index)=>
    <div 
      className="company"
      key={index}
      style={{  
        width: cellWidth > cellHeight ? cellWidth/companies.length - 2: cellWidth - 2,
        height: cellHeight > cellWidth ? cellHeight/companies.length -2 : cellHeight - 2,
        background: colorGenerate(),
      }}>
          <Textfit>
            {company[0]}

          </Textfit>
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