const validator = require('validator');
const db = require('../../models');

const { Blog } = db;
const ResponseErrors = require('../../utils/ResponseErrors');

const getOne = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: blog,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getAll = async (req, res) => {
  try {
    const blogEntries = await Blog.findAll();

    return res.status(201).json({
      data: blogEntries,
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

    // check there is no record with the same slug
    let blog = await Blog.findOne({
      where: {
        slug,
      },
    });
    if (blog) {
      throw new Error(`Can't add record, the slug: '${slug}' is already used by other record`);
    }

    blog = await Blog.create({
      title,
      content,
      slug,
    });

    return res.status(201).json({
      data: blog,
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
    const { blogId } = req.params;

    // get existing record
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
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
      blog.title = title;
    }

    if (content) {
      blog.content = content;
    }

    if (slug) {
      blog.slug = slug;
    }

    if (!blog.changed()) {
      throw new Error('Nothing is being updated in the record, make sure you are setting one of the following fields in the request: \'title\' \'content\' \'slug\'');
    }

    // updates social network instance
    blog.save();

    return res.status(201).json({
      data: blog,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return ResponseErrors.error404(res);
    }

    const result = await blog.destroy();
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
  getAll,
  insert,
  update,
  deleteRecord,
};
