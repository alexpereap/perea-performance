const validator = require('validator');
const { sequelize, DataTypes } = require('../../db');
const SinglePage = require('../../models/singlepage')(sequelize, DataTypes);
const ResponseErrors = require('../../utils/ResponseErrors');

const getOne = async (req, res) => {
  try {
    const { singlePageId } = req.params;
    const singlePage = await SinglePage.findByPk(singlePageId);

    if (!singlePage) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: singlePage,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getAll = async (req, res) => {
  try {
    const singlePages = await SinglePage.findAll();

    return res.status(201).json({
      data: singlePages,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const insert = async (req, res) => {
  try {
    const { title, content, slug } = req.body;

    if (typeof title === 'undefined' || validator.isEmpty(title)) {
      throw new Error('\'title\' field is required');
    }

    if (typeof slug === 'undefined' || validator.isEmpty(title)) {
      throw new Error('\'slug\' field is required');
    }

    // check if slug doesn't have spaces between
    if (/\s/g.test(slug)) {
      throw new Error('Slug can\'t have spaces between');
    }

    const singlePage = await SinglePage.create({
      title,
      content,
      slug,
    });

    return res.status(201).json({
      data: singlePage,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const update = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new Error('Empty parameters');
    }

    const { title, content, slug } = req.body;
    const { singlePageId } = req.params;

    // get existing record
    const singlePage = await SinglePage.findByPk(singlePageId);

    if (!singlePage) {
      return ResponseErrors.error404(res);
    }

    if (typeof title !== 'undefined' && validator.isEmpty(title)) {
      throw new Error('set a value for \'title\' field');
    }

    if (typeof slug !== 'undefined' && validator.isEmpty(slug)) {
      throw new Error('set a value for \'slug\' field');
    }

    // check if slug doesn't have spaces between
    if (/\s/g.test(slug)) {
      throw new Error('Slug can\'t have spaces between');
    }

    if (title) {
      singlePage.title = title;
    }

    if (content) {
      singlePage.content = content;
    }

    if (slug) {
      singlePage.slug = slug;
    }

    if (!singlePage.changed()) {
      throw new Error('Nothing is being updated in the record, make sure you are setting one of the following fields in the request: \'title\' \'content\' \'slug\'');
    }

    // updates model instance
    singlePage.save();

    return res.status(201).json({
      data: singlePage,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { singlePageId } = req.params;
    const singlePage = await SinglePage.findByPk(singlePageId);

    if (!singlePage) {
      return ResponseErrors.error404(res);
    }

    const result = await singlePage.destroy();
    if (!result) {
      throw new Error('unable to delete record');
    }

    return res.status(201).json({
      message: 'Record deleted succesfully',
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

module.exports = {
  getOne,
  insert,
  update,
  deleteRecord,
  getAll,
};
