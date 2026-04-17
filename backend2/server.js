userRouter.post("/register", async (req, res) => {
  try {
    validateSignUpData(req);
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    const token = user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    if (error.message) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
