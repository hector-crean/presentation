<script lang="ts">
    const arc = (
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: number,
        sweepFlag: number,
        x: number,
        y: number
    ) =>
        `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`;
</script>

<svg width="100" height="100">
    <path
        d="
        M 50 10 
        {arc(40, 40, 0, 1, 0, 50, 90)} 
        A 40 40 0 1 0 50 10 
        Z 
        M 50 30 A 20 20 0 1 1 50 70 
        A 20 20 0 1 1 50 30 
        Z"
        fill="#0000dd"
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
