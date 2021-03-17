const {colors} = require('@values/colors.json');

export const options = {
  legend: {
    display: true
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: colors.graphGridColor
      },
      ticks: {
        fontColor: colors.fontColor
      },
      type: 'time',
      time: {
        unit: "hour",
        displayFormats: {
          minute: 'hA'
        },
        parser: 'LLLL',
      }
    }],
    yAxes: [{
      gridLines: {
        color: colors.graphGridColor
      },
      ticks: {
        fontColor: colors.graphGridColor
      },
    }]
  },
}