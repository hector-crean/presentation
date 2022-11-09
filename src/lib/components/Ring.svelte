<script lang="ts">
  const arc = (
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: number,
    sweepFlag: number,
    x: number,
    y: number
  ) => `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`;
</script>

<svg width="2" height="2" viewBox="0 -1 2 2">
  <path
    d="
        M 0 0 
        {arc(1, 1, 0, 1, 0, 2, 0)} 
        M 2 0
        {arc(1, 1, 0, 1, 0, 0, 0)}
    "
    fill="transparent"
    stroke="#00aaff"
    stroke-width="3"
  />
</svg>

<!--
  
  Using this path definition as d:
  
  M centerX (centerY-outerRadius)
  A outerRadius outerRadius 0 1 0 centerX (centerY+outerRadius)
  A outerRadius outerRadius 0 1 0 centerX (centerY-outerRadius)
  Z
  M centerX (centerY-innerRadius)
  A innerRadius innerRadius 0 1 1 centerX (centerY+innerRadius)
  A innerRadius innerRadius 0 1 1 centerX (centerY-innerRadius)
  Z
  
  -->
