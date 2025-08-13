const { Destinasi, Akomodasi, Transportasi, Kuliner } = require('../models');

exports.dashboard = async (req, res) => {
  try {
    const destCount = await Destinasi.count();
    const akomCount = await Akomodasi.count();
    const transCount = await Transportasi.count();
    const kulCount = await Kuliner.count();
    res.render('dashboard', {
      title: 'Dashboard Admin',
      stats: {
        destinasi: destCount,
        akomodasi: akomCount,
        transportasi: transCount,
        kuliner: kulCount
      }
    });
  } catch (err) {
    console.error(err);
    res.render('dashboard', { title: 'Dashboard Admin', stats: {} });
  }
};
