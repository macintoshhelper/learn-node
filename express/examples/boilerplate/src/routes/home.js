const route = (req, res) => {
  res.render('home', { title: 'Express Boilerplate', welcomeText: 'Welcome to' });
};

module.exports = route;
