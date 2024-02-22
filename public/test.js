function geturl(value) {
  const [v1, v2] = value.split(" to ");
  return `/${v1.toLowerCase()}/${v2.toLowerCase()}`;
}
