export default {
  methods: {
    getEnumsValue(enums = [], _id) {
      const match = enums.find(({ id }) => id === _id) || {};
      return match.value;
    },
    listEnumsValue(enums = [], data = [], sep = ';') {
      return enums
        .filter(({ id }) => data.includes(id))
        .map(item => item.value)
        .join(sep);
    }
  }
};
