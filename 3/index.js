const array = ["x:1", "y:2", "x:3", "a:15", "a:5"];
const result = {};

array.forEach(element => {
  const [key, value] = element.split(':');
  result[key] = (result[key] || 0) + parseInt(value);
});

const output = Object.entries(result).map(([key, value]) => `${key}=${value}`);

console.log(output.join(','));