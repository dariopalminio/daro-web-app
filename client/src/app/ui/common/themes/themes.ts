const PrimaryTheme = {
    layout: {
      sidebarWidth: 240,
      headerHeight: 50,
      headerBackgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
    },
    button: {
      color: "white",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      boxShadow: "0 0 0 0 rgba(145, 64, 248, 0.5), 0 0 0 0 rgba(39, 200, 255, 0.5)",
      hoverBackground: "linear-gradient(45deg,  #FF8E53 30%, #FE6B8B 90%)",
      hoverColor: "rgb(255, 255, 255)",
      hoverBoxShadow: "10px -10px 25px 0 rgba(16, 226, 256, 0.5), -10px 10px 25px 0 rgba(183, 0, 255, 0.7)",
    },
    paper: {
      border: "1px solid #d7d7d7",
      boxShadow: "0px 5px 20px #1687d933",
    }

  };

const Themes = {
    primary: PrimaryTheme
  }

export default Themes;