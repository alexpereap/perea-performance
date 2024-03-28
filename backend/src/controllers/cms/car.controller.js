const validator = require('validator');
const ResponseErrors = require('../../utils/ResponseErrors');
const db = require('../../models');

const { Car } = db;

const getAll = async (req, res) => {
  try {
    const cars = await Car.findAll();
    return res.status(201).json({
      data: cars,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getOne = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findByPk(carId);

    if (!car) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: car,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const insert = async (req, res) => {
  try {
    const {
      title, resume, content,
    } = req.body;

    if (typeof title === 'undefined' || validator.isEmpty(title)) {
      throw new Error('\'title\' field is required');
    }

    const car = await Car.create({
      title,
      resume,
      content,
    });

    return res.status(201).json({
      data: car,
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
      title, resume, content,
    } = req.body;
    const { carId } = req.params;

    // get existing record
    const car = await Car.findByPk(carId);
    if (!car) {
      return ResponseErrors.error404(res);
    }

    if (typeof title !== 'undefined' && validator.isEmpty(title)) {
      throw new Error('\'title\' can\'t be empty');
    }

    if (title) {
      car.title = title;
    }

    if (resume) {
      car.resume = resume;
    }

    if (content) {
      car.content = content;
    }

    if (!car.changed()) {
      throw new Error('Nothing is being updated in the record');
    }

    // updates car instance
    car.save();

    return res.status(201).json({
      data: car,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findByPk(carId);

    if (!car) {
      return ResponseErrors.error404(res);
    }

    const result = await car.destroy();

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
  getOne,
  insert,
  update,
  deleteRecord,
};
