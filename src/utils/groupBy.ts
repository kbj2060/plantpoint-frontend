export const groupBy = function(xs: Array<Record<string, any>>, key: string) {
  let grouped: any = {};
  xs.forEach((x) => {
    grouped[x[key]] = x;
  })
  return grouped;
};