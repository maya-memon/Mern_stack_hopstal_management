export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  const otherCookieName = user.role === "Admin" ? "patientToken" : "adminToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    // ❗ clear the other cookie
    .cookie(otherCookieName, "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
