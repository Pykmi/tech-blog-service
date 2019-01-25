// utility functions
exports.toObject = (content, output = {}) => {
  content.map((item) => { output[item.url] = item });
  return output;
};

exports.filters = (params) => {
  filters = { public: true, type: 'article' };
  Object.keys(params).map((item) => filters[item] = params[item].toLowerCase());

  return filters;
};