const { Destinasi } = require('../models');
const multer = require('multer');
const path = require('path');

// Multer setup moved to routes; controller handles logic

exports.list = async (req, res) => {
  const items = await Destinasi.findAll({ order: [['id','DESC']] });
  res.render('destinasi/list', { title: 'Destinasi', items });
};

exports.showCreate = (req, res) => {
  res.render('destinasi/form', { title: 'Tambah Destinasi', item: null, action: '/admin/destinasi' });
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await Destinasi.create(data);
    req.flash('success', 'Destinasi ditambahkan');
    res.redirect('/admin/destinasi');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Gagal menambah destinasi');
    res.redirect('/admin/destinasi');
  }
};

exports.showEdit = async (req, res) => {
  const item = await Destinasi.findByPk(req.params.id);
  if (!item) {
    req.flash('error', 'Destinasi tidak ditemukan');
    return res.redirect('/admin/destinasi');
  }
  res.render('destinasi/form', { title: 'Edit Destinasi', item, action: '/admin/destinasi/' + item.id });
};

exports.update = async (req, res) => {
  try {
    const item = await Destinasi.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/destinasi'); }
    const data = req.body;
    if (req.file) data.image = '/uploads/' + req.file.filename;
    await item.update(data);
    req.flash('success','Destinasi diupdate');
    res.redirect('/admin/destinasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal update');
    res.redirect('/admin/destinasi');
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Destinasi.findByPk(req.params.id);
    if (!item) { req.flash('error','Tidak ditemukan'); return res.redirect('/admin/destinasi'); }
    await item.destroy();
    req.flash('success','Destinasi dihapus');
    res.redirect('/admin/destinasi');
  } catch (err) {
    console.error(err);
    req.flash('error','Gagal hapus');
    res.redirect('/admin/destinasi');
  }
};
