(function () {
  console.log("Loaded...");
})();

class Game {
  static gridConfig = {
    WALL: "W",
    EMPTY: " ",
    DOT: ".",
    FRUIT: "F",
    PACMAN: "P",
    GHOST: "G",
  };

  constructor(config) {
    this.gridSizeX = config.gridSizeX;
    this.gridSizeY = config.gridSizeY;
    this.pixelSizeX = config.pixelSizeX;
    this.pixelSizeY = config.pixelSizeY;

    this.maze = [
      ["WWWWWWWWWWWWWWWWWWWWWWWWWWWW"],
      ["WooooooooooooWWooooooooooooW"],
      ["WoWWWWoWWWWWoWWoWWWWWoWWWWoW"],
      ["WOWWWWoWWWWWoWWoWWWWWoWWWWOW"],
      ["WoWWWWoWWWWWoWWoWWWWWoWWWWoW"],
      ["WooooooooooooooooooooooooooW"],
      ["WoWWWWoWWoWWWWWWWWoWWoWWWWoW"],
      ["WoWWWWoWWoWWWWWWWWoWWoWWWWoW"],
      ["WooooooWWooooWWooooWWooooooW"],
      ["WWWWWWoWWWWW WW WWWWWoWWWWWW"],
      ["WWWWWWoWWWWW WW WWWWWoWWWWWW"],
      ["WWWWWWoWW          WWoWWWWWW"],
      ["WWWWWWoWW WWWWWWWW WWoWWWWWW"],
      ["WWWWWWoWW W      W WWoWWWWWW"],
      ["      o   W      W   o      "],
      ["WWWWWWoWW W      W WWoWWWWWW"],
      ["WWWWWWoWW WWWWWWWW WWoWWWWWW"],
      ["WWWWWWoWW          WWoWWWWWW"],
      ["WWWWWWoWW WWWWWWWW WWoWWWWWW"],
      ["WWWWWWoWW WWWWWWWW WWoWWWWWW"],
      ["WooooooooooooWWooooooooooooW"],
      ["WoWWWWoWWWWWoWWoWWWWWoWWWWoW"],
      ["WoWWWWoWWWWWoWWoWWWWWoWWWWoW"],
      ["WOooWWooooooo  oooooooWWooOW"],
      ["WWWoWWoWWoWWWWWWWWoWWoWWoWWW"],
      ["WWWoWWoWWoWWWWWWWWoWWoWWoWWW"],
      ["WooooooWWooooWWooooWWooooooW"],
      ["WoWWWWWWWWWWoWWoWWWWWWWWWWoW"],
      ["WoWWWWWWWWWWoWWoWWWWWWWWWWoW"],
      ["WooooooooooooooooooooooooooW"],
      ["WWWWWWWWWWWWWWWWWWWWWWWWWWWW"],
    ];

    this.maze.forEach((row, rowIndex) => {
      this.maze[rowIndex] = row[0].split('');
  });

    this.reset();
  }

  initializeMaze() {}

  initializeDots() {}

  placeFruits() {}

  reset() {
    this.pacman = new Pacman(this.maze); // this.scaledTileSize, this.mazeArray, new CharacterUtil(),
  }
}

class Pacman {
  constructor(maze) {
    this.grid = document.getElementById("grid");
    this.element = document.createElement("div");
    // Initialize the element position
    this.posY = 1;
    this.posX = 1;

    this.maze = maze;

    this.element.id = "element";
    this.grid.appendChild(this.element);

    this.registerEventListeners();
  }

  registerEventListeners() {
    // Add event listener for arrow key presses
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case CharacterUtil.keybindings.UP:
          if (this.getTile(this.posY - 1, this.posX, this.maze)) {
            this.posY -= 1;
            this.element.style.top = this.posY * 26 + "px";
          }
          break;
        case CharacterUtil.keybindings.DOWN:
          clearInterval()
          setInterval(()=> {
            if (this.getTile(this.posY + 1, this.posX, this.maze)) {
              this.posY += 1;
              this.element.style.top = this.posY * 26 + "px";
              console.log(this.posY + ", " + this.posX)
            }
          
          }, 500)
          break;
        case CharacterUtil.keybindings.LEFT:
          if (this.getTile(this.posY, this.posX - 1, this.maze)) {
            this.posX -= 1;
            this.element.style.left = this.posX * 26 + "px";
          }
          break;
        case CharacterUtil.keybindings.RIGHT:
          if (this.getTile(this.posY, this.posX + 1, this.maze)) {
            this.posX += 1;
            this.element.style.left = this.posX * 26 + "px";
          } 
      }
    });
  }
  
  getTile(y, x, maze) {
    if (maze[y] && maze[y][x] && maze[y][x] != Game.gridConfig.WALL) {
      return {y, x}
    }
  }

  setStartingPosition() {}
}

class CharacterUtil {

  static keybindings = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
  }

  movementKeys = {
    // WASD
    87: 'up',
    83: 'down',
    65: 'left',
    68: 'right',

    // Arrow Keys
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right',
};
}
