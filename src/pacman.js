(function () {
  console.log("Loaded...");
})();

class Game {
  static gridConfig = {
    WALL: "W",
    EMPTY: " ",
    DOT: "o",
    POWERPELLET: "O",
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
      this.maze[rowIndex] = row[0].split("");
    });

    this.preloadAssets();

    this.initializeDots();

    this.reset();
  }

  initializeMaze() {}

  initializeDots() {
    let mazeRow = [];
    let item

    this.maze.forEach((mazeRow, mazeRowIndex) => {
      console.log(mazeRow);

      mazeRow.forEach((mazeCol, mazeColIndex) => {
        const gridElement = mazeRow[mazeColIndex];
        if (gridElement === Game.gridConfig.DOT) {
          this.placeDot(mazeRowIndex, mazeColIndex);
        } else if (gridElement === Game.gridConfig.POWERPELLET) {
          this.placePowerPellet(mazeRowIndex, mazeColIndex)
        }
        
      })
    })
  }

  placeDot(y, x) {

    this.grid = document.getElementById("grid");

    let dot = document.createElement("div");

    grid.appendChild(dot);

    dot.className = "dot"

    dot.style.top = y * 26 + 13 - 3 + "px"; // position + half distance - radius

    dot.style.left = x * 26 + 13 - 3 + "px";
  }

  placePowerPellet(y, x) {
    this.grid = document.getElementById("grid");

    let powerPellet = document.createElement("div");

    this.grid.appendChild(powerPellet);

    powerPellet.className = "powerPellet"

    powerPellet.style.top = y * 26 + 13 - 3 + "px"; // position + half distance - radius

    powerPellet.style.left = x * 26 + 13 - 3 + "px";
  }

  placeFruits() {
    
  }

  /**
   * Load all assets into a hidden Div to pre-load them into memory.
   * There is probably a better way to read all of these file names.
   */
  preloadAssets() {
    return new Promise((resolve) => {
        const loadingContainer = document.getElementById('loading-container');
        const loadingPacman = document.getElementById('loading-pacman');
        const loadingDotMask = document.getElementById('loading-dot-mask');
        
        const totalSources = 2000;

        let remainingSources = totalSources;

        loadingPacman.style.left = '0';
        loadingDotMask.style.width = '0';

        Promise.all([
            this.createElements()
        ]).then(() => {
            loadingContainer.style.opacity = 0;
            resolve();

            setTimeout(() => {
              this.placeGrid();
              loadingContainer.remove();
              //this.mainMenu.style.opacity = 1;
              //this.mainMenu.style.visibility = 'visible';
              
              /*if( !isSafari() ) {
                  this.startButtonClick();
              }*/
            }, 1500);
        }).catch(this.displayErrorMessage);
    });
}

placeGrid() {
         const gridContainer = document.getElementById('grid');
              gridContainer.style.display = 'grid'; 
}

createElements() {
  const loadingContainer = document.getElementById('loading-container');
  // const preloadDiv = document.getElementById('preload-div');
  const loadingPacman = document.getElementById('loading-pacman');
  const containerWidth = loadingContainer.scrollWidth
          - loadingPacman.scrollWidth;
  const loadingDotMask = document.getElementById('loading-dot-mask');

  // const gameCoordRef = gameCoord;

  return new Promise((resolve, reject) => {
      let loadedSources = 0;
      
      let totalSources = 200;

      let remainingSources = totalSources;

      let sources = Array.from('x'.repeat(totalSources))

      sources.forEach((source, idx) => {



          // preloadDiv.appendChild(element);

          const elementReady = () => {
              remainingSources -= 1;
              loadedSources += 1;
              const percent = 1 - (remainingSources / totalSources);
              loadingPacman.style.left = `${percent * containerWidth}px`;
              loadingDotMask.style.width = loadingPacman.style.left;

              console.log(percent)
              console.log(loadingPacman.style.left)
              console.log(loadingDotMask.style.width)
              console.log(idx)

              if (loadedSources === sources.length) {
                  resolve();
              }
          };
          elementReady()
      });
  });
}

  reset() {
    this.pacman = new Pacman(this.maze); // this.scaledTileSize, this.mazeArray, new CharacterUtil(),
  }
}

class Pacman {
  constructor(maze) {
    this.grid = document.getElementById("grid");
    this.pacman = document.createElement("div");
    
    this.maze = maze;

    this.setStartingPosition();

    this.registerEventListeners();

  }

  registerEventListeners() {
    // Add event listener for arrow key presses
    document.addEventListener("keydown", this.debounce( (event) => {
      switch (event.key) {
        case CharacterUtil.keybindings.UP:
          if (this.getTile(this.posY - 1, this.posX, this.maze)) {
            this.posY -= 1;
            this.pacman.style.top = this.posY * 26 - this.startingDescrepancy + "px";
            this.pacman.id = "top-pacman";
          }
          break;
        case CharacterUtil.keybindings.DOWN:
          if (this.getTile(this.posY + 1, this.posX, this.maze)) {
            this.posY += 1;
            this.pacman.style.top = this.posY * 26 - this.startingDescrepancy  + "px";
            this.pacman.id = "down-pacman";
          }
          break;
        case CharacterUtil.keybindings.LEFT:
          if (this.getTile(this.posY, this.posX - 1, this.maze)) {
            this.posX -= 1;
            this.pacman.style.left = this.posX * 26  - this.startingDescrepancy + "px";
            this.pacman.id = "left-pacman";
          }
          break;
        case CharacterUtil.keybindings.RIGHT:
          if (this.getTile(this.posY, this.posX + 1, this.maze)) {
            this.posX += 1;
            this.pacman.style.left = this.posX * 26 - this.startingDescrepancy  + "px";
            this.pacman.id = "right-pacman";
          }
      }
    }));
  }

  debounce(func, timeout = 100){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  getTile(y, x, maze) {
    if (maze[y] && maze[y][x] && maze[y][x] != Game.gridConfig.WALL) {
      return { y, x };
    }
  }

  setStartingPosition() {

    // Initialize pacman element class
    this.pacman.id = "right-pacman";

    // Append node to grid
    this.grid.appendChild(this.pacman);

    // Defines the deviation in standard position of pacman
    this.startingDescrepancy = 10;

    // Initialize the element starting position
    this.posY = 17;
    this.posX = 14; 

    this.pacman.style.top = this.posY * 26 - this.startingDescrepancy  + "px";

    this.pacman.style.left = this.posX * 26 - this.startingDescrepancy + "px";
  }
}

class CharacterUtil {
  static keybindings = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
  };

  movementKeys = {
    // WASD
    87: "up",
    83: "down",
    65: "left",
    68: "right",

    // Arrow Keys
    38: "up",
    40: "down",
    37: "left",
    39: "right",
  };
}
