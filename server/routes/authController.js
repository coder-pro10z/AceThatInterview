// server/controllers/authController.js
export const loginUser = (req, res) => {
    const { username, password } = req.body;
  
    // Dummy check for now
    if (username === 'admin' && password === 'password') {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  