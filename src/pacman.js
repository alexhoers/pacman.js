;(function() {
    console.log("loaded...")
}());

    class Game {

        static gridConfig = {
            WALL	: "W",
            EMPTY	: " ",
            DOT     : ".",
            FRUIT   : "F",
            PACMAN 	: "P",
            GHOST 	: "G",
        }

        constructor(config) {
            this.gridSizeX = config.gridSizeX;
            this.gridSizeY = config.gridSizeY;
            this.pixelSizeX = config.pixelSizeX;
            this.pixelSizeY = config.pixelSizeY;

            this.maze = [
                ['WWWWWWWWWWWWWWWWWWWWWWWWWWWW'],
                ['WooooooooooooWWooooooooooooW'],
                ['WoWWWWoWWWWWoWWoWWWWWoWWWWoW'],
                ['WOWWWWoWWWWWoWWoWWWWWoWWWWOW'],
                ['WoWWWWoWWWWWoWWoWWWWWoWWWWoW'],
                ['WooooooooooooooooooooooooooW'],
                ['WoWWWWoWWoWWWWWWWWoWWoWWWWoW'],
                ['WoWWWWoWWoWWWWWWWWoWWoWWWWoW'],
                ['WooooooWWooooWWooooWWooooooW'],
                ['WWWWWWoWWWWW WW WWWWWoWWWWWW'],
                ['WWWWWWoWWWWW WW WWWWWoWWWWWW'],
                ['WWWWWWoWW          WWoWWWWWW'],
                ['WWWWWWoWW WWWWWWWW WWoWWWWWW'],
                ['WWWWWWoWW W      W WWoWWWWWW'],
                ['      o   W      W   o      '],
                ['WWWWWWoWW W      W WWoWWWWWW'],
                ['WWWWWWoWW WWWWWWWW WWoWWWWWW'],
                ['WWWWWWoWW          WWoWWWWWW'],
                ['WWWWWWoWW WWWWWWWW WWoWWWWWW'],
                ['WWWWWWoWW WWWWWWWW WWoWWWWWW'],
                ['WooooooooooooWWooooooooooooW'],
                ['WoWWWWoWWWWWoWWoWWWWWoWWWWoW'],
                ['WoWWWWoWWWWWoWWoWWWWWoWWWWoW'],
                ['WOooWWooooooo  oooooooWWooOW'],
                ['WWWoWWoWWoWWWWWWWWoWWoWWoWWW'],
                ['WWWoWWoWWoWWWWWWWWoWWoWWoWWW'],
                ['WooooooWWooooWWooooWWooooooW'],
                ['WoWWWWWWWWWWoWWoWWWWWWWWWWoW'],
                ['WoWWWWWWWWWWoWWoWWWWWWWWWWoW'],
                ['WooooooooooooooooooooooooooW'],
                ['WWWWWWWWWWWWWWWWWWWWWWWWWWWW'],
            ];

            this.reset();
        }

        initializeMaze() {
           
        }

        initializeDots() {

		}

		placeFruits() {

		}

        reset() {
            this.pacman = new Pacman(this.maze); // this.scaledTileSize, this.mazeArray, new CharacterUtil(),
        }
    }

    class Pacman {


        constructor(maze) {
			this.grid = document.getElementById('grid');
			this.element = document.createElement('div');
			// Initialize the element position
			this.elementTop = 1;
			this.elementLeft = 1;

            this.maze = maze;
            
            this.element.id = 'element';
			this.grid.appendChild(this.element);

            this.registerEventListeners();

        }

        registerEventListeners() {
            // Add event listener for arrow key presses
			document.addEventListener('keydown', event => {
				switch (event.key) {
					case 'ArrowUp':
						if(this.maze[this.elementTop-1][0][this.elementLeft] != Game.gridConfig.WALL) {
							this.elementTop -= 1;
							this.element.style.top = this.elementTop*26 + 'px';
						}
						break;
					case 'ArrowDown':
						if(this.maze[this.elementTop+1][0][this.elementLeft] != Game.gridConfig.WALL) {
                            this.elementTop += 1;
                            this.element.style.top = this.elementTop*26 + 'px';
						}
						break; 
					case 'ArrowLeft':
							if(this.maze[this.elementTop][0][this.elementLeft-1] != Game.gridConfig.WALL) {
								this.elementLeft -= 1;
								this.element.style.left = this.elementLeft*26 + 'px';
							}
						break;
					case 'ArrowRight':
						if(this.maze[this.elementTop][0][this.elementLeft+1] != Game.gridConfig.WALL) {
                            this.elementLeft += 1;
                            this.element.style.left = this.elementLeft*26 + 'px';
						}
				}
			});
        }

        setStartingPosition() {

        }


    }








