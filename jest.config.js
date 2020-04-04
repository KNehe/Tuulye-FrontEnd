module.exports ={

    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.css$": "jest-transform-css",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-file",
      },

};