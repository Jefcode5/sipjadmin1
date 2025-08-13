const { Transportasi } = require('../models');
exports.list = async (req, res) => {
  const items = await Transportasi.findAll({ order: [['id','DESC']] });
  res.render('transportasi/list', { title: 'Transportasi', items });
};
exports.showCreate = (req, res) => {
  res.render('transportasi/form', { title: 'Tambah Transportasi', item: null, action: '/admin/transportasi' });
};
exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await Transportasi.create(data);
    req.flash('success','Transportasi ditambahkan');
    res.redirect('/admin/transportasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal menambah');
    res.redirect('/admin/transportasi');
  }
};
exports.showEdit = async (req, res) => {
  const item = await Transportasi.findByPk(req.params.id);
  if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/transportasi'); }
  res.render('transportasi/form', { title: 'Edit Transportasi', item, action: '/admin/transportasi/' + item.id });
};
exports.update = async (req, res) => {
  try {
    const item = await Transportasi.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/transportasi'); }
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await item.update(data);
    req.flash('success','Transportasi diupdate');
    res.redirect('/admin/transportasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal update');
    res.redirect('/admin/transportasi');
  }
};
exports.remove = async (req, res) => {
  try {
    const item = await Transportasi.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/transportasi'); }
    await item.destroy();
    req.flash('success','Transportasi dihapus');
    res.redirect('/admin/transportasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal hapus');
    res.redirect('/admin/transportasi');
  }
};
