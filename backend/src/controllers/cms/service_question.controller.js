const validator = require('validator');
const db = require('../../models');

const { ServiceQuestion } = db;
const { Service } = db;
const ResponseErrors = require('../../utils/ResponseErrors');

const getAll = async (req, res) => {
  const { serviceId } = req.params;

  if (typeof serviceId === 'undefined' || !validator.isNumeric(serviceId)) {
    throw new Error('\'serviceId\' field is required');
  }

  try {
    const serviceQuestions = await ServiceQuestion.findAll({
      where: {
        serviceId,
      },
    });
    return res.status(201).json({
      data: serviceQuestions,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getOne = async (req, res) => {
  try {
    const { serviceQuestionId } = req.params;
    const serviceQuestion = await ServiceQuestion.findByPk(serviceQuestionId);

    if (!serviceQuestion) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: serviceQuestion,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const insert = async (req, res) => {
  try {
    const {
      serviceId, title, content,
    } = req.body;

    if (typeof serviceId === 'undefined' || Number.isNaN(parseInt(serviceId, 10))) {
      throw new Error('\'serviceId\' field is not a valid ID');
    }

    if (typeof title === 'undefined' || validator.isEmpty(title)) {
      throw new Error('\'title\' field is required');
    }

    // check if target service id exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      throw new Error(`Service ID: ${serviceId} not found`);
    }

    const serviceQuestion = await ServiceQuestion.create({
      serviceId,
      title,
      content,
    });

    return res.status(201).json({
      data: serviceQuestion,
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
      serviceId, title, content,
    } = req.body;
    const { serviceQuestionId } = req.params;

    // get existing record
    const serviceQuestion = await ServiceQuestion.findByPk(serviceQuestionId);
    if (!serviceQuestion) {
      return ResponseErrors.error404(res);
    }

    // checks service exists if wants to update parent service
    if (typeof serviceId !== 'undefined') {
      const service = await Service.findByPk(serviceId);
      if (!service) {
        throw new Error(`Service ID: ${serviceId} not found`);
      }
    }

    if (typeof title !== 'undefined' && validator.isEmpty(title)) {
      throw new Error('\'title\' can\'t be empty');
    }

    if (typeof content !== 'undefined' && validator.isEmpty(content)) {
      throw new Error('\'content\' can\'t be empty');
    }

    if (serviceId) {
      serviceQuestion.serviceId = serviceId;
    }

    if (title) {
      serviceQuestion.title = title;
    }

    if (content) {
      serviceQuestion.content = content;
    }

    if (!serviceQuestion.changed()) {
      throw new Error('Nothing is being updated in the record');
    }

    // updates service instance
    serviceQuestion.save();

    return res.status(201).json({
      data: serviceQuestion,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { serviceQuestionId } = req.params;
    const serviceQuestion = await ServiceQuestion.findByPk(serviceQuestionId);

    if (!serviceQuestion) {
      return ResponseErrors.error404(res);
    }

    const result = await serviceQuestion.destroy();

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
