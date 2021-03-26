const moment = require("moment");

const getTopDate = (history, item) => {
  const dates = [
    { date: moment(history[0]).format("MMM YYYY"), id: history[0]._id },
  ];
  history.forEach((item) => {
    if (
      !dates.some(
        (date) => date.date === moment(item.createdAt).format("MMM YYYY")
      )
    ) {
      dates.push({
        date: moment(item.createdAt).format("MMM YYYY"),
        id: item._id,
      });
    }
  });
  return dates.some((date) => date.id === item._id);
};

const getCategories = (items) => {
  const categories = [items[0].category];
  items.forEach((item) => {
    if (!categories.some((category) => category === item.category)) {
      categories.push(item.category);
    }
  });
  return categories;
};

const getStats = (history) => {
  const items = [];
  history.forEach((history) => {
    history.items.forEach((item) =>
      items.push({
        ...item,
        month: moment(history.createdAt).format("MMM YYYY"),
      })
    );
  });

  const items2 = [];
  history.forEach((history) => {
    history.items.forEach((item) =>
      items2.push({
        ...item,
        day: moment(history.createdAt).format("ll"),
      })
    );
  });

  var rankItems = [];
  items.forEach((item) => {
    if (!rankItems.some((val) => val.name === item.name)) {
      rankItems.push({ name: item.name, amount: 1 });
    } else {
      rankItems = rankItems.map((val) =>
        val.name === item.name
          ? { name: val.name, amount: val.amount + 1 }
          : val
      );
    }
  });

  var rankCategories = [];
  items.forEach((item) => {
    if (!rankCategories.some((val) => val.category === item.category)) {
      rankCategories.push({ category: item.category, amount: 1 });
    } else {
      rankCategories = rankCategories.map((val) =>
        val.category === item.category
          ? { category: val.category, amount: val.amount + 1 }
          : val
      );
    }
  });

  var ySum = [];

  items.reverse().forEach((item) => {
    if (!ySum.some((val) => val.month === item.month)) {
      ySum.push({ month: item.month, amount: 1 });
    } else {
      ySum = ySum.map((val) =>
        val.month === item.month
          ? { month: val.month, amount: val.amount + 1 }
          : val
      );
    }
  });

  var mSum = [];
  items2.reverse().forEach((item) => {
    if (!mSum.some((val) => val.day === item.day)) {
      mSum.push({ day: item.day, amount: 1 });
    } else {
      mSum = mSum.map((val) =>
        val.day === item.day ? { day: val.day, amount: val.amount + 1 } : val
      );
    }
  });

  mSum = mSum.filter(
    (val) => moment().format("MMM") === moment(val.day).format("MMM")
  );

  if (ySum.length > 6) {
    var arr = [];
    for (let i = 0; i <= 5; i++) {
      arr.push(ySum[i]);
    }
    ySum = arr;
  }

  var total = 0;

  if (rankCategories.length !== 0) {
    total = rankCategories
      .map((category) => category.amount)
      .reduce((total, num) => total + num);
  }

  return {
    rankCategories,
    rankItems,
    summary_y: ySum,
    summary_m: mSum.reverse(),
    total,
  };
};

export { getTopDate, getCategories, getStats };
