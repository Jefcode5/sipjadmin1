const { Kuliner } = require('../models');
exports.list = async (req, res) => {
  const items = await Kuliner.findAll({ order: [['id','DESC']] });
  res.render('kuliner/list', { title: 'Kuliner', items });
};
exports.showCreate = (req, res) => {
  res.render('kuliner/form', { title: 'Tambah Kuliner', item: null, action: '/admin/kuliner' });
};
exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await Kuliner.create(data);
    req.flash('success','Kuliner ditambahkan');
    res.redirect('/admin/kuliner');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal menambah');
    res.redirect('/admin/kuliner');
  }
};
exports.showEdit = async (req, res) => {
  const item = await Kuliner.findByPk(req.params.id);
  if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/kuliner'); }
  res.render('kuliner/form', { title: 'Edit Kuliner', item, action: '/admin/kuliner/' + item.id });
};
exports.update = async (req, res) => {
  try {
    const item = await Kuliner.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/kuliner'); }
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await item.update(data);
    req.flash('success','Kuliner diupdate');
    res.redirect('/admin/kuliner');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal update');
    res.redirect('/admin/kuliner');
  }
};
exports.remove = async (req, res) => {
  try {
    const item = await Kuliner.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/kuliner'); }
    await item.destroy();
    req.flash('success','Kuliner dihapus');
    res.redirect('/admin/kuliner');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal hapus');
    res.redirect('/admin/kuliner');
  }
};
