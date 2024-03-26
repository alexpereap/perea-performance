const validator = require('validator');
const { sequelize, DataTypes } = require('../../db');
const SocialNetwork = require('../../models/socialnetwork')(sequelize, DataTypes);
const ResponseErrors = require('../../utils/ResponseErrors');

// allowed social network types from model
const typesAllowed = SocialNetwork.getAttributes().type.values;

const getAll = async (req, res) => {
  try {
    const socialNetWorks = await SocialNetwork.findAll();
    return res.status(201).json({
      data: socialNetWorks,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const getOne = async (req, res) => {
  try {
    const { socialNetWorkId } = req.params;
    const socialNetwork = await SocialNetwork.findByPk(socialNetWorkId);

    if (!socialNetwork) {
      return ResponseErrors.error404(res);
    }

    return res.status(201).json({
      data: socialNetwork,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const insert = async (req, res) => {
  try {
    const { type, url } = req.body;
    if (
      (typeof type === 'undefined' || validator.isEmpty(type))
      || (typeof type !== 'undefined' && (!validator.isEmpty(type) && !typesAllowed.includes(type)))
    ) {
      throw new Error(`'type' must be one of: ${typesAllowed.join(', ')}`);
    }

    if (typeof url === 'undefined' || validator.isEmpty(url)) {
      throw new Error('\'url\' field is required');
    }

    if (!validator.isURL(url)) {
      throw new Error('\'url\' value is not valid');
    }

    // get existing record to validate for unique social network
    let socialNetwork = await SocialNetwork.findOne({
      where: { type },
    });

    if (socialNetwork) {
      throw new Error(`There is alrady a social network with the '${type}' type`);
    }

    socialNetwork = await SocialNetwork.create({
      type,
      url,
    });

    return res.status(201).json({
      data: socialNetwork,
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

    const { url } = req.body;
    const { socialNetWorkId } = req.params;

    // get existing record
    const socialNetwork = await SocialNetwork.findByPk(socialNetWorkId);
    if (!socialNetwork) {
      return ResponseErrors.error404(res);
    }

    if (typeof url !== 'undefined' && !validator.isURL(url)) {
      throw new Error('\'url\' value is not valid');
    }

    if (url) {
      socialNetwork.url = url;
    }

    if (!socialNetwork.changed()) {
      throw new Error('Nothing is being updated in the record, make sure you are setting the \'url\' field in the request');
    }

    // updates social network instance
    socialNetwork.save();

    return res.status(201).json({
      data: socialNetwork,
      success: true,
    });
  } catch (e) {
    return ResponseErrors.error500(res, e);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { socialNetWorkId } = req.params;
    const socialNetwork = await SocialNetwork.findByPk(socialNetWorkId);

    if (!socialNetwork) {
      return ResponseErrors.error404(res);
    }

    const result = await socialNetwork.destroy();

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
