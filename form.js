// formController.js
import FormModel from './FormModel.js';

const Form = {
  createForm: async (req, res) => {
    console.log(req.body);
    try {
      const newForm = new FormModel(req.body);
      await newForm.save();
      res.status(201).json({ message: 'Form item created successfully', newForm });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getAllForms: async (req, res) => {
    try {
      const forms = await FormModel.find();
      res.status(200).json({ message: 'All forms retrieved successfully', forms });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

export default Form;
