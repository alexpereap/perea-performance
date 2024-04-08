const axios = require('axios');
const responseErrors = require('../../utils/ResponseErrors');

// lists all records
const list = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/cms/homeslides/getAll`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      },
    );
    const { data } = response.data;
    res.render('cms/home_slides/list', { homeSlides: data });
  } catch (e) {
    return responseErrors.cmsError(req, res, e.message);
  }
};

// adds new record (page)
const add = async (req, res) => {
  try {
    // defines empty data to use same template as edit
    res.render('cms/home_slides/view', { data: {} });
  } catch (e) {
    return responseErrors.cmsError(req, res, e.message);
  }
};

// adds new record (backend)
const postAdd = async (req, res) => {
  try {
    const {
      image, legend, order, position,
    } = req.body;
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/cms/homeslides/add`,
      {
        image,
        legend,
        order,
        position,
      },
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      },
    );

    let redirect = '';
    if (response && response.data.success === true) {
      req.session.cmsSuccess = 'Home slide added';
      redirect = '/cms/home-slides';
    } else if (response && response.data.success === false && response.error) {
      req.session.cmsError = `Error: ${response.data.error}`;
      redirect = '/cms/home-slides/add';
    } else {
      req.session.cmsError = 'An unexpected error happened';
      redirect = '/cms/home-slides/add';
    }

    req.session.save(() => res.redirect(redirect));
  } catch (e) {
    const errorMessage = (e.response && typeof e.response.data.error !== 'undefined')
      ? `Error: ${e.response.data.error}`
      : e.message;
    return responseErrors.cmsError(req, res, errorMessage);
  }
};

const edit = async (req, res) => {
  try {
    const { slideId } = req.params;
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/cms/homeslides/get/${slideId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      },
    );
    const { data } = response.data;
    res.render('cms/home_slides/view', { data });
  } catch (e) {
    return responseErrors.cmsError(req, res, e.message);
  }
};

const update = async (req, res) => {
  try {
    const { slideId } = req.params;
    const response = await axios.patch(
      `${process.env.BACKEND_URL}/api/cms/homeslides/update/${slideId}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      },
    );

    if (response && response.data.success === true) {
      req.session.cmsSuccess = 'Home slide updated';
    } else if (response && response.data.success === false && response.error) {
      req.session.cmsError = `Error: ${response.data.error}`;
    } else {
      req.session.cmsError = 'An unexpected error happened';
    }

    req.session.save(() => res.redirect(`/cms/home-slides/edit/${slideId}`));
  } catch (e) {
    const errorMessage = (e.response && typeof e.response.data.error !== 'undefined')
      ? `Error: ${e.response.data.error}`
      : e.message;
    return responseErrors.cmsError(req, res, errorMessage);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { slideId } = req.params;
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/api/cms/homeslides/delete/${slideId}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`,
        },
      },
    );

    if (response && response.data.success === true) {
      req.session.cmsSuccess = 'Home slide deleted';
    } else if (response && response.data.success === false && response.error) {
      req.session.cmsError = `Error: ${response.data.error}`;
    } else {
      req.session.cmsError = 'An unexpected error happened';
    }

    req.session.save(() => res.redirect('/cms/home-slides/'));
  } catch (e) {
    const errorMessage = (e.response && typeof e.response.data.error !== 'undefined')
      ? `Error: ${e.response.data.error}`
      : e.message;
    return responseErrors.cmsError(req, res, errorMessage);
  }
};

module.exports = {
  list,
  add,
  postAdd,
  edit,
  update,
  deleteRecord,
};
