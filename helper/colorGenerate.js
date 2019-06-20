module.exports = function colorGenerate(){
  const colors = ['#ffffe0','#fffad6','#fff5cc','#ffefc2','#ffeaba','#ffe5b2','#ffe0ab','#ffdaa3','#ffd59c','#ffd095','#ffca90','#ffc58a','#ffbf85','#ffb880','#ffb27c','#ffad78','#ffa775','#ffa072','#ff9a6e','#ff936b','#fd8d6a','#fb8768','#f98266','#f87c64','#f57762','#f37160','#f06b5f','#ee655d','#eb5f5b','#e85959','#e55457','#e14e55','#de4952','#da4450','#d73e4d','#d3394a','#ce3347','#ca2e43','#c52940','#c1243c','#bc1f38','#b71a34','#b3152f','#ae112a','#a80b24','#a2071f','#9c0418','#970112','#92010b','#8b0000']
  // const n = Math.floor(Math.random(1) * 100);
  // const R = (255 * n) / 100
  // const G = (255 * (100 - n)) / 100 
  // const B = (255 * (100 - n)) / 100 
  const n = Math.floor(Math.random(1)*(colors.length-1))
  return colors[n]
}
