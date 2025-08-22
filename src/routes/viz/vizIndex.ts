export const vizIndex: {
  [key: string]: { title: string; description: string };
} = {
  bean: {
    title: "Bean machine",
    description:
      "Virtual bean machine illustrates how the binomial distribution arises. Change the number of bins to see how the binomial distribution approaches the normal distribution as this number goes to infinity",
  },
  transform: {
    title: "Transformations",
    description:
      "Flip switches to reveal graphs of the addition, multiplication, and exponentiation functions and drag values in coloured circles to change the output these functions produce",
  },
  desc: {
    title: "Descriptive statistics",
    description:
      "Explore the various measures of central tendency and spread by adding and deleting points or dragging them around. You can select multiple points by dragging a rectangle across the plot",
  },
  dev: {
    title: "Squared vs absolute deviation",
    description:
      "Compare the sum of squared deviations to the sum of absolute deviations of data from any point along the x-axis to find out why we use the former with the mean and the latter with the median",
  },
  norm_dist: {
    title: "Normal distribution",
    description:
      "Explore the two parameters that define the normal distribution – <i>&mu;</i> and <i>&sigma;</i> – to see how they determine the shape of the location and spread of the bell curve",
  },
  standard: {
    title: "<i>z</i>-transformation",
    description:
      "Change the centre and the scale of a randomly generated normal distribution to turn it into a <strong><i>standard</i></strong> normal distribution with <i>&mu;</i> = 0 and <i>&sigma;</i> = 1. Watch out for order of operations though!",
  },
  area: {
    title: "Area under the curve",
    description:
      "Pick cut-off points along the x-axis and get the area below the standard normal curve within and outside of the range.<br><code>R</code> code to calculate area and cut-offs included!",
  },
  tdist: {
    title: "Student's <i>t</i> distribution",
    description:
      "Change the number of degrees of freedom to see how the shape of the Student’s <i>t</i> distribution changes and how this change affects cut-off points for the outer 5% of the area under the curve",
  },
  chisq: {
    title: "<i>&chi;</i><sup>2</sup> distribution",
    description:
      "The shape of the <i>&chi;</i><sup>2</sup> distribution changes even more dramatically than the <i>t</i> distribution as the number of degrees of freedom increases",
  },
  fdist: {
    title: "Snedecor's <i>F</i> distribution",
    description:
      "The <i>F</i> distribution describes a ratio of two <i>&chi;</i><sup>2</sup> distributed variables (scaled by their respective <i>dfs</i>). See how the two degrees of freedom parameters determine its shape",
  },
  cor: {
    title: "Correlation coefficient <i>r</i>",
    description:
      "Discover the geometric representation of the correlation coefficient <i>r</i> to see that it is just the cosine of the angle between two lines of best fit drawn through the data",
  },
  reg_line: {
    title: "Linear equation",
    description:
      "Play around with the intercept and the slope of a line to see how different values of the parameters of the linear equation determine the vertical position and the steepness of the line",
  },
  ols_reg: {
    title: "Line of best fit",
    description:
      "Ordinary Least Squares regression is one way to find the line of best fit through a scatter of data. Change the intercept and the slope to find this line",
  },
  r_sq: {
    title: "<i>R</i><sup>2</sup>",
    description:
      "<i>R</i><sup>2</sup> expresses how well the model describes the relationships in the data. Add and delete points or move them around to see how they influence both the line and <i>R</i><sup>2</sup>",
  },
  reg_3d: {
    title: "Linear regression with interaction",
    description:
      "Develop intuition about regression coefficients by playing around with their values and learn to understand interaction as curving of the regression plane at the far corner",
  },
};
