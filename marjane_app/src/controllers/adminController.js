const test = async (req, res, next) => {
  try {
    console.log("test");
    res.json();
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
};

export { test };
