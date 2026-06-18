/**
 * REQUIRE LOGIN
 * Blocks access if user is not logged in
 */
export function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.flash("error", "You must be logged in first.");
    return res.redirect("/login");
  }
  next();
}

/**
 * REQUIRE ROLE (e.g. admin)
 * Blocks access if user does not have required role
 */
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.user) {
      req.flash("error", "You must be logged in first.");
      return res.redirect("/login");
    }

    if (req.session.user.role !== role) {
      req.flash("error", "Unauthorized access.");
      return res.redirect("/dashboard"); // Adjust path if your home/dashboard varies
    }

    next();
  };
}