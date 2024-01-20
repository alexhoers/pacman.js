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

    beginGame();

    this.reset();

  }

  initializeMaze() {}

  initializeDots() {
    let mazeRow = [];
    let item

    this.maze.forEach((mazeRow, mazeRowIndex) => {

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

    dot.className = "dot";

    dot.id = y + "" + x;

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
    document.addEventListener("keydown", debounce( (event) => {
      let nextMazeElement;
      switch (event.key) {
        case CharacterUtil.keybindings.UP:
          nextMazeElement = this.moveUp();
          break;
        case CharacterUtil.keybindings.DOWN:
          nextMazeElement = this.moveDown();
          break;
        case CharacterUtil.keybindings.LEFT:
          nextMazeElement = this.moveLeft();
          break;
        case CharacterUtil.keybindings.RIGHT:
          nextMazeElement = this.moveRight();
      }
      if (this.isDot(nextMazeElement)) {
        this.eatDot();
      }
    }));
  }

  moveUp() {
    const mazeElement = this.getMazeElement(this.posY - 1, this.posX);
    if (!this.isWall(mazeElement)) {
      this.posY -= 1;
      this.pacman.style.top = this.posY * 26 - this.startingDescrepancy + "px";
      this.pacman.id = "top-pacman";
    }
    return mazeElement;
  }

  moveDown() {
    const mazeElement = this.getMazeElement(this.posY + 1, this.posX)
    if (!this.isWall(mazeElement)) {
      this.posY += 1;
      this.pacman.style.top = this.posY * 26 - this.startingDescrepancy  + "px";
      this.pacman.id = "down-pacman";
    }
    return mazeElement;
  }

  moveLeft() {
    const mazeElement = this.getMazeElement(this.posY, this.posX - 1)
    if (!this.isWall(mazeElement)) {
      this.posX -= 1;
      this.pacman.style.left = this.posX * 26  - this.startingDescrepancy + "px";
      this.pacman.id = "left-pacman";
    }
    return mazeElement;
  }

  moveRight() {
    const mazeElement = this.getMazeElement(this.posY, this.posX + 1)
    if (!this.isWall(mazeElement)) {
      this.posX += 1;
      this.pacman.style.left = this.posX * 26 - this.startingDescrepancy  + "px";
      this.pacman.id = "right-pacman";
    }
    return mazeElement;
  }

  eatDot() {
    const dot = document.getElementById(this.posY + "" + this.posX);
    dot.style.display = "none";
  }

  getMazeElement(y, x) {
    return this.maze[y][x];
  }

  isWall(element) {
    return element == Game.gridConfig.WALL;
  }

  isDot(element) {
    return element == Game.gridConfig.DOT;
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

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function beginGame() {
  let timerCounter = 0;
  const timerCounterDiv = document.getElementById("timer-counter");
  timerCounterDiv.style.display = "static";
  setInterval(() => {
    timerCounterDiv.innerHTML = timerCounter++;
  }, 1000)
}