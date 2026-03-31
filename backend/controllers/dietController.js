const Diet = require("../models/Diet");

exports.createDiet = async (req, res) => {
  try {
    const { title, calories, protein, carbs, fat } = req.body;

    const diet = await Diet.create({
      user: req.user._id,
      title,
      calories,
      protein,
      carbs,
      fat,
    });

    res.status(201).json(diet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDiets = async (req, res) => {
  try {
    const diets = await Diet.find({ user: req.user._id });
    res.json(diets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDiet = async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);

    if (!diet) {
      return res.status(404).json({ message: "Diet not found" });
    }

    if (diet.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await diet.deleteOne();

    res.json({ message: "Diet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};