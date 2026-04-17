const registerUser = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful!",
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};
