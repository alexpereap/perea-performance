const validator = require('validator');
const { sequelize, DataTypes } = require('../../db');
const Service = require('../../models/service')(sequelize, DataTypes);
const ResponseErrors = require('../../utils/ResponseErrors');

const getAll = async (req, res) => {
  try {
    const services = await Service.findAll();
    return res.status(201).json({
      data: services,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getOne = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: service,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const insert = async (req, res) => {
  try {
    const {
      title, resume, logo, explain,
    } = req.body;

    if (typeof title === 'undefined' || validator.isEmpty(title)) {
      throw new Error('\'title\' field is required');
    }

    const service = await Service.create({
      title,
      resume,
      logo,
      explain,
    });

    return res.status(201).json({
      data: service,
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
      title, resume, logo, explain,
    } = req.body;
    const { serviceId } = req.params;

    // get existing record
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return ResponseErrors.error404(res);
    }

    if (typeof title !== 'undefined' && validator.isEmpty(title)) {
      throw new Error('\'title\' can\'t be empty');
    }

    if (title) {
      service.title = title;
    }

    if (resume) {
      service.resume = resume;
    }

    if (logo) {
      service.logo = logo;
    }

    if (explain) {
      service.explain = explain;
    }

    if (!service.changed()) {
      throw new Error('Nothing is being updated in the record');
    }

    // updates service instance
    service.save();

    return res.status(201).json({
      data: service,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return ResponseErrors.error404(res);
    }

    const result = await service.destroy();

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
