// Mind Trap X Game Logic
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const homeScreen = document.getElementById('homeScreen');

    if (splashScreen && homeScreen) {
        setTimeout(() => {
            showScreen('homeScreen');
            console.log("Navigated to Home Screen.");
        }, 3000);
    } else if (splashScreen) {
         setTimeout(() => {
            splashScreen.classList.remove('active');
            console.log("Splash screen timeout. Home screen not found yet.");
        }, 3000);
    }

    // Event listeners for Home Screen buttons
    const startGameBtn = document.getElementById('startGameBtn');
    const levelSelectBtn = document.getElementById('levelSelectBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const exitBtn = document.getElementById('exitBtn');

    if(startGameBtn) startGameBtn.addEventListener('click', () => {
        console.log('Start Game clicked - loading first available level (or level 1)');
        showScreen('gamePlayScreen');
        document.getElementById('timerDisplay').textContent = 'Time: 0s';
        document.getElementById('movesCounter').textContent = 'Moves: 0';
    });

    if (levelSelectBtn) {
        levelSelectBtn.addEventListener('click', () => {
            populateLevelGrid();
            showScreen('levelSelectScreen');
            console.log('Level Select screen shown');
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            console.log('Settings button clicked');
            showScreen('settingsScreen');
        });
    }

    if(exitBtn) exitBtn.addEventListener('click', () => {
        console.log('Exit clicked');
        alert('Exiting Mind Trap X (simulated).');
    });

    // Event listener for Level Select Screen back button
    const levelSelectBackBtn = document.getElementById('levelSelectBackBtn');
    if (levelSelectBackBtn) {
        levelSelectBackBtn.addEventListener('click', () => {
            showScreen('homeScreen');
            console.log('Back to Home Screen from Level Select');
        });
    }

    // Event listeners for Game Play Screen
    const pauseGameBtn = document.getElementById('pauseGameBtn');
    const controlUp = document.getElementById('controlUp');
    const controlLeft = document.getElementById('controlLeft');
    const controlRight = document.getElementById('controlRight');
    const controlDown = document.getElementById('controlDown');
    const goalToken = document.getElementById('goalToken');


    if(pauseGameBtn) {
      pauseGameBtn.addEventListener('click', () => {
          console.log('Pause button clicked');
          showScreen('pauseScreen');
      });
    }

    if(controlUp) controlUp.addEventListener('click', () => console.log('Control: Up'));
    if(controlLeft) controlLeft.addEventListener('click', () => console.log('Control: Left'));
    if(controlRight) controlRight.addEventListener('click', () => console.log('Control: Right'));
    if(controlDown) controlDown.addEventListener('click', () => console.log('Control: Down'));

    if (goalToken) {
        goalToken.addEventListener('click', () => {
            console.log('Goal Token Clicked - Triggering Level Complete Screen (TEMP)');
            const timerText = document.getElementById('timerDisplay').textContent;
            const movesText = document.getElementById('movesCounter').textContent;

            document.getElementById('finalTime').textContent = timerText ? timerText.replace('Time: ','') : 'N/A';
            document.getElementById('finalMoves').textContent = movesText ? movesText.replace('Moves: ','') : 'N/A';
            showScreen('levelCompleteScreen');
        });
    }

    // Event Listeners for Pause Screen Buttons
    const resumeGameBtn = document.getElementById('resumeGameBtn');
    const restartGameBtn = document.getElementById('restartGameBtn');
    const pauseToHomeBtn = document.getElementById('pauseToHomeBtn');

    if(resumeGameBtn) {
        resumeGameBtn.addEventListener('click', () => {
            console.log('Resume Game clicked');
            showScreen('gamePlayScreen');
        });
    }

    if(restartGameBtn) {
        restartGameBtn.addEventListener('click', () => {
            console.log('Restart Game clicked (from pause)');
            showScreen('gamePlayScreen');
            document.getElementById('timerDisplay').textContent = 'Time: 0s';
            document.getElementById('movesCounter').textContent = 'Moves: 0';
            console.log('Game state would be reset here.');
        });
    }

    if(pauseToHomeBtn) {
        pauseToHomeBtn.addEventListener('click', () => {
            console.log('Home button clicked (from pause)');
            showScreen('homeScreen');
        });
    }

    // Event Listeners for Level Complete Screen Buttons
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    const replayLevelBtn = document.getElementById('replayLevelBtn');
    const levelCompleteToHomeBtn = document.getElementById('levelCompleteToHomeBtn');

    if (nextLevelBtn) {
        nextLevelBtn.addEventListener('click', () => {
            console.log('Next Level button clicked');
            showScreen('levelSelectScreen');
            alert('Next Level logic not yet implemented.');
        });
    }

    if (replayLevelBtn) {
        replayLevelBtn.addEventListener('click', () => {
            console.log('Replay Level button clicked');
            showScreen('gamePlayScreen');
            document.getElementById('timerDisplay').textContent = 'Time: 0s';
            document.getElementById('movesCounter').textContent = 'Moves: 0';
            alert('Replay Level logic not yet implemented (game state not reset).');
        });
    }

    if (levelCompleteToHomeBtn) {
        levelCompleteToHomeBtn.addEventListener('click', () => {
            console.log('Home button clicked (from Level Complete)');
            showScreen('homeScreen');
        });
    }

    // Event Listeners for Settings Screen elements
    const settingsBackBtn = document.getElementById('settingsBackBtn');
    const musicToggle = document.getElementById('musicToggle');
    const soundFxToggle = document.getElementById('soundFxToggle');
    const difficultySelect = document.getElementById('difficultySelect');
    const resetProgressBtn = document.getElementById('resetProgressBtn');

    if (settingsBackBtn) {
        settingsBackBtn.addEventListener('click', () => {
            showScreen('homeScreen');
        });
    }

    if (musicToggle) musicToggle.addEventListener('click', handleToggleSwitch);
    if (soundFxToggle) soundFxToggle.addEventListener('click', handleToggleSwitch);
    if (difficultySelect) difficultySelect.addEventListener('click', handleToggleSwitch);

    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                console.log('Reset Progress confirmed');
                alert('Progress has been reset (placeholder).');
            } else {
                console.log('Reset Progress cancelled');
            }
        });
    }
});

// Basic screen switching function
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    } else {
        console.error("Screen not found:", screenId);
    }
}

// Populate Level Grid
function populateLevelGrid() {
    const levelGrid = document.querySelector('#levelSelectScreen .level-grid');
    if (!levelGrid) return;

    levelGrid.innerHTML = ''; // Clear existing levels

    const totalLevels = 30;
    const unlockedLevels = 5; // Example: First 5 levels are unlocked

    for (let i = 1; i <= totalLevels; i++) {
        const levelDiv = document.createElement('div');
        levelDiv.classList.add('level-icon');
        levelDiv.textContent = i;
        levelDiv.dataset.levelNumber = i;

        if (i > unlockedLevels) {
            levelDiv.classList.add('locked');
        } else {
            levelDiv.addEventListener('click', () => {
                console.log(`Starting Level ${i}`);
                showScreen('gamePlayScreen');
                document.getElementById('timerDisplay').textContent = 'Time: 0s';
                document.getElementById('movesCounter').textContent = 'Moves: 0';
            });
        }
        levelGrid.appendChild(levelDiv);
    }
}

// Handle Toggle Switch and Segmented Control Clicks
function handleToggleSwitch(event) {
    const buttonClicked = event.target.closest('button');
    if (!buttonClicked) return;

    const parentGroup = buttonClicked.parentElement;
    parentGroup.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    buttonClicked.classList.add('active');

    const settingId = parentGroup.id;
    const value = buttonClicked.dataset.value;
    console.log(`Setting ${settingId} changed to: ${value}`);
    // TODO: Save this setting (e.g., to localStorage)
}
