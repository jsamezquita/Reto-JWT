exports.allAccess = (req, res) => {
    res.status(200).send("Contenido público");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Contenido de usuario");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Contenido de Administrador");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Contenido de Moderador");
  };