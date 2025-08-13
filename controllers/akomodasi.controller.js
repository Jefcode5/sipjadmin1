const { Akomodasi } = require('../models');
exports.list = async (req, res) => {
  const items = await Akomodasi.findAll({ order: [['id','DESC']] });
  res.render('akomodasi/list', { title: 'Akomodasi', items });
};
exports.showCreate = (req, res) => {
  res.render('akomodasi/form', { title: 'Tambah Akomodasi', item: null, action: '/admin/akomodasi' });
};
exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await Akomodasi.create(data);
    req.flash('success','Akomodasi ditambahkan');
    res.redirect('/admin/akomodasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal menambah');
    res.redirect('/admin/akomodasi');
  }
};
exports.showEdit = async (req, res) => {
  const item = await Akomodasi.findByPk(req.params.id);
  if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/akomodasi'); }
  res.render('akomodasi/form', { title: 'Edit Akomodasi', item, action: '/admin/akomodasi/' + item.id });
};
exports.update = async (req, res) => {
  try {
    const item = await Akomodasi.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/akomodasi'); }
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await item.update(data);
    req.flash('success','Akomodasi diupdate');
    res.redirect('/admin/akomodasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal update');
    res.redirect('/admin/akomodasi');
  }
};
exports.remove = async (req, res) => {
  try {
    const item = await Akomodasi.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/akomodasi'); }
    await item.destroy();
    req.flash('success','Akomodasi dihapus');
    res.redirect('/admin/akomodasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal hapus');
    res.redirect('/admin/akomodasi');
  }
};
