// Validate Organization
export const validateOrganization = (req, res, next) => {
  const { name, description } = req.body;

  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push("Organization name must be at least 3 characters long.");
  }

  if (!description || description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long.");
  }

  if (errors.length > 0) {
    req.flash("message", errors[0]); // ✅ Fixed key & passed string for single message rendering
    return res.redirect("back");
  }

  next();
};

// Validate Project
export const validateProject = (req, res, next) => {
  const { name, description } = req.body;

  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push("Project name must be at least 3 characters long.");
  }

  if (!description || description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long.");
  }

  if (errors.length > 0) {
    req.flash("message", errors[0]); // ✅ Fixed key & passed string for single message rendering
    return res.redirect("back");
  }

  next();
};

// Validate Category
export const validateCategory = (req, res, next) => {
  const { name } = req.body;

  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push("Category name must be at least 2 characters long.");
  }

  if (errors.length > 0) {
    req.flash("message", errors[0]); // ✅ Fixed key & passed string for single message rendering
    return res.redirect("back");
  }

  next();
};