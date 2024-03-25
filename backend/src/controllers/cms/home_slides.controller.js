const validator = require('validator');
const { sequelize, DataTypes } = require('../../db');
const HomeSlide = require('../../models/homeslide')(sequelize, DataTypes);
const ResponseErrors = require('../../utils/ResponseErrors');

// allowed position values from model
const positionValues = HomeSlide.getAttributes().position.values;

const getAll = async (req, res) => {
  try {
    const homeSlides = await HomeSlide.findAll();
    return res.status(201).json({
      data: homeSlides,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getOne = async (req, res) => {
  try {
    const { homeSlideId } = req.params;
    const homeSlide = await HomeSlide.findByPk(homeSlideId);

    if (!homeSlide) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: homeSlide,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const insert = async (req, res) => {
  try {
    const { image, legend, position } = req.body;
    if (typeof image === 'undefined' || validator.isEmpty(image)) {
      throw new Error('\'image\' field is required');
    }

    if (typeof legend === 'undefined' || validator.isEmpty(legend)) {
      throw new Error('\'legend\' field is required');
    }

    if (typeof position !== 'undefined' && (!validator.isEmpty(position) && !positionValues.includes(position))) {
      throw new Error(`'position' must be one of: ${positionValues.join(', ')}`);
    }

    const homeSlide = await HomeSlide.create({
      image,
      legend,
      position: position || 'none',
    });

    return res.status(201).json({
      data: homeSlide,
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

    const {
      image, legend, position,
    } = req.body;
    const { homeSlideId } = req.params;

    // get existing record
    const homeSlide = await HomeSlide.findByPk(homeSlideId);
    if (!homeSlide) {
      throw new Error('Home slide not found');
    }

    if (typeof image !== 'undefined' && validator.isEmpty(image)) {
      throw new Error('set a value for \'image\' field');
    }

    if (typeof position !== 'undefined' && (validator.isEmpty(position) || !positionValues.includes(position))) {
      throw new Error(`'position' must be one of: ${positionValues.join(', ')}`);
    }

    if (image) {
      homeSlide.image = image;
    }

    if (typeof legend !== 'undefined') {
      homeSlide.legend = legend;
    }

    if (position) {
      homeSlide.position = position;
    }

    // updates model instance
    homeSlide.save();

    return res.status(201).json({
      data: homeSlide,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { homeSlideId } = req.params;
    const homeSlide = await HomeSlide.findByPk(homeSlideId);

    if (!homeSlide) {
      return ResponseErrors.error404(res);
    }

    const result = await homeSlide.destroy();

    if (!result) {
      throw new Error('Unable to delete record');
    }

    return res.status(201).json({
      message: 'Record deleted successfully',
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

module.exports = {
  getAll,
  insert,
  update,
  getOne,
  deleteRecord,
};
