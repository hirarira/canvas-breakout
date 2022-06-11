import GameObject from "./gameObject";

window.onload = async () => {
  const gameObjet = new GameObject();
  gameObjet.start();
  window.addEventListener("keydown", async (evt) => {
    switch(evt.key) {
      case 'ArrowRight':
        gameObjet.keyStatus.isRightUp = true;
        break;
      case 'ArrowLeft':
        gameObjet.keyStatus.isLeftUp = true;
        break;
      case 'Enter':
        gameObjet.keyStatus.isEnter = true;
        break;
    }
  });
  window.addEventListener("keyup", async (evt) => {
    switch(evt.key) {
      case 'ArrowRight':
        gameObjet.keyStatus.isRightUp = false;
        break;
      case 'ArrowLeft':
        gameObjet.keyStatus.isLeftUp = false;
        break;
      case 'Enter':
        gameObjet.keyStatus.isEnter = false;
        break;
    }
  });
}
